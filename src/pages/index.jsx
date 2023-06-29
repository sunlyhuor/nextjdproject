import CarouselComponent from "@/components/carousel"
import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons"

export default function HomePage(){
    
    const router = useRouter()

   

    return(
        <main>
            <Head>
                <title>Home Page - Sun Lyhuor</title>
                <meta name="description" content="Home page huor class or sun lyhuor" />
                <meta name="keywords" content="Huor class Home page sun Lyhuor" />
                <meta http-equiv="X-UA-Compatible" content="IE=7" />
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <section className="w-10/12 mx-auto p-1 " >
                <h1 className="font-bold bg-red-600 mb-[10px] inline cursor-pointer text-white px-[10px] py-[5px] rounded-tr-[5px] shadow-lg shadow-[red] hover:shadow-[yellow] hover:opacity-[0.9] transition duration-300" >Popular <FontAwesomeIcon className="" icon={faFireFlameCurved} /> </h1>
                {/* <CarouselComponent /> */}

            </section>

        </main>
    )
}