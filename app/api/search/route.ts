import { NextApiRequest, NextApiResponse } from "@/node_modules/next/dist/shared/lib/utils"
import { NextRequest, NextResponse } from "@/node_modules/next/server"
import { spotifyApi } from "@/utils/spotifyAuth";

export const GET = async (request: NextApiRequest, response:NextApiResponse) => {

  if(request.url){
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const searchQuery = queryParams.get('searchQuery')
    const userInfo = await spotifyApi.getMe()
    console.log(userInfo)
    return NextResponse.json({data: searchQuery})  
  }
}