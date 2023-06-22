import CardComponent from "@/components/Card"
import { useRouter } from "next/router"
import { BackendLink } from "@/components/components"
import { useEffect } from "react"
import Head from "next/head"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons"

export async function getServerSideProps( { query } ){
    try{  
        let lm = !query.limit ? 15 : Number(query.limit)
        let pg = !query.page ? 1 : Number( query.page ) 
        const datas = await fetch( BackendLink() + "/api/v1/blog?limit="+Number(lm)+"&page="+pg )
        const datas_json = await datas.json()
        return {
            props:{
                datas_json
            }
        }
    }catch(e){
        return {
            props:{
                datas_json:{
                    responses:[],
                    status:false
                }
            }
        }
    }
}

export default function BlogsPage( {datas_json} ){
    const router = useRouter()
    useEffect(()=>{

        if( !router.query.limit || !router.query.page ){
            router.push("?limit=15&page=1")
        }

    } , [] )
    return(
        <main>
            <Head>
                <title>Blog Page - Sun LyHuor</title>
                <meta http-equiv="X-UA-Compatible" content="IE=7" />
                <meta name="description" content="Blogs page where u can find good articles sun lyhuor or huorclass website" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
            </Head>
            {/* <h1>Blog</h1> */}
            <main className="w-10/12 mx-auto relative" >
                <div className="text-center flex gap-[10px] justify-start items-center my-[10px] sticky z-[11] bg-white top-[0px] right-0 " >
                    <button onClick={()=> router.push( `?limit=15&page=${ isNaN( router.query.page ) ? 1 : Number( router.query.page ) <= 1 ? 1 : Number(router.query.page) - 1 }` ) } > <FontAwesomeIcon className="min-[0px]:text-sm lg:text-xl inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" icon={faAnglesLeft} /> </button>
                    <span className="min-[0px]:text-sm lg:text-xl inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white   " >{router.query.page ? router.query.page : 1 }</span>
                    <button onClick={()=> router.push( `?limit=15&page=${ isNaN( router.query.page ) ? 1 :  datas_json.responses ? Number( router.query.page ) + 1 : Number( router.query.page )  } ` ) } > <FontAwesomeIcon className="min-[0px]:text-sm lg:text-xl inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" icon={faAnglesRight} /> </button>
                </div>
                <section className={`grid min-[0px]:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]`}>
                {/* <section className="flex min-[0px]:justify-center sm:justify-start flex-wrap gap-[10px]"> */}
                    {
                        datas_json.status?(
                            datas_json.responses && datas_json.responses.map(( d, k )=>{
                                return(
                                        <CardComponent
                                            key={k}
                                            picture={d.blog_thumbnail} 
                                            link={"blogs/"+d.blog_title}
                                            title={d.blog_title}
                                            created={ new Date(d.blog_createat) }
                                            button={"Read more"}
                                        />
                                )
                            })
                        ):(
                            ""
                        )
                    }
                </section>
                <h1 className="text-center w-full" >No Blog yet</h1>
            </main>
            {/* <section className="py-[20px]" >
                <div className="text-center" >
                    <button onClick={()=> router.push("?limit="+( Number(router.query.limit) ? Number(router.query.limit) + 15 : 15 )) } className="text-center bg-green-600 text-white py-[3px] px-[15px] rounded" >See More</button>
                </div>
            </section> */}
        </main>
    )
}