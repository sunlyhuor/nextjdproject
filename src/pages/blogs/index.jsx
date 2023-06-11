import CardComponent from "@/components/Card"
import { BackendLink } from "@/components/components"

export async function getServerSideProps(){
    try{   
        const datas = await fetch( BackendLink() + "/api/v1/blog" )
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
    // console.log(datas_json.status)
    return(
        <main>
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
                                    button={"See more"}
                                />
                            )
                        })
                    ):(
                        <h1>No Blog yet</h1>
                    )
                }
            </section>
        </main>
    )
}