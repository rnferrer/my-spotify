import { FC, useEffect,useState } from "react";
import type { Player, Track } from "spotify-web-playback-sdk"

type GetOAuthTokenCallback = (token: string) => void;
type Props = {
  token: string
}

const SpotifyPlayer:FC<Props> = ({token}):JSX.Element => {
  const [is_paused, setPaused] = useState<boolean>(false);
  const [is_active, setActive] = useState<boolean>(false);
  const [player, setPlayer] = useState<Player | null>(null);
  const [current_track, setTrack] = useState<Track| null>(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true
    document.body.appendChild(script);

    //NEED TO PASS IN TOKEN AS A PROP TO THIS COMPONENT
    // const fetchToken = async () => {
    //   const url = `/api/spotify/token`;
    //   const response = await fetch (url);
    //   const data = await response.json();
    //   return data
    // };

    // const token = fetchToken();


    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: GetOAuthTokenCallback) => {
          cb(token);
        },
      
      });
    }

    })
  return(
    <>
    </>
  )
}

