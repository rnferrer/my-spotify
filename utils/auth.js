import { User, Token }  from '../models/schema'
import connectDB from '../db/db'

export const checkUserInDB = async (name, id, email, images) => {
  const db = await connectDB();

  const user = await User.find({id});

  if(user.length === 0){
    if(images.length >= 1){
      const newUser = new User({
        id,
        email,
        image: images[0].url,
        name
      });

      await newUser.save();
      console.log(newUser);
      return newUser;
    }
  }
  return user[0]
}

export const storeToken = async (id, accessToken, refreshToken) => {
  const db = await connectDB();

  const tokens = await Token.find({id})
  
  //if there are tokens in the db, we want to replace those with fresh tokens
  if(tokens.length >= 1){
    await Token.deleteMany({id});
  } 

  const newToken = new Token({
    id,
    accessToken,
    refreshToken
  });

  await newToken.save();

  console.log(newToken)
}