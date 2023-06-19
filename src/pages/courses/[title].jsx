import Link from "next/link"
import { BackendLink } from "@/components/components"
import axios from "axios"
import { useEffect, useState } from "react"
import LoadingComponent from "@/components/Loading"
import JsCookie from "js-cookie"
import ByCourse from "@/components/BuyCourse"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock , faLockOpen } from "@fortawesome/free-solid-svg-icons"
import ReactPlayer from "react-player"
import Image from "next/image"
import Head from "next/head"

export async function getServerSideProps( { params } ){
    try{
        const datas = await fetch( BackendLink() + "/api/v1/course/"+params.title  )
        const datas_json = await datas.json()
        return{
            props:{
                datas_json
            }
        }
    }catch(e){
        return{
            props:{
                datas_json:[]
            }
        }
    }
}

export default function SignleCoursePage( { datas_json } ){
    // const {title} = useParams()
    let [ Course , setCourse ] = useState([])
    let [Loading , setLoading] = useState(false)
    let [ Logined , setLogined ] = useState(false)
    let [ LoadingEpisode , setLoadingEpisode ] = useState(false)
    let [ Episodes , setEpisodes ] = useState([])
    let [ BuyCourseLoad , setBuyCourseLoad ] = useState(false)
    // const navigate = useNavigate()
    let [ checkVideo , setCheckVideo ] = useState(false)
    let [ CourseID , setCourseID ] = useState(null)
    let [ EpisodeID  ,setEpisodeID ] = useState(null)

    console.log( datas_json )
    
    async function FetchCourseByTitle(){


        try {
            setLoading(false)
            const datas = await axios.get( BackendLink() + "/api/v1/course/"+title )
            setCourse( datas.data[0] )
            // console.log(datas.data[0] )
        } catch (error) {
            setLoading(false)
            console.log( error )
        }finally{
            setLoading(true)
        }

    }

    async function FetcingEpisode(){
        try {
            setLoadingEpisode(true)
            const datas = await axios.get( BackendLink()+"/api/v1/course/get/episodes/"+title)
            console.log(datas.data.responses)
            setEpisodes(datas.data.responses)
        } catch (error) {
            setLoadingEpisode(true)
            // console.log(error)
        }finally{
            setLoadingEpisode(false)
        }
    }

    async function getVideo( episode,  course , token ){
        try {
            const datas = await axios.get( BackendLink() + `/api/v1/course/get/videos/${episode}/${course}/${token}` )
            setCheckVideo(true)
            // console.log(datas)
        } catch (error) {
            setCheckVideo(false)
            // console.log(error)   
        }
    }

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

    useEffect( ()=>{
        setLogined( JsCookie.get("logined") == "true" ? true : false )
    
    } , [ BuyCourseLoad ] )

    return(
        <>

                {
                    datas_json.length > 0?(
                        <main className="flex md:justify-center flex-wrap min-[0px]:items-center md:items-start md:flex-row  min-[0px]:flex-col " >
                            <Head>

                                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
                                <meta name="keywords" content={ datas_json[0].course_description } />
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                <meta http-equiv="X-UA-Compatible" content="IE=7" />
                                <title>{datas_json[0].course_title} - Sun LyHuor </title>
                                <meta name="description" content={datas_json[0].course_description} />

                            </Head>
                            <section className="min-[0px]:w-11/12 lg:w-7/12" >
                                {/* {
                                    checkVideo?(
                                        <div className="text-center mb-[25px]" >
                                            <ReactPlayer 
                                                loop
                                                playsinline
                                                controls
                                                pip={false}
                                                // onDuration={e=> console.log(e) }
                                                url={ BackendLink()+`/api/v1/course/get/videos/${EpisodeID}/${CourseID}/${JsCookie.get("access_token")}` } />
                                        </div>
                                    ):""
                                } */}

                                {
                                    !Loading ? (
                                        <>  
                                            {
                                                datas_json[0]?(
                                                    <>
                                                        <ByCourse course_id={ datas_json[0].course_id } course_title={datas_json[0].course_title} BuyCourseLoad={ BuyCourseLoad } SetBuyCourseLoad={ ()=> setBuyCourseLoad( !BuyCourseLoad ) } />
                                                        <section className="min-[0px]:w-11/12 sm:w-8/12 m-auto rounded flex flex-col gap-[15px]" >
                                                            <div className="w-full relative" >
                                                                <Image quality={90} width={2000} className="w-full" height={2000} src={ datas_json[0].course_thumbnail } alt={ datas_json[0].course_title } />
                                                                <span className="absolute top-[10px] right-[-15px] text-white rotate-45 bg-red-600 px-[30px] " >
                                                                    { 
                                                                        (new Date() < new Date( datas_json[0].course_discount_date ) )? ( ( datas_json[0].course_discount + "%" ) ) : ("")
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <h2 className="text-2xl font-bold " >{ datas_json[0].course_title }</h2>
                                                                {
                                                                    Logined?(
                                                                        CheckBuy( JsCookie.get("code") , datas_json[0].buycourses )?(
                                                                            getExpireDate( JsCookie.get("code") , datas_json[0].buycourses )?(
                                                                                getStatus( JsCookie.get("code") , datas_json[0].buycourses , "completed" )?(
                                                                                    <button className={"bg-green-600 text-white px-[20px] rounded py-[3px] mt-[10px] "} ><span>Bought</span><i></i></button>
                                                                                ):(
                                                                                    getStatus( JsCookie.get("code") , datas_json[0].buycourses , "padding" )?
                                                                                    (
                                                                                        <button className={"button mt-[10px] "} ><span>Comfirming</span><i></i></button>
                                                                                    ):
                                                                                    (
                                                                                        <button className={"button mt-[10px] "} ><span>wrong tid</span><i></i></button>
                                                                                    )
                                                                                )
                                                                            ):(
                                                                                <button onClick={()=> setBuyCourseLoad(true) } className={"button mt-[10px] "} ><span>buy again</span><i></i></button>
                                                                            )
                                                                        ):(
                                                                            <button onClick={()=> setBuyCourseLoad(true) } className={"button mt-[10px] "} ><span>add to cart</span><i></i></button>
                                                                        )
                                                                        ):(
                                                                            <Link href={"/signin"} ><button className={"button mt-[10px] "} ><span>go to signin</span><i></i></button></Link>
                                                                        )
                                                                }
                                                                
                                                            </div>
                                                            <p className="p-0" >
                                                                Date :  { datas_json[0].course_month + "/" } { (datas_json[0].course_month <= 1 )? <sub>Month</sub> :  ( <sub>Months</sub> ) }
                                                            </p>
                                                            <p className="p-0" >
                                                                {datas_json[0].course_price? ( new Date() < new Date( datas_json[0].course_discount_date ) ? <del>{datas_json[0].course_price+"$"}</del> : datas_json[0].course_price + "$" ) :""} { (new Date() < new Date( datas_json[0].course_discount_date ) ) ? ">" : "" } { (new Date() < new Date( datas_json[0].course_discount_date ) ) ? datas_json[0].course_price - ( datas_json[0].course_discount * datas_json[0].course_price /100 )+"$" : "" }
                                                                {/* price : { Course.course_price }$ */}
                                                            </p>
                                                            <p className="p-0" >
                                                                posted on : { new Date( datas_json[0].course_createat  ).getDate() + "-" + (new Date( datas_json[0].course_createat ).getMonth()+1) + "-" + new Date( datas_json[0].course_createat  ).getFullYear() }
                                                            </p>
                                                            <p className="p-0" >
                                                                Posted By : { datas_json[0].auth.auth_lastname }
                                                            </p>
                                                            <p className="px-[10px]" >
                                                                { datas_json[0].course_description }
                                                            </p>
                                                        </section>
                                                    </>
                                                ):(
                                                    <h1>No this course</h1>
                                                )
                                            }
                                        </>
                                    ):(
                                        <div className="text-center" >
                                            <LoadingComponent />
                                        </div>
                                    )
                                }
                            </section>
                            {/* Episode */}
                            <section className="min-[0px]:w-7/12 lg:w-4/12" >
                                    <div className="" >
                                        <h1 className="text-center underline text-xl" >Episodes</h1>
                                        
                                        {
                                            Loading?(
                                                <div className="text-center" >
                                                    <LoadingComponent />
                                                </div>
                                            ):(
                                                datas_json[0].episodes.length > 0?(
                                                    <div>
                                                        {
                                                            checkVideo?(
                                                                <div className="text-center my-[25px] w-full" >
                                                                    <ReactPlayer 
                                                                        loop
                                                                        playsinline
                                                                        controls
                                                                        pip={false}
                                                                        // onDuration={e=> console.log(e) }
                                                                        url={ BackendLink()+`/api/v1/course/get/videos/${EpisodeID}/${CourseID}/${JsCookie.get("access_token")}` } />
                                                                </div>
                                                            ):""
                                                        }
                                                        {
                                                            datas_json[0].episodes.map((d,k)=>(
                                                                Logined?(
                                                                    CheckBuy( JsCookie.get("code") , datas_json[0].buycourses )?(
                                                                            getExpireDate( JsCookie.get("code") , datas_json[0].buycourses )?(
                                                                                getStatus( JsCookie.get("code") , datas_json[0].buycourses , "completed" )?(
                                                                                    ( d.status.status_id == 2 )?(
                                                                                        <h1 onClick={()=>{
                                                                                            getVideo( d.episode_id , datas_json[0].course_id , JsCookie.get("access_token") )
                                                                                            setCourseID(datas_json[0].course_id)
                                                                                            setEpisodeID(d.episode_id)
                                                                                        } } className=" flex items-center cursor-pointer hover:opacity-[0.8] hover:duration-300 active:bg-blue-500 justify-evenly my-[10px] py-[5px] bg-green-400 text-white font-bold rounded text-center" key={k} >
                                                                                            <span>{d.episode }-{d.episode_title} </span> <FontAwesomeIcon icon={faLockOpen} />
                                                                                        </h1>
                                                                                    ):(
                                                                                        ""
                                                                                    )
                                                                                ):(
                                                                                    getStatus( JsCookie.get("code") , datas_json[0].buycourses , "padding" )?
                                                                                    (
                                                                                        <h1 className=" cursor-not-allowed flex items-center justify-evenly my-[10px] py-[5px] bg-red-400 text-white font-bold rounded text-center" key={k} >
                                                                                            <span>{d.episode }-{d.episode_title} <FontAwesomeIcon icon={faLock} /> </span>  {"Confirming"}
                                                                                        </h1>
                                                                                    ):
                                                                                    (
                                                                                        <h1 className=" cursor-not-allowed flex items-center justify-evenly my-[10px] py-[5px] bg-red-400 text-white font-bold rounded text-center" key={k} >
                                                                                            <span>{d.episode }-{d.episode_title} <FontAwesomeIcon icon={faLock} /> </span>  {"Wrong TID"}
                                                                                        </h1>
                                                                                    )
                                                                                )
                                                                            ):(
                                                                                    <h1 className=" flex cursor-not-allowed items-center justify-evenly my-[10px] py-[5px] bg-red-400 text-white font-bold rounded text-center" key={k} >
                                                                                        <span>{d.episode }-{d.episode_title} </span> <FontAwesomeIcon icon={faLock} />
                                                                                    </h1>
                                                                            )
                                                                        )
                                                                        :(
                                                                            <h1 className=" flex cursor-not-allowed items-center justify-evenly my-[10px] py-[5px] bg-red-400 text-white font-bold rounded text-center" key={k} >
                                                                                <span>{d.episode }-{d.episode_title} </span> <FontAwesomeIcon icon={faLock} />
                                                                            </h1>
                                                                            // <h1 className=" my-[10px] py-[5px] bg-red-400 text-white font-bold rounded text-center" key={k} >{ d.episode }-{d.episode_title}</h1>
                                                                        )
                                                                ):(
                                                                    <h1 className=" flex items-center justify-evenly my-[10px] py-[5px] bg-red-400 text-white font-bold rounded text-center" key={k} >
                                                                        <span>{d.episode }-{d.episode_title} </span> <FontAwesomeIcon icon={faLock} />
                                                                    </h1>
                                                                )
                                                            ))
                                                        }
                                                    </div>
                                                ):(
                                                    <h1 className="text-center" >Not Episode yet</h1>
                                                )
                                            )
                                        }
                                </div>
                            </section>

                        </main> 
                    ):(
                        <h1>Not found this course</h1>
                    )
                }

        </>
    )
}