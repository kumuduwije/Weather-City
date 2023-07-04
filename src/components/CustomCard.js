import './CustomCard.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import axios from "axios";
import InputBox from "./InputBox";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ModalComponent from "./Modal"



function CustomCard() {
     // const [weatherData, setWeatherData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [modelOpen, setModelOpen] = useState(false);

    const [selectedCard, setSelectedCard] = React.useState(null);
    const[forecastData,setForecastData] = React.useState(null)

    // state handle for weather data cards. Retrieve and load if their any locally saved data.
    const [weatherData, setWeatherData] = useState(() => {
        const storedData = localStorage.getItem("WEATHER-DATA");
        return JSON.parse(storedData) || [];
    });

    useEffect(() => {
        const fetchData = setTimeout(() => {
            const storedData = localStorage.getItem('WEATHER-DATA');
            setWeatherData(JSON.parse(storedData) || []);
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(fetchData);
    }, []);


    // search location state
    const [location, setLocation] = useState("");


    // store data locally
    useEffect(() =>{
            window.localStorage.setItem("WEATHER-DATA", JSON.stringify(weatherData))
    },[weatherData])

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=435d554fc7367b62ae141d9d2070d100`;

    const searchLocation = (event) => {
        if (event.key === "Enter") {
            if(location && !isLocationAlreadyAdded(location)){
                axios
                    .get(url)
                    .then((response) => {
                        const fetchedData = response.data;
                        console.log(response.data)
                        const currentTime = formatDate(fetchedData.timezone);

                        fetchedData.currentTime = currentTime;

                        setWeatherData((prevWeatherData) => [...prevWeatherData, fetchedData]);

                        setLocation("");
                    })
                    .catch((error) => {
                        console.log("Error fetching weather data:", error);
                    });
            }else{
                console.log(`${location} is already added`)
            }

        }
    };




    const searchLocationBtn = () =>{

        if(location && !isLocationAlreadyAdded(location)){
            axios
                .get(url)
                .then((response) => {
                    const fetchedData = response.data;
                    fetchedData.currentTime = formatDate(fetchedData.timezone);
                    setWeatherData((prevWeatherData) => [...prevWeatherData, fetchedData]);

                    setLocation("");
                })
                .catch((error) => {
                    console.log("Error fetching weather data:", error);
                });
        }else{

            console.log(`${location} is already added`)

        }

        console.log("button clicked")
    }

    const isLocationAlreadyAdded = (location) => {
        // Check if the location already exists in weatherData
        return weatherData.some((data) => data.name.toLowerCase() === location.toLowerCase());
    };

    const handleDeleteCard = (cardId) => {
        setWeatherData((prevCards) => prevCards.filter((card) => card.id !== cardId));
    };

    useEffect(() => {
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, );

    const formatDate = (timezone) => {
        const timeZoneOffset = timezone;
        const currentDate = new Date();
        const options = {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
        };
        const currentTime = new Date(
            currentDate.getTime() + timeZoneOffset * 1000 - 19800 * 1000
        );
        const formattedTime = currentTime.toLocaleString("en-US", options);

        return formattedTime;
    };

    const updateTime = () => {
        setWeatherData((prevWeatherData) =>
            prevWeatherData.map((card) => ({
                ...card,
                currentTime: formatDate(card.timezone),
            }))
        );
    };

    const sunriseStatus = (sunrise, timezone) => {
        const sunriseTime = new Date((sunrise + timezone - 19800) * 1000);
        const options = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };

        return sunriseTime.toLocaleTimeString("en-US", options);
    };

    const sunsetStatus = (sunrise, timezone) => {
        const sunriseTime = new Date((sunrise + timezone - 19800) * 1000);
        const options = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };

        return sunriseTime.toLocaleTimeString("en-US", options);
    };

    // Forecast Information
    // const [lat,setLat] = useState("")
    // const [lon,setLon] = useState("")

    // const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=435d554fc7367b62ae141d9d2070d100`

    // const getForecastInfo = () =>{
    //     axios.get(forecastURL)
    //         .then((response) =>{
    //             const fetchedForecastData = response.data;
    //             console.log( fetchedForecastData)
    //         }).catch((error) =>{
    //         console.log("Error fetching forecast data:", error);
    //     })
    // }

    const dataObject = (name, lon,lat) =>{
       const obj = {
           name:name,
           lon:lon,
           lat:lat
       }
        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${obj.lat}&lon=${obj.lon}&units=metric&appid=435d554fc7367b62ae141d9d2070d100`

        axios.get(forecastURL)
            .then((response) =>{
                const fetchedForecastData = response.data;
                setForecastData(fetchedForecastData)
                console.log( fetchedForecastData)
            }).catch((error) =>{
            console.log("Error fetching forecast data:", error);
        })

       console.log(obj)
        setSelectedCard(obj)
    }



    return (

        <div>
            <InputBox
                location={location}
                setLocation={setLocation}
                searchLocation={searchLocation}
                searchLocationBtn = {searchLocationBtn}

            />
            {location && isLocationAlreadyAdded(location) ? (
                    <div className="already-alert">
                        <Alert  severity="info">{<b>{location.charAt(0).toUpperCase()+ location.slice(1)}</b>} is already added.</Alert>
                    </div>
            ) : null}

            <section>


                {isLoading ? (

                    <CircularProgress className ={"centered-circular"} color="inherit" />

                ) : (
                    <>
                        {weatherData.length === 0 && (

                            <div className="centered-container">
                                {/*Add Title if there are no cards*/}
                                <p className="centered-text">You haven't added any city yet. Add cities!</p>
                            </div>
                        )}
                        {/* Render the rest of your component */}



                        <div className={"container"} >
                            <div className={"cards"}>
                                {weatherData.map((card, index) => (

                                    <div key={index} className="main-card" >
                                        <div className={"middle-visible-section"}>


                                            <Button  onClick={() => {setModelOpen(true);dataObject(card.name,card.coord.lon,card.coord.lat)}}  variant="outlined" sx={{
                                                '&:hover': {
                                                    backgroundColor: '#8d1f4f',
                                                    border: '1px solid',
                                                    borderColor: (theme) => '#8d1f4f',
                                                    color: (theme) => 'azure',
                                                },

                                                borderColor:'#8d1f4f',
                                                color: 'lightgray',
                                                border: '2px solid lightgray',
                                                textTransform:'uppercase'
                                            }

                                            }>{card.name} ForeCast Info</Button>

                                            <ModalComponent  open={modelOpen} setOpen={setModelOpen}  weatherData={weatherData} cardObj={selectedCard} forecast={forecastData} />
                                            {/*{console.log(selectedCardId)}*/}
                                        </div>

                                        <div className="card-close-btn">
                                            {/*<CloseIcon/>*/}
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                // style={{color: "#fffff"}}
                                                size={"md"}
                                                className = "close-btn"
                                                onClick={() => handleDeleteCard(card.id)}
                                            />
                                        </div>

                                        <div className="card-top">

                                            <div className="top-left column">
                                                <h3>{card.name + ", " + card.sys.country}</h3>
                                                <p className={"time-para"}>{card.currentTime}</p>
                                                <span className={"current-status"}>
                                              {/*<FontAwesomeIcon*/}
                                                    {/*    icon={faCloud}*/}
                                                    {/*    style={{color: "#fffff"}}*/}
                                                    {/*    size={"lg"}*/}
                                                    {/*/>*/}

                                                    {card.weather && <img src={`https://openweathermap.org/img/wn/${card.weather[0].icon}.png`} alt=""/>}
                                                    {card.weather && <p>{card.weather[0].description}</p>}
                                       </span>
                                            </div>
                                            <div className={"top-right column"}>
                                                {card.main && (
                                                    <h3 className={"temp"}>{card.main.temp.toFixed() + "°C"}</h3>
                                                )}
                                                <div className={"min-max"}>
                                                    {card.main && (
                                                        <p>{"Temp Min: " + card.main.temp_min.toFixed() + "°C"}</p>
                                                    )}
                                                    {card.main && (
                                                        <p>{"Temp Max: " + card.main.temp_max.toFixed() + "°C"}</p>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                        <div className={"card-bottom"}>
                                            <div className="vertical-line"></div>
                                            <div className={"card-bottom-left"}>
                                                <div className={"conditions"}>
                                                    <span className={"condition-label"}>Pressure: </span>
                                                    {card.main && <span>{card.main.pressure}hPa</span>}
                                                </div>
                                                <div className={"conditions"}>
                                                    <span className={"condition-label"}>Humidity: </span>
                                                    {card.main && <span>{card.main.humidity}%</span>}
                                                </div>
                                                <div className={"conditions"}>
                                                    <span className={"condition-label"}>Visibility: </span>
                                                    {card.visibility && (
                                                        <span>{card.visibility / 1000}km</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={"card-bottom-middle"}>
                                                <FontAwesomeIcon
                                                    className={"rocket-icon"}
                                                    icon={faPaperPlane}
                                                    style={{color: "#fffff"}}
                                                    size={"2x"}
                                                />
                                                <p>4.0m/s 120 Degree</p>
                                            </div>
                                            <div className="vertical-line-two"></div>
                                            <div className={"card-bottom-right"}>
                                                <div className={"conditions"}>
                                                    <span className={"condition-label"}>Sunrise: </span>
                                                    {card.sys && (
                                                        <span>
                                                 {sunriseStatus(card.sys.sunrise, card.timezone)}
                                                </span>
                                                    )}
                                                </div>
                                                <div className={"conditions"}>
                                                    <span className={"condition-label"}>Sunset : </span>
                                                    {card.sys && (
                                                        <span>
                                                  {sunsetStatus(card.sys.sunset, card.timezone)}
                                                </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                ))}

                            </div>
                        </div>
                    </>
                )}


            </section>

        </div>


    );
}

//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
export default CustomCard;



