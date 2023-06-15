import Timeline from "@/components/Timeline"
import CarouselComponent from "@/components/carousel"
import axios from "axios"
import { useEffect, useState } from "react"

export default function HomePage(){

    let [ Data , setData ] = useState("")  
    // const [datas , setdatas ] = useState([
    //     {
    //         date:"10-FEB-2023",
    //         content:"Helloe",
    //         description:"Hello world"
    //     },
    //     {
    //         date:"10-FEB-2024",
    //         content:"Helloe",
    //         description:"Hello world"
    //     }
    // ])

    return(
        <main>

            <section className="w-10/12 mx-auto p-1" >

                {/* <Timeline 
                    dd={"sakdjaskjdkasljdklasd"}
                    title={ "History of education" }
                /> */}

            </section>

        </main>
    )
}