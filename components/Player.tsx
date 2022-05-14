import React, { useEffect, useState, useRef,FC } from 'react'
import useSpotify from './../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '../app/hooks';
import { trackId, playTrackState, currentTrackId, changeTrackState } from './../features/song';
import useSongInfo from '../hooks/useSongInfo';
import { useAppDispatch } from './../app/hooks';
import { SwitchHorizontalIcon } from '@heroicons/react/outline';
import { RewindIcon, PlayIcon, PauseIcon, ReplyIcon, FastForwardIcon, VolumeUpIcon } from '@heroicons/react/solid';

const Player:FC = ()=> {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const nowTrackId = useAppSelector(trackId);
    const PlayTrackState = useAppSelector(playTrackState);
    const [volume, setVolume] = useState<number>(50);
    const songInfo = useSongInfo();
    const [trackCurrentTime, setTrackCurrentTime] = useState<number>(0);

    const fetchCurrentTrack = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data:any) => {
                dispatch(currentTrackId(data?.body?.item?.id));
                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    dispatch(changeTrackState(data?.body?.is_playing));
                })
            });
        }
    }
    const audioPlayer = useRef<HTMLAudioElement>(null);
    
    const handlePlayPause = () => {
        if (!PlayTrackState) {
            audioPlayer.current?.play();
            dispatch(changeTrackState(true));
        } else {
            audioPlayer.current?.pause()
            dispatch(changeTrackState(false));
        }

    }

    useEffect(() => {
        audioPlayer!.current!.volume = volume / 100;
    }, [volume])

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !nowTrackId) {
            fetchCurrentTrack();
            setVolume(50);
        }
    }, [nowTrackId, session, spotifyApi]);

    const audioPlayerRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        audioPlayer!.current!.currentTime = Number(event.target.value);
    }

    return (
        <div className='h-24 bg-[#181818] border border-[#282828] text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
            <section className='flex items-center space-x-4'>
                <img className='hidden md:inline h-14 w-14' src={songInfo?.album.images?.[0]?.url} alt="" />
                <div>
                    <p className='text-sm'>{songInfo?.name}</p>
                    <p className='text-xs text-[#b3b3b3] truncate w-60'>{songInfo?.artists.map((artist, index) => `${artist.name} ${index !== songInfo?.artists.length - 1 ? ', ' : ''} `)}</p>
                </div>
            </section>
            <div className='flex flex-col justify-center'>
                <section className='flex items-center justify-center space-x-4 mb-[8px]'>
                    <SwitchHorizontalIcon className='player-button' />
                    <RewindIcon
                        // onClick={() => {spotifyApi.skipToPrevious()}} The API is not working
                        className='player-button' />

                    {PlayTrackState ? (
                        <PauseIcon onClick={handlePlayPause} className='player-button w-10 h-10' />
                    ) : (<PlayIcon onClick={handlePlayPause} className='player-button w-10 h-10' />)}

                    <FastForwardIcon
                        // onClick={() => {spotifyApi.skipToNext()}} The API is not working
                        className='player-button' />
                    <ReplyIcon className='player-button' />
                </section>
                <section className='flex items-center space-x-3 mx-auto'>
                    <p className='text-xs text-[#a7a7a7]'>0:{Math.round(trackCurrentTime) < 10 ? `0${Math.round(trackCurrentTime)}` : Math.round(trackCurrentTime)}</p>
                    <input className='audio-player-range' onChange={audioPlayerRangeChange} type='range' value={trackCurrentTime} min='0' max={audioPlayer?.current?.duration ? Math.round(audioPlayer?.current?.duration) : '100'} />
                    <p className='text-xs text-[#a7a7a7]'>0:{audioPlayer?.current?.duration ? Math.round(audioPlayer?.current?.duration) : '00'}</p>
                </section>
            </div>

            <section className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
                <VolumeUpIcon className='player-button' />
                <input type='range' className='player-range' value={volume} step='1' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setVolume(Number(event.target?.value))} min='0' max='100' />
            </section>
            <audio ref={audioPlayer} onTimeUpdate={(event:React.ChangeEvent<HTMLVideoElement>) => { setTrackCurrentTime(event.target?.currentTime) }}
                controls autoPlay={PlayTrackState} className='hidden' src={songInfo?.preview_url || ''}>
                Your browser does not support the audio element.
            </audio>
        </div>
    )
}
export default Player;