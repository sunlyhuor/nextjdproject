import HeaderComponent from '@/components/Header'
import '@/styles/globals.css'
import { useEffect } from 'react'
import AOS from 'aos'
import "aos/dist/aos.css";

export default function App({ Component, pageProps }) {
  // Aos.init();
  useEffect(()=>{

    AOS.init({});

  } , [] )
  return (
    <>
      <HeaderComponent />
      <Component {...pageProps} />
    </>
  )
}
