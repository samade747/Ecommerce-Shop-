import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: { type: Array, default: [] },
        total: { type: Number, default: 0 },
        quantity: { type: Number, default: 0 },
        status: { type: String, default: "pending" },
        address: { type: String, default: "" },
        paymentId: { type: String, default: "" },
        paymentStatus: { type: String, default: "pending" },
    },
    { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
