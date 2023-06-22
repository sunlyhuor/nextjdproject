import { useEffect, useState } from "react"
import ByCourse from "./BuyCourse"
import JsCookie from "js-cookie"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
// import UpdateTID from "./UpdateTID"
import { faEye, faSpinner, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function CardComponent({ buycourses , id , title , picture , link , button , discount , price , date , type , created , month , cart , count }){
    let [ BuyCourseLoad , setBuyCourseLoad ] = useState(false)
    const [Logined , setLogined ] = useState(false)
    
    const navigate = useRouter()

    const sybol = " > "

    // console.log( buycourses )
    
    function CheckBuy( code , array ){

            const datas = array.find(d=>{
                return d.auth.auth_code == code
            })
            if(datas) return true
            else return false

    }

    function getExpireDate( code , array ){
        const data = array.find( d=> {return (d.auth.auth_code == code && new Date() < new Date(d.expired_date))} )
        if( data ) return true
        else return false
    }

    function getStatus( code , array , status ){

        const data = array.find( d=> {return (d.auth.auth_code == code && d.status.status_name.toLowerCase() == status && new Date() < new Date(d.expired_date) ) } )
        if( data ) return true
        else return false

    }


    useEffect(()=>{

        setLogined( JsCookie.get("logined") == "true" ? true : false )

    } , [] )

    return(
        <>
            {
                ( type == "course" )?(
                    <ByCourse course_id={id} course_title={title} BuyCourseLoad={ BuyCourseLoad } SetBuyCourseLoad={ ()=> setBuyCourseLoad( !BuyCourseLoad ) } />
                ):""
            }
            <main suppressHydrationWarning={true} data-aos="zoom-in" className={" hover:scale-[1.01] relative hover:duration-300 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"} >
            {/* <main suppressHydrationWarning={true} data-aos="zoom-in" className={"min-[0px]:w-full sm:w-[49%] xl:w-[32%] hover:scale-[1.01] relative hover:duration-300 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"} > */}
                <Link className="min-[0px]:h-[180px] sm:h-[200px] md:h-[230px] xl:h-[250px] block w-full overflow-hidden" href={link}>
                        <Image priority={""} width={2000} height={2000} className="rounded object-auto w-full min-[0px]:h-[180px] sm:h-[200px] md:h-[230px] xl:h-[250px] hover:scale-110 hover:duration-300" src={picture} alt={title} />
                </Link>
                <section className="p-5" >

                    <Link href={link}>
                        <h5 className={`lg:text-sm xl:text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline hover:duration-300 title` }>{ title }</h5>
                    </Link>
                    {
                        (type == "course")?(
                            <>
                                <div>
                                    <span>
                                        {price? ( new Date().getTime() < new Date(date).getTime() ? <del>{"$"+price}</del> :"$" + price ) :""} { (new Date().getTime() < new Date(date).getTime()) ? sybol : "" } { (new Date().getTime() < new Date(date).getTime()) ? "$"+ (price - ( discount * price /100 )).toFixed(2) : "" }
                                    </span>
                                    <span className="absolute top-[0px] right-[-10px] bg-red-600 text-white rotate-45 text-sm px-[20px] z-[25]">
                                        {
                                            (new Date().getTime() < new Date(date).getTime()) ? <span>{discount}%</span> : <span></span>
                                        }
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Duration : { month }/{ (month <= 1) ? <sub>Month</sub> : <sub>Months</sub> }
                                    </span>
                                </div>
                            </>
                        ):""
                    }
                    <p className="mb-[5px] p-0" >
                        Posted on : { `${ new Date( created ).getDate() < 10 ? "0" + new Date( created ).getDate() : new Date( created ).getDate() }-${ new Date( created ).getMonth()+1 < 10 ? "0"+(new Date( created ).getMonth()+1) : new Date( created ).getMonth()+1 }-${ new Date( created ).getFullYear() }` }
                    </p>
                    {
                        type == "course"?(
                            <p className="mb-[5px] p-0" >
                                Count : { count }
                            </p>
                        ):""
                    }
                    {
                        type == "course"?(
                            <p className="mb-[5px] p-0" >
                                {
                                    new Date().getTime() < new Date( date ).getTime() ? (
                                        <>
                                            Discount end on : { `${ new Date( date ).getDate() < 10 ? "0" + new Date( date ).getDate() : new Date( date ).getDate() }-${ new Date( date ).getMonth()+1 < 10 ? "0"+(new Date( date ).getMonth()+1) : new Date( date ).getMonth()+1 }-${ new Date( date ).getFullYear() }` }
                                        </>
                                    ):"No discount yet!"
                                }
                    </p>
                        ):""
                    }
                    <section  className="flex justify-between"  >
                            <Link href={link}  >
                                <button className={"button mt-[10px] "} ><span>{button}</span><i></i></button>
                            </Link>
                            <>
                            {
                                ( type == "course" )?
                                    Logined ? (
                                        ( buycourses.length < 1 )?(
                                            <button className={"button mt-[10px] "} onClick={()=> setBuyCourseLoad(true) } ><span>ADD TO CART</span><i></i></button>
                                        ):(
                                            ( CheckBuy( JsCookie.get("code") , buycourses ) )?(
                                                ( getExpireDate( JsCookie.get("code") , buycourses ) )?(
                                                    ( getStatus( JsCookie.get("code") , buycourses , "completed" ) )?(
                                                        <Link href={"/courses/"+title}>
                                                            <button className={" bg-green-600 py-[3px] lg:text-sm hover:opacity-[0.6] active:bg-blue-600 text-white px-[15px] rounded mt-[10px] "} ><span className="flex items-center gap-[5px]" > <FontAwesomeIcon icon={faEye} /> Watching Now</span><i></i></button>
                                                        </Link>
                                                    ):(
                                                        ( getStatus( JsCookie.get("code") , buycourses , "padding" ) )?(
                                                            <button className={" bg-yellow-400 py-[5px] cursor-not-allowed lg:text-sm hover:opacity-[0.6] flex gap-[5px] active:bg-blue-600 text-white px-[15px] rounded mt-[10px] "} ><span> <FontAwesomeIcon className="animate-spin" icon={faSpinner} />CONFIRMING</span><i></i></button>
                                                        ):(
                                                            <button className={" bg-yellow-400 py-[3px] lg:text-sm hover:opacity-[0.6] active:bg-blue-600 text-white px-[15px] rounded mt-[10px] "} onClick={()=> navigate.push("/carts") } ><span> <FontAwesomeIcon className="animate-ping duration-300 text-black" icon={faX} /> Wrong TID</span><i></i></button>
                                                        )
                                                    )
                                                ):(
                                                    <button className={"bg-red-600 text-white rounded px-[10px] text-sm py-0"} onClick={()=> setBuyCourseLoad(true) } ><span>BUY AGAIN</span><i></i></button>
                                                )
                                            ):( 
                                                <button className={"button mt-[10px] "} onClick={()=> setBuyCourseLoad(true) } ><span>ADD TO CART</span><i></i></button>
                                            )
                                        )
                                    ):(
                                        <button className={"button mt-[10px] "} onClick={()=> navigate.push("/signin") } ><span>GO TO LOGIN</span><i></i></button>
                                    )
                                :("")
                            }
                            </>
                    </section>
                </section>
            </main>
        </>
    )
}