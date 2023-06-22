import axios from "axios"
import { useState } from "react"
import { BackendLink } from "@/components/components"
import JsCookie from "js-cookie"
import { useRouter } from "next/router"
import LoadingComponent from "@/components/Loading"
import AlertComponent from "@/components/Alert"
import Head from "next/head"


export default function ProfilePage(){

    let [ Loading , setLoading ] = useState(false)
    let [ Profile , setProfile ] = useState({})
    const navigate = useRouter()
    let [ Firstname , setFirstname ] = useState(null)
    let [ Alert , setAlert ] = useState(false)
    let [ Message , setMessage ] = useState(null)
    let [ Lastname , setLastname ] = useState(null)
    let [ Phone , setPhone ] = useState(null)

    async function fetchProfile(){
        // console.log( JsCookie.get("access_token") )
        try {
            setLoading( false )
            const datas = await axios.get( BackendLink() + "/api/v1/auth/user/profile" , {
                headers:{
                    "access_token":JsCookie.get("access_token")
                }
            } )
            setProfile( datas.data.responses[0] )
            // console.log( datas.data.responses[0] )
        } catch (error) {
            console.log( error )
            setLoading( false )
        }finally{
            setLoading( true )
        }
    }

    async function SubmitUpdate(e){
        e.preventDefault()

        // if( Firstname == "" || Firstname == null ){
        //     setMessage("firstname's required")
        //     setAlert(true)
        //     // console.log("firstname's required")
        // }else if( Lastname == "" || Lastname == null  ){
        //     setMessage("lastname's required")
        //     setAlert(true)
        //     // console.log("lasrname's required")
        // }else{
            // console.log( Firstname )
            try {
                // let form = new FormData()
                // form.append("firstname" , (Firstname == null || Firstname == "" ) ? Profile.auth_firstname : Firstname)
                // form.append("lastname" , (Lastname == null || Lastname == "" ) ? Profile.auth_lastname : Lastname )
                // form.append("phone" , Phone)
                // for (const value of form.values()) {
                //     console.log(value);
                // }
                const datas = await axios.put( BackendLink()+"/api/v1/auth/user/update" , {
                    firstname:(Firstname == null || Firstname == "" ) ? Profile.auth_firstname : Firstname,
                    lastname:(Lastname == null || Lastname == "" ) ? Profile.auth_lastname : Lastname,
                    phone:(Phone == null || Phone == "" ) ? Profile.auth_phone : Phone
                } , {
                    headers:{
                        "access_token":JsCookie.get("access_token")
                    }
                } )

                setMessage(datas.data.message)
                setAlert(true)

            } catch (error) {
                console.log( error )
                setMessage(error.response.data.message)
                setAlert(true)
            }

    }

    useState(()=>{

        if( JsCookie.get("logined") == "true" ){
            fetchProfile()
        }else{
            if( typeof window != "undefined" ){
                navigate.replace("/signout")
            }
        }


    } , [] )

    return(
        <main>
            <Head>
                <title>Profile - Sun Lyhuor</title>
            </Head>
            <AlertComponent 
                alert={Alert}
                changeAlert={()=> setAlert(!Alert) }
                message={Message}
            />
            <section className=" w-10/12 m-auto" >

                {
                    Loading?(
                        <div className="flex justify-evenly flex-wrap " >
                            <div>
                                <img className="w-[200px] h-[200px] rounded-[50%] border-[5px] border-blue-600" src={ Profile.auth_photo } alt="" />
                            </div>
                            <div>
                                <h2 className="text-center text-3xl py-[20px] underline "  >Personal Details</h2>
                                <form>
                                    <div className="flex flex-col mb-[6px] " >
                                        <label htmlFor="">FirstName</label>
                                        <input type="text" onChange={e=> setFirstname(e.target.value) } defaultValue={ Profile.auth_firstname  } />
                                    </div>
                                    {/*  */}
                                    <div className="flex flex-col mb-[6px] " >
                                        <label htmlFor="">LastName</label>
                                        <input type="text" onChange={e=> setLastname(e.target.value) } defaultValue={ Profile.auth_lastname } />
                                    </div>
                                    {/*  */}
                                    <div className="flex flex-col mb-[6px] " >
                                        <label htmlFor="">UserName</label>
                                        <input type="text" disabled value={ Profile.auth_username } />
                                    </div>
                                    {/*  */}
                                    <div className="flex flex-col mb-[6px] " >
                                        <label htmlFor="">Email</label>
                                        <input type="text" disabled value={ Profile.auth_email } />
                                    </div>
                                    {/*  */}
                                    <div className="flex flex-col mb-[6px] " >
                                        <label htmlFor="">Phone</label>
                                        <input type="text" onChange={e=> setPhone(e.target.value) } defaultValue={ ( Profile.auth_phone == null ) ? "" : Profile.auth_phone } />
                                    </div>
                                    <div>
                                        <button onClick={ SubmitUpdate } className="bg-blue-600 w-full py-[3px] rounded text-white active:bg-yellow-300" >UPDATE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ):(
                        <div className="text-center" >
                            <LoadingComponent />
                        </div>
                    )
                }

            </section>
        </main>
    )
}