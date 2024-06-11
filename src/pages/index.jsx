import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons"
import { Swiper, SwiperSlide } from "swiper/react";
import {  Pagination, Autoplay, Navigation } from "swiper"
import { BackendLink } from "@/components/components"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios"
import Image from "next/image"

export default function HomePage(){
    let [ PopularCourses , setPopularCourses ] = useState([])
    let [ LoadingPopular , setLoadingPopular ] = useState(false)
    const router = useRouter()

    async function getPopularCourse(){
        // console.log("Ran")
        try {
            setLoadingPopular(false)
            const datas = await axios.get( BackendLink() + "/api/v1/course/popular/10/" )
            setPopularCourses( datas.data.responses )
            // console.log( datas )
        } catch (error) {
            setLoadingPopular(false)
            // console.log( error )
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
                <h1 className="font-bold bg-red-600 mb-[10px] inline cursor-pointer text-white px-[10px] py-[5px] rounded-tr-[5px] shadow-lg shadow-[red] hover:shadow-[yellow] hover:opacity-[0.9] transition duration-300" >Populars<FontAwesomeIcon className="" icon={faFireFlameCurved} /> </h1>
                {/* <CarouselComponent /> */}
                <section className="mt-[5px]" >
                {
                    LoadingPopular?(
                    <Swiper
                            loop={true}
                            pagination={{
                            clickable: true,
                            }}
                            navigation={true}
                            breakpoints={
                                {
                                    0:{
                                        slidesPerView:1,
                                        spaceBetween:10
                                    },
                                    768:{
                                        slidesPerView:2,
                                        spaceBetween:10
                                    },
                                    1028:{
                                        slidesPerView:3,
                                        spaceBetween:15
                                    }
                                }
                            }
                            modules={[Pagination, Navigation , Autoplay]}
                            className="mySwiper"
                        >
                            {
                                PopularCourses.map((d,k)=>(
                                    <SwiperSlide key={k} >
                                        <section onClick={()=> router.push("/courses/"+d.course_code) } title={d.course_title} className="relative w-full hover:blur-[1px] cursor-pointer hover:duration-150 hover:brightness-50 hover:shadow-lg hover:shadow-[yellow]" >
                                            <Image className="w-full " width={2500} height={2500} src={d.course_thumbnail} alt={ d.course_title } />
                                            <h1 className="absolute bottom-2 left-2" >{d.course_title}</h1>
                                        </section>
                                    </SwiperSlide>
                                ))
                            }
                    </Swiper>
                    ):"Loading"
                }
                </section>
            </section>

        </main>
    )
}
