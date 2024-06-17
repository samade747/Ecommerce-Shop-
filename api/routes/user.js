import router from "express";
import User from "../models/User.js";
// import User from "../models/User.js";

import CryptoJS from "crypto-js";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } from "../verifyToken.js";

router.put("/:id", verifyToken, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
            ).toString();
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
        next();
    } else {
        return res.status(403).json("You are not allowed!");
    }   
});



// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed!");
    }
});

// GET user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET all user
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.findById();
        res.status(200).json(users);
    } catch (err) { 
        res.status(500).json(err);
    }
});


// GET user stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)

    } catch (err) {
        res.status(500).json(err);
    }   
});


export default router
    
        