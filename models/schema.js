import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  image: String,
  name: String
});

const tokenSchema = new mongoose.Schema({
  id: String,
  accessToken: String,
  refreshToken: String
})

const User = mongoose.model('User', userSchema);

const Token = mongoose.model('Token', tokenSchema)

module.exports = {User, Token};