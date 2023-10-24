import { NextRequest, NextResponse } from "next/server"
import { spotifyApi } from "@/utils/spotifyAuth";
import { getToken } from "@/utils/auth";

type NextRequestWithLocals = NextRequest & {
  locals: string
}

export const GET = async (request: NextRequestWithLocals) => {

  if(request.url){

    console.log(request.locals)
    // let token = await getToken(request.locals)
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const searchQuery = queryParams.get('searchQuery')
    console.log(searchQuery)
    return NextResponse.json({data: searchQuery})  
  }
}