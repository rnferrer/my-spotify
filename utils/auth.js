import { User, Token }  from '../models/schema'
import { prisma } from './db';

export const checkUserInDB = async (name, id, email, images) => {

  const user = await prisma.user.findFirst({
    where: {
      userID: id,
      email
    }
  });
  console.log(user)

  if(user.length === 0){
    if(images.length >= 1){
      const newUser = new User({
        id,
        email,
        image: images[0].url,
        name
      });

      await newUser.save();
      return newUser;
    }
  }

  return user[0]
}

export const storeToken = async (id, accessToken, refreshToken) => {


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
}

export const getToken = async (id) => {
  const token = await Token.find({id});
  return token;
}