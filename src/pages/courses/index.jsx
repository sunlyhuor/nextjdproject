import CardComponent from "@/components/Card"
import axios from "axios"
import { BackendLink } from "@/components/components"
import { useEffect, useState } from "react"
import LoadingComponent from "@/components/Loading"
import Head from "next/head"

export async function getServerSideProps(){
   const datas = await fetch( BackendLink() + "/api/v1/course" )
   const datas_json = await datas.json()
   return{
    props:{
        datas_json
    }
   }
}

export default function CoursePage( { datas_json } ){

    let [ datas , setData ] = useState([])
    let [ Loading , setLoading ] = useState(false)
    let [ BuyCourseLoad , setBuyCourseLoad ] = useState(false)

    // console.log(datas)

    async function FetchCourse(){
        try{
            setLoading( false )
            const datas = await axios.get( BackendLink() + "/api/v1/course" )
            setData(datas.data)
            console.log( datas.data.responses )
        }catch(err){
            setLoading(false)
            console.log(err)
        }
        finally{
            setLoading(true)
        }
    }

    
    useEffect(()=>{
        setData(datas_json )
        console.log( datas_json.responses )
        // FetchCourse() 

    } , [ BuyCourseLoad ] )

    return(
        <>
            <Head>
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
                {/* <meta name="keywords" content={ datas_json[0].course_description } /> */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="IE=7" />
                <title>Courses Page - Sun LyHuor </title>
            </Head>
            <main className="w-10/12 mx-auto" >
                <section className="flex gap-[10px] justify-center flex-wrap" >
                    
                    { 
                        // Loading?(
                            datas_json.responses ? datas_json.responses.map(( d , k )=>{
                                return(
                                    // <div>
                                    //     <h1>{d.course_title}</h1>
                                    //     <button className={"button mt-[10px] "} ><span>GO TO LOGIN</span><i></i></button>
                                    // </div>
                                    <CardComponent 
                                        buycourses={d.buycourses} 
                                        button={"See more"} 
                                        count={ d.buycourses.length } 
                                        id={ d.course_id  } 
                                        key={k} 
                                        title={ d.course_title } 
                                        price={d.course_price} 
                                        picture={d.course_thumbnail} 
                                        link={"/courses/"+d.course_title} 
                                        discount={d.course_discount} date={new Date( d.course_discount_date )} 
                                        created={ new Date(d.course_createat) } 
                                        month={ d.course_month } 
                                        type={"course"} 
                                        cart={true}  
                                    />
                                )
                            }) :<h1>No mroe</h1>
                        // ):(
                        //     <LoadingComponent />
                        // )
                    }

                </section>
                <h1 className="text-center flex justify-center py-[10px] " >
                    <span>No More</span>
                </h1>
            </main>
        </>
    )
}