import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  image: String,
  name: String
});

const User = mongoose.model('User', userSchema);

export default User;