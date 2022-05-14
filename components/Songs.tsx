import React, { FC } from 'react'
import Song from './Song'

type songs = {
  playlist:SpotifyApi.SinglePlaylistResponse | undefined
}

 const Songs:FC<songs> = ({playlist}) =>{
  return (
    <div className='py-8 px-6 flex flex-col space-y-1 pb-28 text-white'>
        {playlist?.tracks.items.map((track:any,index:number)=>(          
            <Song key={track?.track?.id} track={track?.track} order={index}/>
        ))}
    </div>
  )
}
export default Songs;