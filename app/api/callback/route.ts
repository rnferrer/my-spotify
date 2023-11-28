import { spotifyApi } from "@/utils/spotifyAuth";
import { checkUserInDB, storeToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<NextResponse> {
  
  if (typeof request.url === 'string'){
    const url: string | URL  = new URL(request.url, 'http://localhost:3000');
    const code: string | null = url.searchParams.get('code');
    
    //code is not given in request
    if (!code){
      return NextResponse.json({message: 'Missing authorization code'}, {status: 400});
    }

    try {
      const data = await spotifyApi.authorizationCodeGrant(code);
      const {access_token, refresh_token} = data.body;

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      const userInfo = await spotifyApi.getMe();
      const {display_name, id, email, images} = userInfo.body;

      await checkUserInDB(display_name, id, email, images);
      await storeToken(id, access_token, refresh_token);

      cookies().set({
        name: 'userID',
        value: id,
        httpOnly: true,
        path: '/'
      })

      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    catch(e){
      console.log(e)
      return NextResponse.json({message: 'error'}, {status: 400});
    }
  }
  else{
    return NextResponse.json({message: 'Invalid request.'}, {status: 400});
  }

}

