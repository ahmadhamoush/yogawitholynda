import Head from 'next/head'
import Image from 'next/image'
import Announcement from './components/Announcement'
import Landing from './components/landing'
import CollectionList from './components/CollectionList'

export default function Home() {
  return (
    <>
      <Head>
        <title>YOGAWITHOLYNDA</title>
        <meta name="description" content="Yoga Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;700&display=swap" rel="stylesheet"/>
        
      </Head>
      <Announcement />
      <Landing />
      <CollectionList />
    </>
  )
}
