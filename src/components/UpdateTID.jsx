import { useEffect, useState } from "react"
import AlertComponent from "./Alert"
import axios from "axios"
import { BackendLink } from "./components"
import JsCookie from "js-cookie"

export default function UpdateTID( { LoadUpdateTID , setLoadUpdateTID , buy_course_id , old_tid } ){
    let [ Alert , setAlert ] = useState(false)
    let [ Message , setMessage ] = useState(null)
    let [ TID , setTID ] = useState(null)
    let [ Loading , setLoading ] = useState(false)


    async function UpdateTID(e){
        e.preventDefault()
        if( TID == "" || TID == null ){
            setMessage("Please input your new TID!")
            setAlert(true)
        }else{
            try {
                const datas = await axios.put( BackendLink() + "/api/v1/buycourse/edit-tid" , {
                        buy_course_id:buy_course_id,
                        tid:TID
                    } , {
                        headers:{
                            "access_token":JsCookie.get("access_token")
                        }
                    }
                )
                setMessage( datas.data.message )
                setAlert(true)
                setTimeout(()=> {
                    setLoadUpdateTID()
                } , 3000 )
            } catch (error) {
                // console.log(er/ror)
                setMessage(error.response.data.message)
                setAlert(true)
            }
            }
    }


    return(
        <main>
            {
                LoadUpdateTID?(
                    <>
                        <div className="w-full h-screen fixed top-0 left-0 z-[120] opacity-[0.3] bg-black " ></div>
                        <section className="z-[121] w-full h-screen fixed top-0 left-0 flex flex-col items-center mt-[50px]" >
                            <AlertComponent alert={Alert} changeAlert={ ()=> setAlert( !Alert ) } message={ Message } />
                            <form className="bg-white py-[25px] px-[20px] rounded min-[0px]:w-10/12 sm:9/12 md:w-7/12 lg:w-4/12 relative " >
                                <h1 className="text-center text-2xl underline " >Update TID</h1>
                                <h1 className="mb-[10px]" >Your ID : { buy_course_id } </h1>
                                <h1 className="mb-[10px]" >Your Old TID : { old_tid } </h1>
                            
                                <div className="mb-6">
                                    <label htmlFor="tid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">TID</label>
                                    <input type="text" onChange={(e)=> setTID( e.target.value ) } id="tid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" required />
                                </div>

                                <div>
                                    {
                                        Loading?(
                                            <button className="text-center w-full h-[20px] rounded text-white py-[5px] " >
                                                <LoadingComponent />
                                            </button>
                                        ):(
                                            <button onClick={ UpdateTID } className="bg-blue-600 text-center w-full rounded text-white py-[5px] " >Update</button>
                                        )
                                    }
                                </div>
                                <button onClick={()=> setLoadUpdateTID() } className="absolute top-[5px] right-[10px]" >X</button>

                            </form>
                    </section>
                     </>
                ):("")
            }
        </main>
    )
}