import HeaderComponent from '@/components/Header'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import "aos/dist/aos.css";
import "swiper/css"
import Footer from '@/components/Footer';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';

export default function App({ Component, pageProps }) {

  let [ Loading , setLoading ] = useState(false)
  Router.events.on( "routeChangeStart" , (url)=> {
    // console.log( "Route start" )
    nProgress.start()
    setLoading(false)
  } )
 
  Router.events.on( "routeChangeComplete" , (url)=> {
    nProgress.done()
    setLoading(true)
    // console.log( "Route Complete" )
  } )

  useEffect(()=>{

    AOS.init({});

  } , [] )
  return (
    <>
      {
        Loading?
        (
          <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          </Head>
        ):""
      }
      <HeaderComponent />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
