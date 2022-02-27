import axios from 'axios';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const jsLibraries = [
  {
    name: 'React',
    npmName: 'react',
    url: 'https://reactjs.org/',
    description: 'A JavaScript library for building user interfaces.'
  },
  {
    name: 'React Router',
    npmName: 'react-router',
    url: 'https://reacttraining.com/react-router/',
    description: 'A React Router library for easily building single-page apps.'
  },
  {
    name: 'Next.js',
    npmName: 'nextjs',
    url: 'https://nextjs.org/',
    description: 'A React Framework for server-rendered applications.'
  },
  {
    name: 'Express',
    npmName: 'express',
    url: 'https://expressjs.com/',
    description: 'A minimal and flexible Node.js web application framework.'
  },
  {
    name: 'MongoDB',
    npmName: 'mongodb',
    url: 'https://www.mongodb.com/',
    description: 'An open-source, cross-platform document-oriented database.'
  }
];


export default function Home({ jsLibs }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Get Mah Data</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>JS Libraries</h1>
        <div id="jsLibraries" className={styles.card}>
          {jsLibs.map(library => (
            <div key={library.name} className={styles.library}>
              <a href={library.url}>{library.name}</a>
              <p className={styles.downloads}><span id="downloads">{library.downloads}</span> downloads last month</p>
              <p>{library.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const jsLibs = await Promise.all(jsLibraries.map(async (library) => {
    const downloads = await (await axios.get(`https://api.npmjs.org/downloads/point/last-month/${library.npmName}`)).data.downloads;

    return {
      name: library.name,
      downloads,
      url: library.url,
      description: library.description
    }
  }));
  console.log(jsLibs);
  return {
    props: {
      jsLibs
    }, // will be passed to the page component as props
  }
}