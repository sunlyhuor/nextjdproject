import Timeline from "@/components/Timeline";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook , faTelegram , faLinkedin, faTiktok } from "@fortawesome/free-brands-svg-icons"
import ProgresComponent from "@/components/Progres";
import MyPic from "@/assets/pictures/mypic.jpg"
import Image from "next/image"

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
            <section data-aos="fade-down" className="py-[25px]" >
                <h1 className="text-center text-[#9D38DD] font-bold text-3xl" >Who Am I?</h1>
                <div className="text-center py-[20px] flex justify-center " >
                    <Image width={200} height={200} src={MyPic} alt="sdasdhasj" />
                </div>
                <p className=" break-all px-5" >
                  &nbsp; Hello my name is ស៊ុន លីហួរ (SUN LYHUOR), i'm 20 year old.
                  {/* So now i'm studying be come to 
                  fullstack development but is not easy for me, because i need to learn alots of technologies such as 
                  Node Js, Nest Js, Javascript, Html, Css, PHP, Laravel, React Js, Next Js etc... I think so many technologies 
                  i need to learn, so i'm improve my self from day to day, Thank you.  */}
                </p>
            </section>


            <section className="py-[25px]" >
                <Timeline
                    title={"History of educations"}
                    datas={History}
                    color={"bg-blue-400"}
                />
            </section>
            
            <section data-aos="fade-down" >
                <h1 className="text-center  font-bold min-[0px]:text-xl md:text-3xl" >FOLLOW US ON</h1>
                <section className="flex justify-center gap-[20px] py-[10px]" >
                    <a  title="Sun LyHuor - Facebook" href="https://www.facebook.com/sunleehuor/" target="_blank">
                        <FontAwesomeIcon id="svg-inline--fa-title-0kK8mcia4PgJ"  className="text-blue-600 min-[0px]:text-3xl md:text-5xl cursor-pointer hover:opacity-[0.6] active:text-yellow-400" icon={faFacebook} />
                    </a>
                    <a  title="Sun LyHuor - Telegram" href="https://t.me/sunlyhuor" target="_blank">
                        <FontAwesomeIcon id="svg-inline--fa-title-0kK8mcia4PgJ"  className="text-blue-600 min-[0px]:text-3xl md:text-5xl cursor-pointer hover:opacity-[0.6] active:text-yellow-400" icon={faTelegram} />
                    </a>
                    <a  title="Sun LyHuor - Linkedin" href="https://www.linkedin.com/in/sun-lyhuor-5042bb212/" target="_blank">
                        <FontAwesomeIcon id="svg-inline--fa-title-0kK8mcia4PgJ"  className="text-blue-600 min-[0px]:text-3xl md:text-5xl cursor-pointer hover:opacity-[0.6] active:text-yellow-400" icon={faLinkedin} />
                    </a>
                    <a  title="Sun LyHuor - TitTok" href="https://www.tiktok.com/@huor1234" target="_blank">
                        <FontAwesomeIcon id="svg-inline--fa-title-0kK8mcia4PgJ"  className=" min-[0px]:text-3xl md:text-5xl cursor-pointer hover:opacity-[0.6] active:text-yellow-400" icon={faTiktok} />
                    </a>
                </section>
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
        </main>
    )
}