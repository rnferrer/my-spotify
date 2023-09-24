import { spotifyApi } from "@/utils/spotifyAuth"
import { useRouter } from "@/node_modules/next/router";

import { NextApiRequest, NextApiResponse } from "@/node_modules/next/dist/shared/lib/utils"

export const GET = async (request: NextApiRequest, response: NextApiResponse) => {
  
  if (typeof request.url === 'string'){
    const url: string | URL  = new URL(request.url, 'http://localhost:3000'); // Replace with your actual base URL
    const code = url.searchParams.get('code');
    
    //code is not given in request
    if (!code){
      return response.status(400).send('Missing authorization code');
    }

    try {
      const data = await spotifyApi.authorizationCodeGrant(code);
      const {access_token, refresh_token} = data.body;
      response.setHeader('Location', '/dashboard');
      response.status(302).end();
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