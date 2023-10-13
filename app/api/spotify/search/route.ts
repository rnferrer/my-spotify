import { NextResponse } from "@/node_modules/next/server"
import { spotifyApi } from "@/utils/spotifyAuth";

export const GET = async (request: Request) => {

  if(request.url){
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const searchQuery = queryParams.get('searchQuery')
    console.log(searchQuery)
    return NextResponse.json({data: searchQuery})  
  }
}