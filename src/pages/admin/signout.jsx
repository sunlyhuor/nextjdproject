import JsCookie from "js-cookie"
import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import { useRouter } from "next/router"

export default function SignOutPage(){
        const navigate = useRouter()
       
        useEffect(()=>{
            JsCookie.remove("logined")
            JsCookie.remove("code")
            JsCookie.remove("isAdmin")
            JsCookie.remove("access_token")
            JsCookie.remove("refresh_token")
            navigate.push("/signin")
        } , [] )

    return(
        <>
            <h1>Logout ..............</h1>
        </>
    )
}