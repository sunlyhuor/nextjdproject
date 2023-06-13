import React, { useEffect, useRef, useState } from 'react';
import JsCookie from "js-cookie"
import { useRouter } from 'next/router';
import { Editor } from '@tinymce/tinymce-react';
import Media from '@/components/admin/components/Medias';
import AlertComponent from '@/components/Alert';
import axios from 'axios';
import { BackendLink } from '@/components/components';
import LoadingComponent from '@/components/Loading';

export default function AdminPostBlog() {
    let [ Articles , setArticles ] = useState("")
    let [ Title , setTitle ] = useState("")
    let [ Status , setStatus ] = useState(null)
    let [ LoadMedia , setLoadMedia ] = useState(false)
    let [ Thumbnail , setThumbnail ] = useState(null)
    let [ Message , setMessage ] = useState(null)
    let [ Alert , setAlert ] = useState(false)
    let [ Get_Status , set_Get_Status ] = useState([])
    let [ LoadingStatus , setLoadingStatus ] = useState(false)
    const navigate = useRouter()

    async function handleSubmit(e){
        e.preventDefault()

        if( Articles.length < 1 || Articles == null ){
            setAlert(true)
            setMessage("Please write article before submit!")
        }else if( Title == null || Title == "" ){
            setAlert(true)
            setMessage("Please input title!")
        }
        else if( Thumbnail == null || Thumbnail == "" ){
            setAlert(true)
            setMessage("Please choose thumbnail!")
            
        }else if( Status == null ){
            setAlert(true)
            setMessage("Please choose status!")
        }
        else{
            try {
                let form = new FormData()
                form.append( "thumbnail" , Thumbnail )
                form.append( "content" , Articles )
                form.append( "title" , Title )
                form.append("categories" , "")
                form.append("categories" , "")
                form.append("status" , Status )
                const datas = await axios.post( BackendLink() + "/api/v1/blog/create" , 
                form,
                {
                    headers:{
                        "access_token":JsCookie.get("access_token")
                    }
                }
                )
                setAlert(true)
                setMessage( datas.data.message )
                // console.log(datas)

            } catch (error) {
                console.log(error)
                setAlert(true)
                setMessage( error.response.data.message )
            }
        }

    }

    async function FetchingStatus(){
        try {
            setLoadingStatus(false)
            const datas = await axios.get( BackendLink() + "/api/v1/status" )
            // console.log(datas.data.responses)
            set_Get_Status( datas.data.responses )
        } catch (error) {
            setLoadingStatus(false)
            console.log(error)
        }finally{
            setLoadingStatus(true)
        }
    }

    useEffect(()=>{

        if( JsCookie.get("isAdmin") != "true" ){
            navigate.push("/")
        }

        FetchingStatus()

    } ,  [] )

  return (
    <main className='my-[20px]' >  
        <AlertComponent 
            alert={Alert}
            changeAlert={()=> setAlert(!Alert) }
            message={Message}
        />
        <Media 
            LoadMedia={LoadMedia}
            setLoadMedia={()=> setLoadMedia(!LoadMedia) }
        />
        <div className='flex justify-end p-[10px]' >
            <button onClick={()=> setLoadMedia(true) } className='bg-blue-600 text-white py-[5px] px-[20px] rounded text-center active:bg-yellow-500 hover:opacity-[0.8] ' >Select Medias</button>
        </div>
        <Editor
            // onInit={(evt, editor) => editorRef.current = editor}
            onChange={e=> setArticles( e.target.getContent() ) }
            id={"text_editor"}
            initialValue=""
            init={{
            height: "100vh",
            menubar: false,
            plugins: [
                'a11ychecker','advlist','advcode','advtable','autolink',
                'checklist','export', 'lists','link','image',
                'charmap','preview', 'anchor', 
                'searchreplace', 
                'visualblocks',
                //'powerpaste',
                "fullscreen",
                "formatpainter",
                "insertdatetime",
                "media",
                //"noneditable",            
                "table","help","wordcount"
            ],
            toolbar:
                'undo redo | casechange blocks | image | media | link | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
            }}
        />
        <form className='px-[20px]' >
                <div className='my-[10px] flex flex-col ' >
                    <label htmlFor='title' >Title</label>
                    <input type="text" onChange={e=> setTitle(e.target.value) }id='title' />
                </div>
                <div className='my-[10px] flex flex-col ' >
                    <label htmlFor='thumbnail' >Slect Thumnail</label>
                    <input type="file" onChange={e=> setThumbnail(e.target.files[0]) } accept='image/*' id='thumbnail' />
                </div>
                <div className='my-[10px] flex flex-col ' >
                    <label htmlFor='status' >Slect Status</label>
                    {
                        LoadingStatus?(
                            <select onChange={e=> setStatus(e.target.value) } name="" id="status">
                            <option value={1}>Select Status</option>
                            {
                                Get_Status.map((d , k)=>(
                                    <option key={k} value={d.status_id} >{d.status_name}</option>
                                ))
                            }
                        </select>
                        ):(
                            <div className='text-center' >
                                <LoadingComponent />
                            </div>
                        )
                    }
                    {/* <input type="file" onChange={e=> setThumbnail(e.target.files[0]) } accept='image/*' id='status' /> */}
                </div>
                <div className='my-[10px]' >
                    <button  className='bg-blue-600 text-white py-[5px] px-[20px] rounded text-center active:bg-yellow-500 hover:opacity-[0.8] ' onClick={ handleSubmit }>Publish</button>
                </div>
        </form  >
    </main>
  );
}