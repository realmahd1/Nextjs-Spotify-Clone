import React from 'react'
import Song from './Song'

type songs = {
  playlist:any
}

export default function Songs({playlist}:songs) {
  return (
    <div className='py-8 px-6 flex flex-col space-y-1 pb-28 text-white'>
        {playlist?.tracks.items.map((track:any,index:number)=>(
            <Song key={track?.track?.id} track={track?.track} order={index}/>
        ))}
    </div>
  )
}
