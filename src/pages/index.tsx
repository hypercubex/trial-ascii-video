import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <h1 data-testid="home-headline">ASCII Art with p5.js</h1>
      <nav id="home-nav-bar">
        {/* TODO menu config */}
        <Link href={'live_video'}>Live Video</Link>
        {/* <Link href={'image'}>Image</Link> */}
      </nav>
    </>
  )
}

export default Home
