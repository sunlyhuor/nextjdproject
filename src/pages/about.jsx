import Timeline from "@/components/Timeline";
import { useState } from "react";

export default function AboutPage(){

    const [datas , setdatas ] = useState([
        {
            date:"10-FEB-2023",
            content:"Helloe",
            description:"Hello world",
            // link:"/"
        },
        {
            date:"10-FEB-2024",
            content:"Helloe",
            description:"Hello world"
        }
    ])

    return(
        <main className="min-[0px]:w-11/12 md:w-8/12 mx-auto bg-red-200" >
            <section>
                <h1 className="h1" >About Us</h1>
            </section>
        </main>
    )
}