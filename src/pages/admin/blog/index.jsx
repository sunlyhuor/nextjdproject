import React, { useEffect, useRef, useState } from 'react';
import JsCookie from "js-cookie"
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AdminBlog() {
    const navigate = useRouter()

    useEffect(()=>{

        if( JsCookie.get("isAdmin") != "true" ){
            navigate.push("/")
        }

    } , [] )

  return (
    <>
        <main>
            <div className='flex justify-end gap-[10px]' >
                <Link href={"blog/post"} className='bg-blue-600 text-white py-[3px] px-[20px] rounded text-center active:bg-yellow-500 hover:opacity-[0.8] ' ><button>Post</button></Link>
                {/* <button className='bg-blue-600 text-white py-[3px] px-[20px] rounded text-center active:bg-yellow-500 hover:opacity-[0.8] ' >Post</button> */}
            </div>
        </main>
    </>
  );
}