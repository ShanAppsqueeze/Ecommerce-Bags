import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },

  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.Product ||
  mongoose.model("products", ProductSchema);
