import React from "react";
import './ForecastRow.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {  faCloud} from "@fortawesome/free-solid-svg-icons";



const ForecastRow = ({temp,month,date,icon}) =>{
    return(
        <div>
            <div className={"row"} >

                <div className="weather-icon" >
                   {/*<FontAwesomeIcon icon={faCloud} color='white'/>*/}
                    {<img src={`https://openweathermap.org/img/wn/${icon}.png`} alt=""/>}
                </div>
                <div  className="temp">{temp}°C </div>
                <div  className="month"> {month}</div>
                <div  className="date">{date}</div>

            </div>
        </div>
    )
}


export default ForecastRow;