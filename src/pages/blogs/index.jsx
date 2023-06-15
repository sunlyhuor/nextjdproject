import CardComponent from "@/components/Card"
import { useRouter } from "next/router"
import { BackendLink } from "@/components/components"
import { useEffect } from "react"
import Head from "next/head"

export async function getServerSideProps( { query } ){
    try{  
        const { limit } = query 
        // const  count = limit ? limit : 15
        const datas = await fetch( BackendLink() + "/api/v1/blog?limit="+Number(limit) )
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

        if( !router.query.limit ){
            router.push("?limit=15")
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
            <section className="flex gap-[10px] justify-center flex-wrap">
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
                        <h1>No Blog yet</h1>
                    )
                }
            </section>
            <section className="py-[20px]" >
                <div className="text-center" >
                    <button onClick={()=> router.push("?limit="+( Number(router.query.limit) ? Number(router.query.limit) + 15 : 15 )) } className="text-center bg-green-600 text-white py-[3px] px-[15px] rounded" >See More</button>
                </div>
            </section>
        </main>
    )
}