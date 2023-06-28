import './Modal.css'
import React, {useEffect, useState} from 'react';
import { Modal, Box, Fade, Backdrop, Typography, Skeleton, Stack } from '@mui/material';
import ForecastRow from './ForecastRow'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {  faXmark} from "@fortawesome/free-solid-svg-icons";


const ModalComponent = ({open, setOpen, weatherData, name, cardObj, forecast}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentForecast, setCurrentForecast] = useState(null);

    useEffect(() => {
        setIsLoading(true); // Set loading to true every time the forecast prop changes

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [forecast]);

    useEffect(() => {
        if (!open) {
            setIsLoading(true); // Reset the loading state when modal is closed
        }
    }, [open]);

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

    function getCurrentMonthAndDate(str) {
        // Split the string by space to separate date and time
        const parts = str.split(" ");

        // Get the date part and split it by hyphen to separate year, month, and day
        const dateParts = parts[0].split("-");

        // Extract the day and month
        const day = dateParts[2];
        const month = new Date(Date.parse(parts[0])).toLocaleString('default', { month: 'long' });

        // Return the formatted month and date
        return `${day} ${month}`;
    }

    function getCurrentDay(str) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Get the date part from the string
        const datePart = str.split(' ')[0];

        // Create a Date object from the date part
        const dateObj = new Date(datePart);

        // Get the day of the week from the Date object
        const dayOfWeek = dateObj.getDay();

        // Return the day of the week
        return daysOfWeek[dayOfWeek];
    }

    if (!open) return null;

    return (


            <Modal

                open={open}
                onClose={() => {setOpen(false);}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{ backdrop: { timeout: 500 } }}

            >

                <Fade in={open}>

                    <Box  className="main-modal"  >
                            {/*<CloseIcon/>*/}
                            <FontAwesomeIcon
                                icon={faXmark}
                                size={"lg"}
                                className = "close-btn"
                                onClick={() => setOpen(false)}

                            />

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

                                        {isLoading ? (
                                            <>
                                                <Stack direction='column' spacing={4.5} sx={{padding:'20px'}}>
                                                    <Box my={1}>
                                                        <Skeleton variant="rectangular" width={330} height={30} animation='wave'/>
                                                    </Box>
                                                    <Box my={1}>
                                                        <Skeleton variant="rectangular" width={330} height={30} animation='wave' />
                                                    </Box>
                                                    <Box my={1}>
                                                        <Skeleton variant="rectangular" width={330} height={30} animation='wave'/>
                                                    </Box>
                                                    <Box my={1}>
                                                        <Skeleton variant="rectangular" width={330} height={30} animation='wave'/>
                                                    </Box>
                                                    <Box my={1}>
                                                        <Skeleton variant="rectangular" width={330} height={30} animation='wave'/>
                                                    </Box>
                                                </Stack>
                                            </>
                                        ) : (
                                            <>
                                                <ForecastRow temp={forecast.list[7].main.temp.toFixed()} month={getCurrentMonthAndDate(forecast.list[7].dt_txt)} date={getCurrentDay(forecast.list[7].dt_txt)} icon={forecast.list[7].weather[0].icon}/>
                                                {/* Rest of the ForecastRow components */}
                                                <ForecastRow temp={forecast.list[15].main.temp.toFixed()} month={getCurrentMonthAndDate(forecast.list[15].dt_txt)} date={getCurrentDay(forecast.list[15].dt_txt)} icon={forecast.list[15].weather[0].icon}/>
                                                <ForecastRow temp={forecast.list[25].main.temp.toFixed()} month={getCurrentMonthAndDate(forecast.list[25].dt_txt)} date={getCurrentDay(forecast.list[25].dt_txt)} icon={forecast.list[25].weather[0].icon}/>
                                                <ForecastRow temp={forecast.list[33].main.temp.toFixed()} month={getCurrentMonthAndDate(forecast.list[33].dt_txt)} date={getCurrentDay(forecast.list[33].dt_txt)} icon={forecast.list[33].weather[0].icon}/>
                                                <ForecastRow temp={forecast.list[39].main.temp.toFixed()} month={getCurrentMonthAndDate(forecast.list[39].dt_txt)} date={getCurrentDay(forecast.list[39].dt_txt)} icon={forecast.list[39].weather[0].icon}/>
                                            </>
                                        )}
                                    </>
                                }
                                {/*<Skeleton variant="rectangular" width={300} height={30} />*/}


                            </Box>

                            <Box className={"today"} >
                                <h1 className="sub-title">
                                  Today Forecast
                                </h1>
                                {forecast &&
                                    <>
                                        {isLoading ?
                                            (<>
                                                <Stack direction='column' spacing={4.5} sx={{padding:'20px'}}>
                                                    <Box my={1}>
                                                        <Skeleton variant="rectangular" width={330} height={30} animation='wave'/>
                                                    </Box>
                                                    <Box my={1}>
                                                        <Skeleton variant="rectangular" width={330} height={30} animation='wave' />
                                                    </Box>
                                                    <Box my={1}>
                                                        <Skeleton variant="rectangular" width={330} height={30} animation='wave'/>
                                                    </Box>
                                                    <Box my={1}>
                                                        <Skeleton variant="rectangular" width={330} height={30} animation='wave'/>
                                                    </Box>
                                                    <Box my={1}>
                                                        <Skeleton variant="rectangular" width={330} height={30} animation='wave'/>
                                                    </Box>
                                                </Stack>

                                            </>):

                                            (<>
                                                <ForecastRow temp={forecast.list[0].main.temp.toFixed()} month={getTimeFromDateTime(forecast.list[0].dt_txt)} date={capitalizeFirstLetter(forecast.list[0].weather[0].description)} icon={forecast.list[0].weather[0].icon}/>
                                                <ForecastRow temp={forecast.list[1].main.temp.toFixed()} month={getTimeFromDateTime(forecast.list[1].dt_txt)} date={capitalizeFirstLetter(forecast.list[1].weather[0].description)} icon={forecast.list[1].weather[0].icon}/>
                                                <ForecastRow temp={forecast.list[2].main.temp.toFixed()} month={getTimeFromDateTime(forecast.list[2].dt_txt)} date={capitalizeFirstLetter(forecast.list[2].weather[0].description)} icon={forecast.list[2].weather[0].icon}/>
                                                <ForecastRow temp={forecast.list[3].main.temp.toFixed()} month={getTimeFromDateTime(forecast.list[3].dt_txt)} date={capitalizeFirstLetter(forecast.list[3].weather[0].description)} icon={forecast.list[3].weather[0].icon}/>
                                                <ForecastRow temp={forecast.list[4].main.temp.toFixed()} month={getTimeFromDateTime(forecast.list[4].dt_txt)} date={capitalizeFirstLetter(forecast.list[4].weather[0].description)} icon={forecast.list[4].weather[0].icon}/>
                                            </>)}

                                    </>
                                    }

                            </Box>

                        </div>
                    </Box>
                </Fade>
            </Modal>
    );
};

export default ModalComponent;


// https://openweathermap.org/forecast5 -- forecast link

//Test API -> https://api.openweathermap.org/data/2.5/forecast?lat=6.9319&lon=79.8478&units=metric&appid=435d554fc7367b62ae141d9d2070d100