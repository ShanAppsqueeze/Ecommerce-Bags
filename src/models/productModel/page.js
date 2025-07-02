import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: String,
  imageUrl: String,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
