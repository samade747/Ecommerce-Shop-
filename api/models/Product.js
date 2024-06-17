import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
    title: 
    { type: String,
      required: true, 
      unique: true
    },
    desc: { 
        type: String,
        required: true
    },
    img: { 
      type: String,
      required: true 
    },
    category: { type: Array, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },

    },
    {
    timestamps: true,
    }
);

export default productSchema