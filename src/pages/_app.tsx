import Head from 'next/head';
import type { AppProps } from 'next/app'
import Navbar from '../components/NavBar/NavBar'
require('../../styles/globals.css');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Daily Activity Monitor</title>
        <meta
          name="description"
          content="Daily Activity Monitor"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>      

  )
}

export default MyApp
