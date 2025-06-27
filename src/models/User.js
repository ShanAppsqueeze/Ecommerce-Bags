import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
   message: String,
}, { timestamps: true });
console.log('userSchema:', userSchema);


export default mongoose.models.User || mongoose.model('User', userSchema);
