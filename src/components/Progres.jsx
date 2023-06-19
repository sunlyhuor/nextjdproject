export default function ProgresComponent( { percent , title , color } ){
    return(
        <div  data-aos="fade-down-right" className="mb-[10px]">
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 dark:text-white">{title}</span>
                {/* <span className="text-sm font-medium text-blue-700 dark:text-white">{percent}</span> */}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className={"h-2.5 rounded-full " + color} style={{width:percent}}></div>
            </div>
        </div>
    )
}