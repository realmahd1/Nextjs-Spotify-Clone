import React, {FC} from 'react'
import { millisToMinutesAndSeconds } from './../lib/time';
import { useAppDispatch } from './../app/hooks';
import { currentTrackId, changeTrackState } from '../features/song';

type song = {
    track: SpotifyApi.TrackObjectFull,
    order: number
}

const Song:FC<song> = ({ track, order }) => {
    const dispatch = useAppDispatch();

    const playSong = () => {
        dispatch(currentTrackId(track?.id));
        dispatch(changeTrackState(true));
    }
    return (
        <div className='grid grid-cols-2 text-[#b3b3b3] py-2 px-5 hover:bg-[#ffffff1a]  rounded-lg' onClick={playSong}>
            <section className='flex items-center space-x-4'>
                <p>{order + 1}</p>
                <img className="w-10 h-10" src={track?.album.images[0].url} alt="" />
                <div>
                    <p className='w-36 lg:w-64 truncate text-white'>{track?.name}</p>
                    <p className='w-40 truncate'>{track?.artists.map((artist: any, index: number) => `${artist.name} ${(index !== track?.artists.length - 1) ? ', ' : ''} `)}</p>
                </div>
            </section>
            <section className='flex items-center justify-between ml-auto md:ml-0 text-sm'>
                <p className="w-40 hidden md:inline truncate">{track?.album.name}</p>
                <p>{millisToMinutesAndSeconds(track?.duration_ms)}</p>
            </section>
        </div>
    )
}
export default Song;