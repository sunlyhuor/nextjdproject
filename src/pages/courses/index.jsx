import { Suspense, useEffect, useState , React } from "react"
import dynamic from "next/dynamic"
import LoadingComponent from "@/components/Loading"
const CardComponent = dynamic(()=> import("@/components/Card") , {
    loading:(
        <div className="text-center" >
            <LoadingComponent />
        </div>
    )
} )
import axios from "axios"
import { BackendLink } from "@/components/components"
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
        // setData(datas_json )
        // console.log( datas_json.responses )
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

                    <Suspense fallback={ 
                        <div className="text-center" >
                            <LoadingComponent />
                        </div>
                     }>
                        <section className="flex gap-[10px] justify-center flex-wrap">
                            {datas_json.responses
                                ? datas_json.responses.map((d, k) => {
                                    return (
                                        <CardComponent
                                            buycourses={d.buycourses}
                                            button={"See more"}
                                            count={d.buycourses.length}
                                            id={d.course_id}
                                            key={k}
                                            title={d.course_title}
                                            price={d.course_price}
                                            picture={d.course_thumbnail}
                                            link={"/courses/" + d.course_title} 
                                            discount={d.course_discount} 
                                            date={
                                                new Date(d.course_discount_date)
                                            } created={
                                                new Date(d.course_createat)
                                            }
                                            month={
                                                d.course_month
                                            }
                                            type={"course"}
                                            cart = {true}

                                        />
                                    );
                                })
                                : ""}
                        </section>
                    </Suspense>

                {/* <Suspense fallback={<p></p>} > */}

                    {/* <section className="flex gap-[10px] justify-center flex-wrap" >
                            
                                { 
                                    datas_json.responses ? datas_json.responses.map(( d , k )=>{
                                        return(
                                                // <h1 key={k} >sds</h1>

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
                                    }) :""
                                }

                        
                    </section> */}
                {/* </Suspense> */}
                
                <h1 className="text-center flex justify-center py-[10px] " >
                    <span>No More</span>
                </h1>
            </main>
        </>
    )
}