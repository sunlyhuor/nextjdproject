import React, { useRef, useState } from "react";
// Import Swiper React components
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Pagination, Navigation ,Autoplay } from "swiper";
import { useRouter } from "next/router";

export default function CarouselComponent( { datas } ) {
    const router = useRouter()
  return (
    <>
      <Swiper
        // slidesPerView={3}
        // spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
            delay:3000
        }}
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
            datas.map((d,k)=>(
                <SwiperSlide key={k} >
                    <section onClick={()=> router.push("/courses/"+d.course_title) } title={d.course_title} className="relative w-full hover:blur-[1px] cursor-pointer hover:duration-150 hover:brightness-50 hover:shadow-lg hover:shadow-[yellow]" >
                        <Image className="w-full " width={2500} height={2500} src={d.course_thumbnail} />
                        <h1 className="absolute bottom-2 left-2" >{d.course_title}</h1>
                    </section>
                </SwiperSlide>
            ))
        }
      </Swiper>
    </>
  );
}
