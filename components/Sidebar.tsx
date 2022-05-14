import { HeartIcon, HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useState, useEffect, FC } from 'react';
import { selectId } from '../features/playlistId';
import useSpotify from '../hooks/useSpotify';
import { useAppDispatch } from './../app/hooks';
import Spotifylogo from './svg/Spotifylogo';

const Sidebar:FC = () => {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [playLists, setPlayLists] = useState([]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data:any) =>{
                setPlayLists(data?.body?.items);
                // show first item of playlist as default
                dispatch(selectId(data?.body?.items[0]?.id));
            })
        }
    }, [session,spotifyApi]);
    
    return (
        <div className='text-[#b3b3b3] p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex scrollbar-hide pb-36'>
            <section className='space-y-4'>
                <Spotifylogo/>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='h-5 w-5' />
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className='h-5 w-5' />
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className='h-5 w-5' />
                    <p>Your Library</p>
                </button>
                <hr className='border-t-[1px] border-gray-900' />
                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className='h-5 w-5' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='h-5 w-5' />
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='h-5 w-5' />
                    <p>Your episodes</p>
                </button>
                <hr className='border-t-[1px] border-gray-900' />

                {playLists.map((playlist:SpotifyApi.SinglePlaylistResponse)=>(
                    <p key={playlist.id} onClick={()=>dispatch(selectId(playlist.id))} className='cursor-pointer hover:text-white'>{playlist.name}</p>
                ))}
            </section>
        </div>
    )
}
export default  Sidebar;