import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import NavBar from '../components/NavBar'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Art Block Avenue</title>
        <meta name="description" content="Art social media site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <NavBar />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
