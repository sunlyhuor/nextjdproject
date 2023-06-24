import CardComponent from "@/components/Card"
import CarouselComponent from "@/components/carousel"
import { BackendLink } from "@/components/components"
import axios from "axios"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomePage(){
    let [ PopularCourses , setPopularCourses ] = useState([])
    let [ LoadingPopular , setLoadingPopular ] = useState(false)

    async function getPopularCourse(){
        try {
            setLoadingPopular(false)
            const datas = await axios.get( BackendLink() + "/api/v1/course/popular/10/" )
            // console.log(datas)
            setPopularCourses( datas.data.responses )
        } catch (error) {
            setLoadingPopular(false)
            console.log( error )
        }
        finally{
            setLoadingPopular(true)
        }
    }

    useEffect(()=>{

        getPopularCourse()

    } , [] )

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
                <h1 className="font-bold bg-red-600 mb-[10px] inline cursor-pointer text-white px-[10px] py-[5px] rounded-tr-[5px] shadow-lg shadow-[red]" >Popular</h1>
                <section>
                    {
                    LoadingPopular?(
                                <CarouselComponent datas={PopularCourses} />
                            )
                            :(
                                <h1 className="text-center" >No items</h1>
                            )
                    }
                </section>


            </section>

        </main>
    )
}