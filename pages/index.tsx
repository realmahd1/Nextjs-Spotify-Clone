import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from './../components/Sidebar';
import Center from './../components/Center';

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex'>
        <Sidebar/>
        <Center />
      </main>
      <div>
        {/* player */}
      </div>
    </div>
  )
}

export default Home
