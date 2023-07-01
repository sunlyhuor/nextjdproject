import { useEffect, useState } from "react"
import {faArrowUp, faBurger , faXmark } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { GenerateNewToken } from "@/components/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import jsCookie from "js-cookie"
import { useRouter } from "next/router"
import LogoHuorClass from "@/assets/logo/huorclass_logo.png"
import Image from "next/image"

export default function HeaderComponent(){
    let [ Hamberger , setHamberger ] = useState(false)
    // const navigation = useNavigate()
    let [ Logined , setLogined ] = useState( false )
    let [ AdminSubMenu , setAdminSubMenu ] = useState(false)
    const router = useRouter()
    let [ Admin , setAdmin ] = useState(false)
    let [ ToTop , setToTop ] = useState(false)

    
    useEffect(()=>{

        window.addEventListener("scroll" , e=>{
            if( window.scrollY > 300 ){
                setToTop( true )
            }else{
                setToTop(false)
            }
        })

        // console.log( "Cookie : " + jsCookie.get("logined") )

        if( jsCookie.get( "logined" ) == 'true' ){
            setLogined(true)
            if( jsCookie.get("access_token") == "" || jsCookie.get("access_token") == undefined ){
                // console.log( )
                GenerateNewToken( jsCookie.get("refresh_token") )
                .then((d)=>{
                    jsCookie.set("access_token" , d.access_token)
                }).catch(e=>{
                    router.push("/signout")
                })

            }else if( jsCookie.get("refresh_token") == "" || jsCookie.get("refresh_token") == undefined ){
                router.push("/signout")
            }

            setInterval(()=>{
                console.log("New Generate")
    
                GenerateNewToken( jsCookie.get("refresh_token") )
                    .then((d)=>{
                        jsCookie.set("access_token" , d.access_token , { expires:1 }  )
                        // console.log("genterate")
                    }).catch(e=>{
                        // console.log(e)
                        router.push("/signout")
                    })            
    
            } , ( 1000 * 60 ) * 5 )

        }else{
            setLogined(false)
        }

        jsCookie.get("isAdmin") == "true" ? setAdmin(true)  : setAdmin(false)
        
    // } , (1000 * 60) * 5 )

    } , [ jsCookie.get("access_token") , jsCookie.get("refresh_token") ] )

    return(
        <>  
            <header className="relative" >
                <section className="w-full text-center min-[0px]:mb-[15px] sm:mb-[20px]">
                    {/* <Link href={"/"} className="mx-auto cursor-pointer inline" > */}
                    {/* <h1 className="w-[120px] cursor-pointer mx-auto text-xl font-bold flex gap-[5px] justify-center hover:underline transition hover:duration-300 ease ">
                            <span className="animate-[logocolor_3s_ease-in-out_infinite_alternate]" >Huor</span>
                            <span className="animate-[logocolor_5s_ease-in-out_infinite_alternate]" >Class</span>
                    </h1> */}
                    {/* </Link> */}
                        <Image onClick={()=> router.push("/") } className="mx-auto cursor-pointer rounded-[50%] my-[5px] min-[0px]:w-[70px] md:w-[70px] " src={LogoHuorClass}  width={2000} height={2000} alt="Sun LyHuor Logo" />
                </section>

                <div>
                    <div className="absolute top-[5px] z-[50] right-[20px]" >
                        <button className="z-[51]" onClick={()=> setHamberger(!Hamberger) } >
                            {
                                Hamberger?(
                                    <FontAwesomeIcon className="text-[25px]" icon={faXmark} />
                                    ):(
                                    <FontAwesomeIcon className="text-[25px]" icon={faBurger} />
                                )
                            }
                        </button>
                    </div>
                    <nav className={`z-10 absolute top-[50px] right-[20px] z-[40] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${Hamberger ? "block":"hidden"} `}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li><Link className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${ router.asPath == "/" ? "bg-gray-100 rounded" : "" } `} href="/">Home</Link></li>
                            <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${ (router.asPath == "/blogs" || router.asPath == "/blogs?limit="+router.query.limit+"&page="+router.query.page ) ? "bg-gray-100 rounded" : "" }` } href="/blogs" >Blogs</Link></li>
                            <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${ (router.asPath == "/courses" || router.asPath == "/courses?limit="+router.query.limit+"&page="+router.query.page ) ? "bg-gray-100 rounded" : "" }` } href="/courses" >Courses</Link></li>
                            <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${ router.asPath == "/plans" ? "bg-gray-100 rounded" : "" }` } href="/plans" >Plans</Link></li>
                            {
                                Admin?
                                (
                                    <li className="relative" >
                                        <button id="doubleDropdownButton" data-dropdown-toggle="doubleDropdown" onClick={()=> setAdminSubMenu( !AdminSubMenu ) } data-dropdown-placement="right-start" type="button" className={`flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${ ( router.asPath == "/admin/course" || router.asPath == "/admin/blog" || router.asPath == "/admin/cart" ) ? "bg-gray-100 rounded" : "" }`} >Admin<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg></button>
                                        <div id="doubleDropdown" className={`z-10 absolute min-[0px]:left-[-100px] sm:left-[-180px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${ AdminSubMenu ? "" : "hidden" } `}>
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                                                <li>
                                                    <Link href="/admin/course" className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white ${ router.asPath == "/admin/course" ? "bg-gray-100 rounded" : "" } ` }>Admin Courses</Link>
                                                    <Link href="/admin/cart" className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white ${ router.asPath == "/admin/cart" ? "bg-gray-100 rounded" : "" } `}>Admin Carts</Link>
                                                    <Link href="/admin/blog" className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white ${ router.asPath == "/admin/blog" ? "bg-gray-100 rounded" : "" }`}>Admin Blogs</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                ):
                                ("")
                            }
                            {
                                ( Logined )?(
                                    <>
                                        <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${ router.asPath == "/carts" ? "bg-gray-100 rounded" : "" }` } href="/carts" >Shopping Cart</Link></li>
                                        <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${ router.asPath == "/profile" ? "bg-gray-100 rounded" : "" }` } href="/profile" >Profile</Link></li>
                                    </>
                                ):(
                                    ""
                                )
                            }
                            <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${ router.asPath == "/about-us" ? "bg-gray-100 rounded" : "" }` } href="/about-us" >About us</Link></li>
                            {
                                ( Logined )?(   
                                   <li> <Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white` } href={"/signout"} >Log Out</Link> </li>
                                ):(
                                    <>
                                        <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white `} href="/signup">Sign Up</Link></li>
                                        <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ` } href="/signin">Sign In</Link></li>
                                    </>
                                )
                            }
                            
                        </ul>
                    </nav>
                </div>

            </header>
            {
                ToTop?(
                    <button className="fixed bottom-5 right-5 z-[10] flex justify-center items-center"
                        onClick={()=>{
                            window.scrollTo({top:0,left:0,behavior:"smooth"})
                        }} 
                    >
                        <div className="w-[50px] h-[50px] p-3 absolute bottom-[-2px] rounded-[50%] border-t-blue-600 border-[5px] animate-spin text-white bg-yellow-500 " ></div>
                        <FontAwesomeIcon
                            icon={faArrowUp}
                            className="bg-blue-400 w-[20px] h-[20px] p-3 z-[1] rounded-[50%] text-white"
                        />
                    </button>
                ):""
            }
        </>
    ) 
}