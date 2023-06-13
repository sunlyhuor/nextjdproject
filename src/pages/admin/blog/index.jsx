import React, { useEffect, useRef, useState } from 'react';
import JsCookie from "js-cookie"
import { useRouter } from 'next/router';
import Link from 'next/link';
// import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { BackendLink } from '@/components/components';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare , faTrash } from "@fortawesome/free-solid-svg-icons"

export default function AdminBlog() {
    const navigate = useRouter()
    let [ Blogs , setBlogs ] = useState([])

    async function getAllBLog(){
        try {
            const datas = await axios.get( BackendLink() + "/api/v1/blog/admin/blog" , {
                headers:{
                    "access_token":JsCookie.get("access_token")
                }
            } )
            setBlogs( datas.data.responses )
            console.log(datas.data.responses)
        } catch (error) {
            setBlogs([])
            console.log(error)
        }
    }

    useEffect(()=>{

        if( JsCookie.get("isAdmin") != "true" ){
            navigate.push("/")
        }

        getAllBLog()

    } , [  ] )

  return (
    <>
        <main>
            <div className='flex justify-end gap-[10px]' >
                <Link href={"blog/post"} className='bg-blue-600 text-white py-[3px] px-[20px] rounded text-center active:bg-yellow-500 hover:opacity-[0.8] ' ><button>Post</button></Link>
                {/* <button className='bg-blue-600 text-white py-[3px] px-[20px] rounded text-center active:bg-yellow-500 hover:opacity-[0.8] ' >Post</button> */}
            </div>
            <div className='min-[0px]:w-11/12 sm:w-10/12 mx-auto flex justify-center gap-[10px] flex-wrap ' >

                    {/*  */}

                        {
                            Blogs.length > 0?(

                                Blogs.map((d,k)=>(
                                    <div className='min-[0px]:w-full sm:w-5/12 lg:w-3/12 ' key={k} >
                                        <Image  className='w-full h-auto rounded' width={10000} height={1000} src={d.blog_thumbnail} alt='' />
                                        <p className='p-1 twolines' >
                                            { d.blog_title }
                                        </p>
                                        <p className='p-1' >
                                            { 
                                                d.status.status_name 
                                            }
                                        </p>
                                        <p className='p-1' >
                                            Post on :
                                            {
                                                new Date(d.blog_createat).getDate()+"-"+ (new Date(d.blog_createat).getMonth()+1) +"-"+( new Date(d.blog_createat).getFullYear() )
                                            }
                                        </p>
                                        <div className='p-1 flex gap-[10px]' >

                                            <Link href={"/admin/blog/update/"+d.blog_id} className='flex items-center gap-[5px] bg-blue-500 active:bg-yellow-300 text-white py-1 px-3 rounded ' >
                                                <FontAwesomeIcon icon={ faPenToSquare } />
                                                EDIT
                                            </Link>

                                            <button className='flex items-center gap-[5px] bg-red-500 active:bg-yellow-300 text-white py-1 px-3 rounded ' >
                                                <FontAwesomeIcon icon={ faTrash } />
                                                DELETE
                                            </button>

                                        </div>
                                    </div>  
                                ))
                            
                            ):(
                                <h1 className='text-center' >No blog!</h1>
                            )
                        }

                    {/*  */}
            </div>
        </main>
    </>
  );
}