import { spotifyApi } from "@/utils/spotifyAuth"
import { checkUserInDB, storeToken } from "@/utils/auth"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest, res: NextApiResponse) {
  
  if (typeof request.url === 'string'){
    const url: string | URL  = new URL(request.url, 'http://localhost:3000');
    const code = url.searchParams.get('code');
    
    //code is not given in request
    if (!code){
      return res.status(400).json({message: 'Missing authorization code'});
    }

    try {
      const data = await spotifyApi.authorizationCodeGrant(code);
      const {access_token, refresh_token} = data.body;

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      const userInfo = await spotifyApi.getMe()
      const {display_name, id, email, images} = userInfo.body

      await checkUserInDB(display_name, id, email, images)
      await storeToken(id, access_token, refresh_token)

      console.log(res)

      // cookies().set('userID', id, {
      //   httpOnly: true,
      //   path: '/',
      //   maxAge: 60*5
      // })

      return res.redirect('/dashboard')
    }
    catch(e){
      console.log(e)
      return res.status(400).json({message: 'error'})
    }
  }
  else{
    return res.status(400).json({message: 'Invalid request.'})
  }

}