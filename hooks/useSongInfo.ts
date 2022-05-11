import { useAppSelector } from "../app/hooks";
import { trackId } from './../features/song';
import useSpotify from './useSpotify';
import { useState, useEffect } from 'react';
import { songInfoType } from '../types/songInfoType';


export default function useSongInfo() {
    const spotifyApi = useSpotify();
    const currentTrackId = useAppSelector(trackId);
    const [songInfo, setSongInfo] = useState<songInfoType>();

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
                    'headers': {
                        'Authorization': `Bearer ${spotifyApi.getAccessToken()}`
                    }
                }).then(res => res.json());

                // prevent from sending track info when no preview url available
                if (!trackInfo?.preview_url)
                    return alert('no preview url available!');
                setSongInfo(trackInfo);
            }
        }
        fetchSongInfo();
    }, [currentTrackId, spotifyApi])

    return songInfo;
}
