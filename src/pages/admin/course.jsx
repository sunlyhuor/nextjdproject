import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import { useNavigate , Link } from "react-router-dom"
import JsCookie from "js-cookie"
import { useEffect, useState } from 'react'
import { BackendLink } from "@/components/components"
import LoadingComponent from '@/components/Loading'
import UpdateCourseAdminComponent from '@/components/admin/components/UpdateCourseAdmin'
import AddCourseAdminComponent from "@/components/admin/components/AddCourseAdmin"
import AddEpisodeAdminComponent from '@/components/admin/components/AddEpisodeAdmin'
import Image from 'next/image'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import UpdateCourseThumbnail from '@/components/admin/components/UpdateCourseThumbnail'


export default function CourseAdminPage(){
    const navigate = useRouter()
    let [ LoadEpisode , setLoadEpisode ] = useState(false)
    let [ Loading , setLoading ] = useState(false)
    let [ Courses , setCourses ] = useState([])
    let [ LoadUpdateCourse , setLoadUpdateCourse ] = useState(false)
    let [ Title , setTitle ] = useState("")
    let [ Description , setDescription ] = useState("")
    let [ Price , setPrice ] = useState("")
    let [ Discount , setDiscount ] = useState("")
    let [ DiscountDate , setDiscountDate ] = useState("")
    let [ Month , setMonth ] = useState()
    let [ Status , setStatus ] = useState("")
    let [ CourseId , setCourseId ] = useState()
    let [ LoadAddCourse , setLoadAddCourse ] = useState(false)
    let [ LoadUpdateCourseThumbnail , setLoadUpdateCourseThumbnail ] = useState(false)
    // let [ CourseId , setCourseId ] = useState(null)


    async function FetchingCourses(){
        try {
            setLoading(false)
            const datas = await axios.get( BackendLink() + "/api/v1/course/admin/course/" , {
                headers:{
                    "access_token":JsCookie.get("access_token")
                }
            } )
            setCourses( datas.data.responses )
            // console.log( datas.data.responses )
        } catch (error) {
            setLoading(false)
            console.log( error )
        }
        finally{
            setLoading(true)
        }
    }

    useEffect(()=>{

        if( JsCookie.get("isAdmin") != "true" ){
            // JsCookie.remove("isAdmin")
            // JsCookie.remove("logined")
            // localStorage.setItem("access_token" , "")
            // localStorage.setItem("refresh_token" , "")
            navigate.push("/signout")
        }   

        FetchingCourses()

    } , [ LoadUpdateCourse , LoadAddCourse ] )

    return(
        <main>
            <Head>
                <title>Admin Courses Page - Sun LyHuor</title>
            </Head>

            <UpdateCourseThumbnail 
                LoadUpdateCourseThumbnail={LoadUpdateCourseThumbnail}
                course_id={CourseId}
                SetLoadUpdateCourseThumbnail={ ()=> setLoadUpdateCourseThumbnail( !LoadUpdateCourseThumbnail )  }
            />

            <AddEpisodeAdminComponent
                LoadEpisode={LoadEpisode}
                setLoadEpisode={()=> setLoadEpisode(!LoadEpisode)}
           />
            <AddCourseAdminComponent 
                LoadAddCourse={LoadAddCourse}
                setLoadAddCourse={setLoadAddCourse}
            />
            <UpdateCourseAdminComponent 
                LoadUpdateCourse={LoadUpdateCourse} 
                setLoadUpdateCourse={ ()=> setLoadUpdateCourse(!LoadUpdateCourse)}  
                title={Title}
                description={Description}
                price={Price}
                discount={Discount}
                discount_date={DiscountDate}
                month={Month}
                status={Status}
                id={CourseId}
            />  
            <div className='text-end px-[20px] mb-[20px]' >
                <button onClick={()=> setLoadAddCourse(true) } className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                    Add Course
                </button>
                <button onClick={()=> setLoadEpisode(true) } className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                    Add Episode
                </button>
            </div>
            <section className='w-11/12 m-auto flex justify-center flex-wrap gap-[20px] ' >
                {
                    Loading?(
                        Courses.map((d,k)=>{
                            return(
                                    <div key={k} className="max-w-sm bg-white border border-gray-200 rounded-lg min-[0px]:w-11/12 sm:w-5/12 lg:w-4/12 xl:w-3/12 shadow dark:bg-gray-800 dark:border-gray-700">
                                          <div>
                                                {/* <Link className='w-full h-[200px]' href={"courses/"+d.course_title}> */}
                                                <div  className="relative rounded-t-lg h-[200px] w-full" >
                                                    <Image width={2000} height={2000} quality={100} className="rounded-t-lg h-[200px] w-full" src={ d.course_thumbnail } alt="" />
                                                    <button onClick={()=> {
                                                        setCourseId( d.course_id )
                                                        setLoadUpdateCourseThumbnail( true )
                                                    } } className='absolute top-0 right-0 text-white bg-blue-600 px-3 py-1 rounded' >
                                                        <FontAwesomeIcon icon={ faPenToSquare } />
                                                    </button>
                                                </div>
                                                {/* </Link> */}
                                                <div className="p-5">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ d.course_title }</h5>
                                                    <p className='p-1'>Price : ${ d.course_price }</p>
                                                    <p className='p-1'>Discount : { d.course_discount }% </p>
                                                    <p className='p-1'>Discount End Date : { d.course_discount_date } </p>
                                                    <p className='p-1'>Status : { d.status.status_name }</p>
                                                    <p className='p-1'>Count : { d.buycourses.length }</p>
                                                    {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{ d.course_description }</p> */}
                                                    <button onClick={()=> {
                                                        setCourseId( d.course_id )
                                                        setTitle( d.course_title )
                                                        setDescription( d.course_description )
                                                        setDiscount( d.course_discount )
                                                        setDiscountDate( d.course_discount_date )
                                                        setPrice( d.course_price )
                                                        setMonth( d.course_month )
                                                        setStatus( d.status.status_id )
                                                        setLoadUpdateCourse(true)
                                                    } } className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Update
                                                    </button>
                                                </div>
                                          </div>
                                    </div>
                            )
                        })
                    ):(
                        <div className='text-center' >
                            <LoadingComponent />
                        </div>  
                    )
                }

            </section>


        </main>
    )
}