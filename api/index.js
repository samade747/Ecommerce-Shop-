import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import productRoute from './routes/product.js';
import cartRoute from './routes/cart.js';
import orderRoute from './routes/order.js';
import stripeRoute from './routes/order.js';
import cors from 'cors';


dotenv.config();

const app = express()

app.use(cors())

app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", stripeRoute)



mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});



app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 3000");
})