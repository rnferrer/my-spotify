import { spotifyApi } from "@/utils/spotifyAuth";
import { checkUserInDB, storeToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<NextResponse> {
  
  console.log('IN CALLBACK ROUTE')
  if (typeof request.url === 'string'){
    const url: string | URL  = new URL(request.url, 'http://localhost:3000');
    const code: string | null = url.searchParams.get('code');

    console.log(request.url)
    //code is not given in request
    if (!code){
      return NextResponse.json({message: 'Missing authorization code'}, {status: 400});
    }

    try {
      console.log('INITIAL SPOTIFYAPI OBJECT')
      console.log(spotifyApi)


      const data = await spotifyApi.authorizationCodeGrant(code);
      const {access_token, refresh_token, expires_in} = data.body;

      console.log('EXPIRES IN:', expires_in)
      
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log('AFTER TOKENS SET')
      console.log(spotifyApi)

      const userInfo = await spotifyApi.getMe();
      const {display_name, id, email, images} = userInfo.body;

      console.log('AFTER GETTING USER DATA')
      console.log(spotifyApi)

      await checkUserInDB(display_name, id, email, images);
      await storeToken(id, access_token, refresh_token);

      cookies().set({
        name: 'userID',
        value: id,
        httpOnly: true,
        secure: true,
        path: '/'
      })

      cookies().set({
        name: 'access_token',
        value: access_token,
        httpOnly: true,
        secure: true,
        path: '/'
      })

      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    catch(e:any){
      console.log('HERE IS THE ERROR')
      console.log(e)
      return NextResponse.json({message: e}, {status: 400});
    }
  }
  else{
    return NextResponse.json({message: 'Invalid request.'}, {status: 400});
  }

}

