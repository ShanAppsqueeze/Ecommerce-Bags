// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    total: Number,
    cartItems: [
      {
        _id: String,
        name: String,
        imageUrl: String,
        price: String,
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
