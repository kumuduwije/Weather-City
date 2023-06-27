import './Model.css'
import React from 'react';
import {Modal, Box, Fade, Backdrop} from '@mui/material';
import ForecastRow from './ForecastRow'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {  faXmark} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Model = ({open, setOpen, weatherData, name, cardObj, forecast}) => {

    function getTimeFromDateTime(dateTimeString) {
        // Split the date and time parts
        const dateTimeParts = dateTimeString.split(' ');

        // Check if the format is valid (date and time parts exist)
        if (dateTimeParts.length === 2) {
            const timePart = dateTimeParts[1];

            // Split the time into hours and minutes
            const [hours, minutes] = timePart.split(':');

            // Initialize period as 'AM'
            let period = 'AM';

            // Convert hours to numeric value
            let formattedHours = parseInt(hours, 10);

            // Determine the period (AM or PM)
            if (formattedHours >= 12) {
                period = 'PM';
                formattedHours -= 12;
            }

            // Special case: Midnight (12:00 AM)
            if (formattedHours === 0) {
                formattedHours = 12;
            }

            // Format the time with hours, minutes, and period
            const formattedTime = `${formattedHours}:${minutes} ${period}`;
            return formattedTime;
        }

        // Return null if the format is invalid
        return null;
    }

    function capitalizeFirstLetter(str) {
        // Check if the string is not empty
        if (str && str.length > 0) {
            // Capitalize the first letter and concatenate with the rest of the string
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        // Return an empty string if the input is empty
        return "";
    }



    if (!open) return null;

    return (
        <div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}

            >

                <Fade in={open}>


                    <Box className="main-modal"  >
                            {/*<CloseIcon/>*/}
                            <FontAwesomeIcon
                                icon={faXmark}
                                size={"lg"}
                                className = "close-btn"
                                onClick={() => setOpen(false)}

                            />


                        {/*<Typography style={{fontFamily:'poppins',fontWeight:'bold'}} className={"heading"}  id="modal-modal-title" variant="h6" component="h2">*/}
                        {/*    Weather Forecast in {cardObj.name}*/}
                        {/*</Typography>*/}

                        <h1  className="heading"  id="modal-modal-title" >
                            Weather Forecast in {cardObj.name}

                        </h1>
                        {/*Five day forecast section*/}
                        <div className="forecast-section">


                            <Box className={"fiveDays"}>
                                <h1 className="sub-title">
                                    5 Days Forecast
                                </h1>
                                {
                                    forecast &&
                                    <>
                                        <ForecastRow temp={"17"} month={"27 June"} date={"Tuesday"} icon={forecast.list[0].weather[0].icon}/>
                                        <ForecastRow temp={"22"} month={"28 June"} date={"Wednesday"} icon={forecast.list[0].weather[0].icon}/>
                                        <ForecastRow temp={"16"} month={"29 June"} date={"Thursday"} icon={forecast.list[0].weather[0].icon}/>
                                        <ForecastRow temp={"19"} month={"30 June"} date={"Friday"} icon={forecast.list[0].weather[0].icon}/>
                                        <ForecastRow temp={"17"} month={"01 July"} date={"Saturday"} icon={forecast.list[0].weather[0].icon}/>
                                    </>
                                }


                            </Box>

                            <Box className={"today"} >
                                <h1 className="sub-title">
                                  Today Forecast
                                </h1>
                                {forecast &&
                                    <>
                                        <ForecastRow temp={forecast.list[0].main.temp.toFixed()} month={getTimeFromDateTime(forecast.list[0].dt_txt)} date={capitalizeFirstLetter(forecast.list[0].weather[0].description)} icon={forecast.list[0].weather[0].icon}/>
                                        <ForecastRow temp={forecast.list[1].main.temp.toFixed()} month={getTimeFromDateTime(forecast.list[1].dt_txt)} date={capitalizeFirstLetter(forecast.list[1].weather[0].description)} icon={forecast.list[1].weather[0].icon}/>
                                        <ForecastRow temp={forecast.list[2].main.temp.toFixed()} month={getTimeFromDateTime(forecast.list[2].dt_txt)} date={capitalizeFirstLetter(forecast.list[2].weather[0].description)} icon={forecast.list[2].weather[0].icon}/>
                                        <ForecastRow temp={forecast.list[3].main.temp.toFixed()} month={getTimeFromDateTime(forecast.list[3].dt_txt)} date={capitalizeFirstLetter(forecast.list[3].weather[0].description)} icon={forecast.list[3].weather[0].icon}/>
                                        <ForecastRow temp={forecast.list[4].main.temp.toFixed()} month={getTimeFromDateTime(forecast.list[4].dt_txt)} date={capitalizeFirstLetter(forecast.list[4].weather[0].description)} icon={forecast.list[4].weather[0].icon}/>
                                    </>
                                    }

                            </Box>

                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default Model;


// https://openweathermap.org/forecast5 -- forecast link