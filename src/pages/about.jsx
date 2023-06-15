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
        <main className="w-10/12 mx-auto" >

            <Timeline 
                title={"Education of History"}
                datas={datas}
            />

        </main>
    )
}