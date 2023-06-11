import { useEffect, useState } from "react"
import UploadMedia from "./UploadMedia"
import axios from "axios"
import { BackendLink } from "@/components/components"
import LoadingComponent from "@/components/Loading"
import Image from "next/image"
import CopyToClipboard from "react-copy-to-clipboard"

export default function Media( { LoadMedia , setLoadMedia } ){
    let [ LoadUploadMedia , setUploadMedia ] = useState(false)
    let [ Datas , setDatas ] = useState([])
    let [ Loading , setLoading ] = useState(false)

    async function FetchingMedias(){
        try {
            setLoading(true)
            const datas = await axios.get( BackendLink()+"/api/v1/media/photos" )
            // console.log(datas.data.responses)
            setDatas(datas.data.responses)
        } catch (error) {
            setLoading(true)
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
  
        if( LoadMedia ){
            FetchingMedias()
        }

    } , [ LoadUploadMedia , LoadMedia ] )

    return(
        <main>
            <UploadMedia 
                LoadUplaodMedia={LoadUploadMedia}
                setUploadMedia={()=> setUploadMedia(!LoadUploadMedia) }
            />
            {
                LoadMedia?(
                    <>
                        <div className="fixed w-full h-screen opacity-[0.3] bg-black top-0 left-0 z-[100]" ></div>
                        <div className="z-[110] absolute left-0 top-0 w-full" >
                            <div className="bg-white p-[10px] w-11/12 m-auto mt-[50px] " >
                                <div className="flex justify-between" >
                                    <button onClick={()=> setLoadMedia() }>X</button>
                                    <button onClick={()=> setUploadMedia(true) } className='bg-blue-600 text-white py-[5px] px-[20px] rounded text-center active:bg-yellow-500 hover:opacity-[0.8] ' >Upload</button>
                                </div>
                                <div>
                                    {
                                        Loading?(
                                            <div className="text-center" >
                                                <LoadingComponent />
                                            </div>
                                        ):(
                                            Datas.length > 0?
                                            (
                                                Datas.map((d , k)=>{
                                                    return(
                                                        <div key={k} >
                                                            <CopyToClipboard 
                                                                text={d.media_name} 
                                                                onCopy={()=> alert("Copied") }
                                                            >
                                                                <Image width={100} height={100} src={d.media_name} alt="" />
                                                            </CopyToClipboard>
                                                        </div>
                                                    )
                                                })
                                            )
                                            :(
                                                <h1 className="text-center" >No media yet!</h1>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                ):""
            }
        </main>
    )
}