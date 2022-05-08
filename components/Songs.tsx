import React from 'react'
import Song from './Song'

export default function Songs({playlist}) {
  return (
    <div className='p-8 flex flex-col space-y-1 pb-28 text-white'>
        {playlist?.tracks.items.map((track,index)=>(
            <Song key={track.track.id} track={track} order={index}/>
        ))}
    </div>
  )
}
