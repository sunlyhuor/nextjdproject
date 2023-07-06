import AlertComponent from "@/components/Alert"
import { BackendLink } from "@/components/components"
import axios from "axios"
import { useState } from "react"

export default function RequestVerify (){

    let [ Message , setMessage ] = useState("")
    let [ Email , setEmail ] = useState("")
    let [ Password , setPassword ] = useState("")
    let [ Alert , setAlert ] = useState(false)

    async function handleRequest(e){
        // e.preventDefault()
        if( Email == null || Email == "" ){
            setAlert(true)
            setMessage("Please input email field!")
        }else if( Password == null || Password == "" ){
            setAlert(true)
            setMessage("Please input password field!")
        }else{
            try {
                const datas = await axios.post( BackendLink() + "/api/v1/auth/request/new/verify" , {
                    email:Email,
                    password:Password
                } )
                console.log( datas )
            } catch (error) {
                console.log( error )
            }
        }
    }

return(
    <div>
        <AlertComponent 
            alert={Alert}
            changeAlert={()=> setAlert(!Alert) }
            message={Message}
        />
        <div className="h-screen w-full flex justify-center">
            <form className="mt-[50px]" >
                <h1 className="text-4xl ty-[20px] mb-[20px]" >Verity account</h1> 
                <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput22"
                            placeholder="Password"
                            onChange={e=> setEmail(e.target.value) }
                        />
                    <label
                        for="exampleFormControlInput22"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Email
                    </label>
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput22"
                            placeholder="Password" 
                            onChange={e=> setPassword(e.target.value) }
                       />
                    <label
                        for="exampleFormControlInput22"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Password
                    </label>
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                    <button
                            onClick={ handleRequest }
                            type="button"
                            className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Request
                    </button>
                </div>

            </form>
        </div>  
    </div>
)
}
