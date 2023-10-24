import { access } from 'fs';
import { User, Token }  from '../models/schema'
import { prisma } from './db';

export const checkUserInDB = async (name, id, email, images) => {

  const user = await prisma.user.findFirst({
    where:{
      userID: id
    }
  });

  console.log(!user);

  if(!user){
    if(images.length >= 2){
      const newUser = await prisma.user.create({
        data: {
          userID: id,
          email,
          image: images[1].url,
          name
        }
      });
      return newUser;
    }
  }
  return user
}

export const storeToken = async (id, accessToken, refreshToken) => {


  const token = await prisma.token.findFirst({
    where:{
      userID: id
    }
  });
  
  //if there are tokens in the db, we want to replace those with fresh tokens
  if(token){
    await prisma.token.deleteMany({
      where: {
        userID: id
      }
    })
  } 

  const newToken = await prisma.token.create({
    data: {
      userID: id,
      access: accessToken,
      refresh: refreshToken
    }
  })

  console.log(newToken)

  return newToken
}

export const getToken = async (id) => {
  const token = await prisma.token.findFirst({
    where: {
      userID: id
    }
  });
  return token;
}