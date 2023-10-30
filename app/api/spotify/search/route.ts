import { NextRequest, NextResponse } from "next/server"
import { spotifyApi } from "@/utils/spotifyAuth";
import { getToken } from "@/utils/auth";

type NextRequestWithLocals = NextRequest & {
  locals: string
}

export const GET = async (request: NextRequestWithLocals) => {

  if(request.url){
    const user: string | undefined = request.cookies?.get('userID')?.value || '';

    

    if (user){
      let token = await getToken(user);
      spotifyApi.setAccessToken(token?.access)
    }
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const searchQuery = queryParams.get('searchQuery')
    console.log(searchQuery)
    const data = await spotifyApi.searchTracks(searchQuery)
    const tracks = data.body.tracks.items.slice(0,5)
    const trackInfo = tracks.map((track) => {
      const {artists, href, id, name, uri, album} = track
      const image = album.images[2]
      return {artists, href, id, name, uri, image}
    })

    console.log(trackInfo)
    return NextResponse.json({data: searchQuery})  
  }
}