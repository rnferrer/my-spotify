import { spotifyApi } from "@/utils/spotifyAuth"
import { NextResponse } from "@/node_modules/next/server";
import { NextApiRequest, NextApiResponse } from "@/node_modules/next/dist/shared/lib/utils"
import { getUserFromSpotifyID } from "../../../utils/auth"

export const GET = async (request: NextApiRequest, response: NextApiResponse) => {
  
  if (typeof request.url === 'string'){
    const url: string | URL  = new URL(request.url, 'http://localhost:3000');
    const code = url.searchParams.get('code');
    
    //code is not given in request
    if (!code){
      return response.status(400).send('Missing authorization code');
    }

    try {
      const data = await spotifyApi.authorizationCodeGrant(code);
      const {access_token, refresh_token} = data.body;

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      const userInfo = await spotifyApi.getMe()
      const {display_name, id, email, images} = userInfo.body
      console.log(userInfo.body)
      let user = await getUserFromSpotifyID(display_name, id, email, images)

      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    catch(e){
      console.log(e)
      return response.send({message: 'error'})
    }
  }
  else{
    return response.status(400).send('Invalid request.')
  }

}