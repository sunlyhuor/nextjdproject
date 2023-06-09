import Timeline from "@/components/Timeline";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook , faTelegram , faLinkedin, faTiktok } from "@fortawesome/free-brands-svg-icons"
import ProgresComponent from "@/components/Progres";
import MyPic from "@/assets/pictures/mypic.jpg"
import Image from "next/image"
import Head from "next/head";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function AboutPage(){

    const History = [
        {
            content:"Primary school",
            date:"01-01-2008",
            description:""
        },
        {
            content:"Secondary school",
            date:"01-01-2015",
            description:""
        },
        {
            content:"High school",
            date:"01-01-2020",
            description:""
        },
        {
            content:"Royal University of Phnom Penh",
            date:"01-01-2021 - Present",
            description:""
        },
    ]

    const Experiences = [
        {
            content:"Computer shop and Wordpress",
            description:"",
            date:"01-01-2023 - present"
        }
    ]

    const Projects = [
        {
            content:"FTC COMPUTER",
            description:"Need 3months to completed this project",
            date:"3 months",
            link:"https://ftccomputer.com",
            link_title:"SEE WEBSITE"
        
        }
    ]

    return(
        <main className="min-[0px]:w-11/12 md:w-8/12 mx-auto  mb-[50px]" >
            <Head>
                <title>About - us Sun Lyhuor</title>
            </Head>
            <section data-aos="fade-down" className="py-[25px]" >
                <h1 className="text-center text-[#9D38DD] font-bold text-3xl z-[10]" >Who Am I?</h1>
                <div className="w-full" >
                    <div className="relative min-[0px]:h-[55vh] min-[360px]:h-[40vh]  min-[400px]:h-[40vh] md:h-[40vh]" >
                            <div className="absolute text-center z-[20]  min-[0px]:top-[10px] md:top-[20px]" style={{ left:"50%" , transform: "translate(-50%, 0)" }} >
                            {/* <div className="absolute min-[0px]:left-[30%] md:left-[37%] xl:left-[43%] z-[1] min-[0px]:top-[30px] md:top-[40px] " > */}
                                <Image width={2000} height={2000} src={MyPic} className="w-[140px] h-[170px] animate-[scale_2s_ease-in-out_alternate_infinite]" alt ="sdasdhasj" />
                                <h1 className="text-center mt-[20px] " >Sun LyHuor</h1>
                                <button className="text-center bg-yellow-300 text-white rounded px-[10px] py-[3px] cursor-pointer z-[100] mx-auto shadow-lg shadow-yellow-500/50" onClick={()=> alert("Hello")} >GET MY CV</button>
                            </div>
                            <div className="w-full absolute flex justify-center bg-blue-400" >
                               <div className="border mx-auto border-gray-600 border-[3px] min-[0px]:w-[220px] min-[0px]:h-[220px] md:w-[250px] md:h-[250px] xl:w-[300px] xl:h-[300px] absolute animate-[spin_2s_ease-in-out_infinite]" style={ { borderRadius:"74% 26% 57% 43% / 36% 50% 50% 64%" } } ></div>
                            </div>
                            <div className="w-full absolute flex justify-center bg-blue-400" >
                                <div className="border border-red-600 border-[3px] min-[0px]:w-[220px] min-[0px]:h-[220px] md:w-[250px] md:h-[250px] xl:w-[300px] xl:h-[300px] absolute  animate-[spin_3s_ease-in-out_infinite]" style={ { borderRadius:"74% 26% 57% 43% / 36% 50% 50% 64%"} } ></div>
                            </div>
                            <div className="w-full absolute flex justify-center bg-blue-400" >
                                <div className="border border-blue-600 border-[3px] min-[0px]:w-[220px] min-[0px]:h-[220px] md:w-[250px] md:h-[250px] xl:w-[300px] xl:h-[300px] absolute  animate-[spin_4s_ease-in-out_infinite]" style={ { borderRadius:"74% 26% 57% 43% / 36% 50% 50% 64%" } } ></div> 
                            </div>
                            <div className="w-full absolute flex justify-center bg-black-400" >
                                <div className="border border-black border-[3px] min-[0px]:w-[220px] min-[0px]:h-[220px] md:w-[250px] md:h-[250px] xl:w-[300px] xl:h-[300px] absolute  animate-[spin_5s_ease-in-out_infinite]" style={ { borderRadius:"74% 26% 57% 43% / 36% 50% 50% 64%" } } ></div> 
                            </div>
                            {/* <div className="border border-blue-600 border-[3px] min-[0px]:w-[220px] min-[0px]:h-[220px] md:w-[250px] md:h-[250px] xl:w-[300px] xl:h-[300px] absolute  animate-[spin_4s_ease-in-out_infinite] duration-300 " style={ { borderRadius:"74% 26% 57% 43% / 36% 50% 50% 64%" } } ></div>
                            <div className="border border-red-600 border-[3px] min-[0px]:w-[220px] min-[0px]:h-[220px] md:w-[250px] md:h-[250px] xl:w-[300px] xl:h-[300px] absolute  animate-[spin_3s_ease-in-out_infinite] duration-300 " style={ { borderRadius:"61% 39% 77% 23% / 28% 75% 25% 72% " } } ></div>
                            <div className="border border-gray-600 border-[3px] min-[0px]:w-[220px] min-[0px]:h-[220px] md:w-[250px] md:h-[250px] xl:w-[300px] xl:h-[300px] absolute  animate-[spin_2s_ease-in-out_infinite] duration-300 " style={ { borderRadius:"23% 77% 74% 26% / 49% 36% 64% 51% " } } ></div> */}
                    </div>
                </div>
                <p className=" break-all px-5" >
                  &nbsp; Hello my name is ស៊ុន លីហួរ (SUN LYHUOR). I'm 20 years old, i make this website i just want to show my skill and get some money from this website like ads and sell video courses. Thanks you.
                  {/* So now i'm studying be come to 
                  fullstack development but is not easy for me, because i need to learn alots of technologies such as 
                  Node Js, Nest Js, Javascript, Html, Css, PHP, Laravel, React Js, Next Js etc... I think so many technologies 
                  i need to learn, so i'm improve my self from day to day, Thank you.  */}
                </p>
                <Link className="block text-center" href={"#history"} >
                    <FontAwesomeIcon className="text-2xl animate-[scale_2s_ease-in-out_alternate_infinite]"
                        icon={faArrowCircleDown}
                    />
                </Link>

            </section>


            <section className="py-[25px]" >
                <Timeline
                    id={"history"}
                    title={"History of educations"}
                    datas={History}
                    color={"bg-blue-400"}
                />
            </section>
            
            <section data-aos="fade-down" className="py-5" >
                <h1 className="text-center  font-bold min-[0px]:text-xl md:text-5xl" >FOLLOW US ON</h1>
                <section className="flex justify-center gap-[20px] py-[10px]" >
                    <a  title="Sun LyHuor - Facebook" href="https://www.facebook.com/sunleehuor/" target="_blank">
                        <FontAwesomeIcon id="svg-inline--fa-title-0kK8mcia4PgJ"  className=" text-blue-600 min-[0px]:text-3xl md:text-5xl cursor-pointer hover:opacity-[0.6] active:text-yellow-400" icon={faFacebook} />
                    </a>
                    <a  title="Sun LyHuor - Telegram" href="https://t.me/sunlyhuor" target="_blank">
                        <FontAwesomeIcon id="svg-inline--fa-title-0kK8mcia4PgJ"  className=" text-blue-600 min-[0px]:text-3xl md:text-5xl cursor-pointer hover:opacity-[0.6] active:text-yellow-400" icon={faTelegram} />
                    </a>
                    <a  title="Sun LyHuor - Linkedin" href="https://www.linkedin.com/in/sun-lyhuor-5042bb212/" target="_blank">
                        <FontAwesomeIcon id="svg-inline--fa-title-0kK8mcia4PgJ"  className=" text-blue-600 min-[0px]:text-3xl md:text-5xl cursor-pointer hover:opacity-[0.6] active:text-yellow-400" icon={faLinkedin} />
                    </a>
                    <a  title="Sun LyHuor - TitTok" href="https://www.tiktok.com/@huor1234" target="_blank">
                        <FontAwesomeIcon id="svg-inline--fa-title-0kK8mcia4PgJ"  className=" min-[0px]:text-3xl md:text-5xl cursor-pointer hover:opacity-[0.6] active:text-yellow-400" icon={faTiktok} />
                    </a>
                </section>
            </section>

            <section className="py-[25px]" >
                <Timeline
                    title={"Experiences"}
                    datas={Experiences}
                    color={"bg-red-500"}
                />
            </section>
            <section className="py-[25px]" >
                <Timeline
                    title={"Completed projects"}
                    datas={Projects}
                    color={"bg-red-500"}
                    
                />
            </section>
            <section>
                <h1 className="text-center text-[#9D38DD] font-bold text-3xl" >OTHER SKILLS</h1>
                <section>
                    <ProgresComponent 
                        title={"HTML"}
                        percent={"90%"}
                        color={"bg-green-400"}
                    />
                    <ProgresComponent 
                        title={"CSS"}
                        percent={"90%"}
                        color={"bg-green-400"}
                    />
                    <ProgresComponent 
                        title={"JAVASCRIPT"}
                        percent={"80%"}
                        color={"bg-green-400"}
                    />
                    <ProgresComponent 
                        title={"BOOTSTRAP * AND TAIWINDCSS"}
                        percent={"90%"}
                        color={"bg-green-400"}
                    />
                    <ProgresComponent 
                        title={"REACTJS AND VEUJS AND NODE JS"}
                        percent={"70%"}
                        color={"bg-red-400"}
                    />
                    <ProgresComponent 
                        title={"NEXT JS"}
                        percent={"60%"}
                        color={"bg-red-500"}
                    />
                    <ProgresComponent 
                        title={"NEST JS"}
                        percent={"60%"}
                        color={"bg-red-500"}
                    />
                    <ProgresComponent 
                        title={"SQL"}
                        percent={"75%"}
                        color={"bg-red-400"}
                    />
                    <ProgresComponent 
                        title={"NO SQL"}
                        percent={"50%"}
                        color={"bg-red-500"}
                    />
                </section>
            </section>
        </main>
    )
}