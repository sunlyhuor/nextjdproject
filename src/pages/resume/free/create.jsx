import { faPlus, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function ResumeMakeForFree(){
    let [ Educations, setEducations ] = useState([])
    let [ inputEducation, setInputEducation ] = useState({
        education:"",
        school:"",
        city:"",
        start:"",
        end:"",
        description:""
    })
    let [ eventEducation , setEventEducation ] = useState(false)
    let [ EducationCheckEndDate, setEducationCheckEndDate ] = useState( false )
 
    function handleInputEducation( e ){
        const { name , value } = e.target
        setInputEducation( 
            (p)=>({
                ...p,
                [name]:value
            })
        )
    }

    function handleAddEducation() {
        setEducations( (p)=> [...p, inputEducation] )
        setInputEducation({
            education:"",
            school:"",
            city:"",
            start:"",
            end:"",
            description:""
        })
    }

    function handleDeleteEducation( index ){
        let nr = [...Educations]
        nr.splice( index, 1 )
        setEducations( nr )
    }

    return(
        <section>
            <h1>Make free information</h1>
            <section>
                <section>
                    <div className="flex justify-between px-[10px]" >
                        <h1>Educations</h1>
                        {
                            eventEducation?(
                                <button onClick={()=> setEventEducation(false) } ><FontAwesomeIcon icon={faX} /></button>
                            ):(
                                <button onClick={()=> setEventEducation(true) } ><FontAwesomeIcon icon={faPlus} /></button>
                            )
                        }
                    </div>
                    {
                        // <h1>{Educations.length}</h1>
                        Educations.length > 0 && Educations.map((v , k)=>{
                                return(
                                    <div key={k} >
                                        <h1 key={k} >{v.school}-{k}</h1>
                                        <button onClick={()=> handleDeleteEducation(k) } >Delete</button>
                                    </div>
                                )
                            }
                        )
                    }
                    {
                        eventEducation?(
                            <div className="px-[15px]" >
                                {/* <section className="grid grid-cols-2 gap-[10px]" > */}
                                <section className="" >
                                <div class="mb-6">
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Education</label>
                                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Education" name="education"  onChange={handleInputEducation} value={inputEducation.education} />
                                </div>
                                <div class="mb-6">
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School</label>
                                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="School" name="school"  onChange={handleInputEducation} value={inputEducation.school} />
                                </div>
                                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City" name="city" onChange={handleInputEducation} value={inputEducation.city} />
                                        <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Start" name="start"  onChange={handleInputEducation} value={inputEducation.start} />
                                        <input type="checkbox" /><label>Present</label>
                                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="End" name="end"  onChange={handleInputEducation} value={inputEducation.end} />
                                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" name="description"  onChange={handleInputEducation} value={inputEducation.description} />
                                </section>
                                <button onClick={()=> {
                                    handleAddEducation()
                                } } >Add</button>
                            </div>
                        ):""
                    }
                </section>
            </section>
        </section>
    )
}