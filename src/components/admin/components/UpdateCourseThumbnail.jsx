import AlertComponent from "@/components/Alert"
import { BackendLink } from "@/components/components"
import axios from "axios"
import { useState } from "react"
import JsCookie from "js-cookie"

export default function UpdateCourseThumbnail( { LoadUpdateCourseThumbnail , SetLoadUpdateCourseThumbnail , course_id  } ){
    let [ Message , setMessage ] = useState(null)
    let [ Thumbnail , setThumbnail ] = useState(null)
    let [ Alert , setAert ] = useState(false)

    async function HandleSubmit(e){
        e.preventDefault()
        if( course_id == null ){
            setMessage("Course id not null");
            setAert(true)
        }else if( Thumbnail == null || Thumbnail == "" ){
            setMessage("Please select thumbnail");
            setAert(true)
        }else{
            // console.log( Thumbnail[0] )
            let form = new FormData()
            form.append( "course_id" ,course_id )
            form.append( "thumbnail" , Thumbnail )
            try {
                const datas = await axios.put( BackendLink() + "/api/v1/course/update/thumbnail" , form ,
                {
                    headers:{
                        "access_token":JsCookie.get("access_token")
                    }
                }
                )
                // console.log( datas )
                setAert(true)
                setMessage( datas.data.message )
                setTimeout(()=>{
                    SetLoadUpdateCourseThumbnail()
                } , 3000 )
            } catch (error) {
                setAert(true)
                setMessage( error.response.data.message )
                // console.log( error )
            }
        }
    }
    
    return(
        <>
            <AlertComponent 
                alert={Alert}
                message={Message}
                changeAlert={ ()=> setAert(!alert) }
            />
            {
                LoadUpdateCourseThumbnail?(
                    <>
                        <div className="fixed w-full h-screen opacity-[0.6] bg-black top-0 left-0 z-[111]" ></div>
                            <div className="z-[121] absolute left-0 top-0 w-full" >
                                    <div className="min-[0px]:w-11/12 sm:w-7/12 md:w-5/12 relative bg-white mx-auto p-5 mt-[20px]" >
                                        <h1 className="text-center text-2xl" >Update Course Thumbnail</h1>
                                        <h1>Id : {course_id} </h1>
                                        <form>
                                            <div className="flex m-auto my-[20px] flex-col p-5" >
                                                <label htmlFor="file_media">Select Course thumbnail</label>
                                                <input onChange={(e)=> setThumbnail( e.target.files[0] ) }  accept="image/*" type="file" multiple id="file_media" />
                                            </div>
                                            <div className="w-6/12 m-auto" >
                                                <button onClick={HandleSubmit} className="bg-blue-600 text-white py-[5px] px-[15px] rounded" >Update</button>
                                            </div>
                                        </form>
                                        <button className="absolute top-0 right-3 font-bold" onClick={()=> SetLoadUpdateCourseThumbnail() } >X</button>
                                    </div>
                        </div>
                    </>
                ):""
            }
        </>
    )
}