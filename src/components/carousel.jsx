import Image from "next/image";
import Link from "next/link";
import { Pagination , Navigation , Scrollbar } from "swiper"
import { Swiper , SwiperSlide  } from "swiper/react"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/scrollbar"

export default function CarouselComponent(){
    return(
        <>  
            <Swiper
                modules={[ Pagination , Navigation , Scrollbar ]}
                pagination={{clickable:true}}
                autoplay
                navigation
                loop={true}
                
                // scrollbar={{draggable:true}}
            >
                <SwiperSlide className="bg-red-200 text-center py-5" >Slide 1</SwiperSlide>
                <SwiperSlide className="bg-red-200 text-center py-5" >Slide 2</SwiperSlide>
                <SwiperSlide className="bg-red-200 text-center py-5" >Slide 3</SwiperSlide>
                <SwiperSlide className="bg-red-200 text-center py-5" >Slide 4</SwiperSlide>
            </Swiper>
        </>
    )
}