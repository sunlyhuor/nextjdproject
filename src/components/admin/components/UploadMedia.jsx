import AlertComponent from "@/components/Alert"
import { BackendLink } from "@/components/components"
import axios from "axios"
import { useState } from "react"
import JsCookie from "js-cookie"

export default function UploadMedia( { LoadUplaodMedia  , setUploadMedia } ){
    let [ Alert , setAlert ] = useState(false)
    let [ Message , setMessage ] = useState(null)
    let [ SelectFiles , setSelectFiles ] = useState([])

    async function HandleSubmit(e){
        e.preventDefault()
        if( SelectFiles.length < 1 ){
            setAlert(true)
            setMessage("Please select files!")
        }else{
            let form = new FormData()
            for( let i = 0; i < SelectFiles.length; i++ ){
                form.append("medias" , SelectFiles[i])
            }
            try {
                
                const datas = await axios.post(BackendLink()+"/api/v1/media/upload" , 
                    form,
                    {
                        headers:{
                            "access_token":JsCookie.get("access_token")
                        }
                    }
                )
                // console.log(datas)
                setMessage( datas.data.message )
                setAlert(true)
                setTimeout(()=>{
                    setUploadMedia()
                } , 3000 )
                setSelectFiles([])
            } catch (error) {
                // console.log(error)
                setMessage( error.response.data.message )
                setAlert(true)
            }

        }
        // console.log(SelectFiles)
    }

    return(
        <main>
            <AlertComponent 
                alert={Alert}
                changeAlert={()=> setAlert(!Alert) }
                message={Message}
            />
            {
                LoadUplaodMedia?
                (
                    <>
                        <div className="fixed w-full h-screen opacity-[0.6] bg-black top-0 left-0 z-[111]" ></div>
                        <div className="z-[121] absolute left-0 top-0 w-full" >
                            <div className="bg-white p-[10px] w-11/12 m-auto mt-[50px] " >
                                <div className="flex justify-between" >
                                    <button className=" font-bold" onClick={()=> setUploadMedia() }>X</button>
                                    {/* <button className='bg-blue-600 text-white py-[5px] px-[20px] rounded text-center active:bg-yellow-500 hover:opacity-[0.8] ' >Upload</button> */}
                                </div>
                                <div>
                                    <h1 className="text-center text-2xl" >Upload Medias</h1>
                                    <form >
                                        <div className="flex w-6/12 m-auto my-[20px] flex-col" >
                                            <label htmlFor="file_media">Select Medias</label>
                                            <input onChange={(e)=> setSelectFiles( Array.from(e.target.files) ) }  accept="image/*" type="file" multiple id="file_media" />
                                        </div>
                                        <div className="w-6/12 m-auto" >
                                            <button onClick={HandleSubmit} className="bg-blue-600 text-white py-[5px] px-[15px] rounded" >Upload</button>
                                        </div>
                                    </form>
                                    {/* <h1 className="text-center" >Not Media Yet</h1> */}
                                </div>
                            </div>
                        </div>
                    </>
                ):""
            }
            
        </main>
    )
}