import { Suspense, useEffect, useState , React } from "react"
import dynamic from "next/dynamic"
import LoadingComponent from "@/components/Loading"
import CardComponent from "@/components/Card"
// const CardComponent = dynamic(()=> import("@/components/Card") , {ssr:true} )
import axios from "axios"
import { BackendLink } from "@/components/components"
import Head from "next/head"
import { useRouter } from "next/router"
import { faAnglesLeft , faAngleRight, faAnglesRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




export default function CoursePage( { datas_json } ){
    const router = useRouter()
    let [ datas , setData ] = useState( datas_json.responses )
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
       
        if( !router.query.limit || !router.query.page ){
            router.push("?limit=15&page=1")
        }

        setLoading(true)

    } , [ BuyCourseLoad , datas_json ] )
    
    return(
        <>
            <Head>
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
                <meta name="description" content={ "Course page in sun lyhuor or huor class wesite" } />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="IE=7" />
                <title>Courses Page - Sun LyHuor </title>
            </Head>
            <main className="w-10/12 mx-auto relative" >
                    <div className="text-center flex gap-[10px] justify-start items-center my-[10px] sticky z-[11] bg-white top-[0px] right-0 " >
                        <button onClick={()=> router.push( `?limit=15&page=${ isNaN( router.query.page ) ? 1 : Number( router.query.page ) <= 1 ? 1 : Number(router.query.page) - 1 }` ) } > <FontAwesomeIcon className="min-[0px]:text-sm lg:text-xl inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" icon={faAnglesLeft} /> </button>
                        <span className="min-[0px]:text-sm lg:text-xl inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white   " >{router.query.page ? router.query.page : 1 }</span>
                        <button onClick={()=> router.push( `?limit=15&page=${ isNaN( router.query.page ) ? 1 : datas_json.responses.length > 0 ? Number( router.query.page ) + 1 : Number( router.query.page ) }` ) } > <FontAwesomeIcon className="min-[0px]:text-sm lg:text-xl inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" icon={faAnglesRight} /> </button>
                    </div>
                       {
                        !Loading?(
                            <div className="text-center" >
                                <LoadingComponent />
                            </div>
                        ):""
                       }
                        {/* <section className="flex justify-center flex-wrap gap-[10px] mb-[25px]"> */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] mb-[25px]">
                            {datas_json.responses.length > 0
                                ? datas_json.responses.map((d, k) => {
                                    return (
                                        <CardComponent
                                            buycourses={d.buycourses}
                                            button={"learn more"}
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
                                :
                                (
                                    ""
                                )
                            }
                        </section>
                        <h1 className="text-center" >No more</h1>
                   
            </main>
        </>
    )
}



export async function getServerSideProps( { query } ){
    try{
        let lm = !query.limit ? 15 : Number(query.limit)
        let pg = !query.page ? 1 : Number( query.page ) 
        const datas = await fetch( `${BackendLink()}/api/v1/course?limit=${lm}&page=${pg}` )
        const datas_json = await datas.json()
        return{
            props:{
                datas_json
            }
        }
    }catch(e){
        return{
            props:{
                datas_json:{
                    responses:[]
                }
            }
        }
    }
    finally{
        const Loading = true
    }
}