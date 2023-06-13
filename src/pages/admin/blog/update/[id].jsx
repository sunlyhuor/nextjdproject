import JsCookie from "js-cookie"
import axios from "axios"
import { useRouter } from "next/router"
import { BackendLink } from "@/components/components"
import { useEffect, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import AlertComponent from "@/components/Alert"

export default  function UpdateBlogByAdmin(){
    const router = useRouter()
    let [ Loading , setLoading ] = useState(false)
    let [ Alert , setAlert ] = useState(null)
    let [ Articles  , setArticles ] = useState(null)
    let [ Message , setMessage ] = useState(null)
    let [ Blog , setBlog ] = useState([])
    let [ Status , setStatus ] = useState([])
    let [ LoadingStatus , setLoadingStatus ] = useState(false)
    let [ Title , setTitle ] = useState( null )
    let [ get_status , set_get_status ] = useState( null )
    let [ submitLoading , setsubmitLoading ] = useState( false )

    async function getBlogByUId(){
        try{
            const datas = await axios.get( BackendLink()+"/api/v1/blog/byid/"+router.query.id )
            setBlog(datas.data.responses)
            console.log(datas)

        }catch(e){
            setBlog([])
            console.log(e)
        }
    }

    async function getStatus(){
        try {
            const datas = await axios.get( BackendLink()+"/api/v1/status" )
            // console.log(datas)
            setStatus( datas.data.responses )
        } catch (error) {
            setStatus([])
            // console.log(error)
        }
    }

    async function handleSubmit(){

        try {
            const datas = await axios.put( BackendLink() + "/api/v1/blog/update" , 
            {
                content:    (Articles == null || Articles == "")? Blog[0].blog_content :Articles,
                title:      (Title == null || Title == "")? Blog[0].blog_title :Title,
                status_id:  (get_status == null || get_status == 0)? Blog[0].status.status_id :get_status,
                blog_id:Number( router.query.id )
            },
            {
                headers:{
                    "access_token":JsCookie.get("access_token")
                }
            }
            )
            setMessage( datas.data.message )
            setAlert(true)
        } catch (error) {
            setMessage( error.response.data.message )
            setAlert(true)
            // console.log(error)
        }
        // console.log( (Articles == null || Articles == "")? Blog[0].blog_content :Articles )    
        // console.log( (Title == null || Title == "")? Blog[0].blog_title :Title )    
        // console.log( (get_status == null || get_status == 0)? Blog[0].status.status_id :get_status )    

    }

    useEffect(()=>{
        // console.log( router.query.id )
        getBlogByUId()
        getStatus()

    } , [] )

    return(
        <main>
            <AlertComponent 
                alert={Alert}
                message={Message}
                changeAlert={()=> setAlert(!Alert) }
            />
            <h1 className="text-center" >Update blog</h1>

            {
                Blog.length < 1?
                (
                    <h1 className="text-center" >Choose another id</h1>
                )
                :(
                    <div className="px-5" >

                            <div className="flex flex-col my-[10px]" >
                                <label htmlFor="">Title</label>
                                <textarea type="text" name="" id="" onChange={e=> setTitle(e.target.value) } defaultValue={Blog[0].blog_title} />
                            </div>
                            <div className="flex flex-col my-[10px]" >
                                <label htmlFor="">Status</label>
                                   
                                <select onChange={e=> set_get_status(e.target.value) } >
                                    <option value={0} > Choose a status </option>
                                    {
                                        Status.map((d,k)=>(
                                                <option key={k} value={d.status_id} > { d.status_name } </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <Editor
                                        // onInit={(evt, editor) => editorRef.current = editor}
                                    onChange={e=> setArticles( e.target.getContent() ) }
                                    id={"text_editor"}
                                    initialValue={ Blog[0].blog_content }
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

                                <div className="mt-[20px] mb-[50px] " >
                                    <button onClick={ handleSubmit } className="bg-green-600 rounded text-white px-[20px] py-[5px]" >Update</button>
                                </div>

                    </div>
                )
            }

        </main>
    )
}