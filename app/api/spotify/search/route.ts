import { NextRequest, NextResponse } from "next/server"
import { spotifyApi } from "@/utils/spotifyAuth"
import { getToken } from "@/utils/auth";
import type { ArtistObjectSimplified, TrackObjectFull } from 'spotify-api'


export const GET = async (request: NextRequest): Promise<NextResponse> => {

  if(request.url){
    const user: string = request.cookies?.get('userID')?.value || '';

    if (user){
      let token = await getToken(user);
      spotifyApi.setAccessToken(token?.access);
    }
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const searchQuery = queryParams.get('searchQuery')
    const data = await spotifyApi.searchTracks(searchQuery)
    const tracks = data.body.tracks.items.slice(0,5)
    
    //extract info from search query needed to display in the search results
    const trackInfo = tracks.map((track:TrackObjectFull) => {
      const {artists, href, id, name, uri, album} = track
      const image = album.images[2]
      const artistsNames = artists.map((artist:ArtistObjectSimplified) =>{
        const {name} = artist
        return name
      })
      return {artists: artistsNames, href, id, name, uri, image}
    })

    console.log('INFO ABOUT TRACK BEING SENT',trackInfo[0].artists)
    return NextResponse.json(trackInfo)  
  }
  
  else{
    return NextResponse.json({message: 'No tracks found'})
  }
}