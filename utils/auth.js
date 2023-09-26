import User  from '../models/schema'
import connectDB from '../db/db'

export const getUserFromSpotifyID = async (name, id, email, images) => {
  const db = await connectDB();

  const user = await User.find({id})
  console.log(images)
  if(user.length === 0){
    if(images.length >= 1){
      const newUser = new User({
        id,
        email,
        image: images[0].url,
        name
      })

      await newUser.save()
      console.log(newUser)
    }
  }
}