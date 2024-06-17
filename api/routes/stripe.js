import router from "express";
import Stripe from "stripe";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } from "../verifyToken.js";
import Order from "../models/Order.js";

const stripe = new Stripe(process.env.STRIPE_KEY);




router.post("/payment", async (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    },
    (stripeErr, stripeRes) => {
        if(stripeErr) {
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }
    }
    );

});

router.post("/payment/process", verifyTokenAndAuthorization, async (req, res) => {

    const order = await Order.findById(req.body.orderId);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: order.amount,
        currency: "usd",
    });
    res.status(200).json(paymentIntent.client_secret);    

});





export default router;




