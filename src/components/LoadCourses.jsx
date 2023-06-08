import CardComponent from "./Card"


export default function LoadCourses( {datas_json} ){
    
    console.log(datas_json)

    return(

        <>

            { 
                datas_json.responses ? datas_json.responses.map(( d , k )=>{
                    return(
                            // <h1 key={k} >sds</h1>

                        <CardComponent
                            buycourses={d.buycourses} 
                            button={"See more"} 
                            count={ d.buycourses.length } 
                            id={ d.course_id  } 
                            key={k} 
                            title={ d.course_title } 
                            price={d.course_price} 
                            picture={d.course_thumbnail} 
                            link={"/courses/"+d.course_title} 
                            discount={d.course_discount} date={new Date( d.course_discount_date )} 
                            created={ new Date(d.course_createat) } 
                            month={ d.course_month } 
                            type={"course"} 
                            cart={true}  
                        /> 
                    )
                    }) :""
            }

        </>
        
    )
}