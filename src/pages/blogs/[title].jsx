import { BackendLink } from "@/components/components"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"

export async function getServerSideProps( { params } ){
    try{
        const { title } = params
        const datas = await fetch(BackendLink()+"/api/v1/blog/"+title)
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
                },
            }
        }
    }
}

export default function SignleBlog( {datas_json  } ){
    const  weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    // console.log( datas_json )
    return(
        <>

            {
                datas_json.status > 0?(
                    <main>
                        <Head>
                            <title>{datas_json.responses[0].blog_title} - Sun LyHuor </title>
                            <meta name="description" content={datas_json.responses[0].blog_title} />
                            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            
                        </Head>
                        <section className="lg:drop-shadow-none min-[0px]:drop-shadow-xl lg: flex min-[0px]:w-full md:w-10/12 mx-auto flex-wrap" >

                                <section className="lg:drop-shadow-xl min-[0px]:drop-shadow-none     p-4  lg:bg-white rounded min-[0px]:w-11/12 lg:w-8/12 mt-[30px] mx-auto " >
                                    <section className="md:px-[50px]" >
                                        <h1 className="md:text-3xl min-[0px]:text-2xl font-bold py-[10px] hover:underline cursor-pointer " >
                                            { datas_json.responses[0].blog_title }
                                        </h1>
                                        <div>
                                            {/* <p className="opacity-[0.6]" >sadsd</p> */}
                                            <p className="opacity-[0.6]" >{ `${ weekday[ new Date(datas_json.responses[0].blog_createat).getDay() ] }-${ new Date(datas_json.responses[0].blog_createat).getDate() }-${ (new Date(datas_json.responses[0].blog_createat).getMonth()+1) < 10 ? "0"+(new Date(datas_json.responses[0].blog_createat).getMonth()+1) : new Date(datas_json.responses[0].blog_createat).getMonth()+1 }-${ new Date(datas_json.responses[0].blog_createat).getFullYear() } ${ new Date(datas_json.responses[0].blog_createat).getHours() }:${ new Date(datas_json.responses[0].blog_createat).getMinutes() } ` }</p>
                                        </div>
                                    </section>
                                    <section className="py-[20px] md:px-[50px]" dangerouslySetInnerHTML={{__html: datas_json.responses[0].blog_content } } >
                                    </section>
                                </section>
                                <section className="p-4  lg:bg-white rounded min-[0px]:w-11/12 lg:w-4/12 my-[30px] mx-auto " >
                                    asdasdasdasdasdas
                                </section>

                        </section>
                    </main>
                ):(
                    <h1>Not found this title</h1>
                )
            }

        </>
    )
}