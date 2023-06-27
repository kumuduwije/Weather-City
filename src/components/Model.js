import './Model.css'
import React from 'react';
import {Modal, Box, Fade, Backdrop} from '@mui/material';
import ForecastRow from './ForecastRow'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {  faXmark} from "@fortawesome/free-solid-svg-icons";




const Model = ({open, setOpen, weatherData, name, cardObj}) => {
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
                                <ForecastRow temp={"17"} month={"27 June"} date={"Tuesday"}/>
                                <ForecastRow temp={"22"} month={"28 June"} date={"Wednesday"}/>
                                <ForecastRow temp={"16"} month={"29 June"} date={"Thursday"}/>
                                <ForecastRow temp={"19"} month={"30 June"} date={"Friday"}/>
                                <ForecastRow temp={"17"} month={"01 July"} date={"Saturday"}/>

                            </Box>

                            <Box className={"today"} >
                                <h1 className="sub-title">
                                  Today Forecast
                                </h1>
                                <ForecastRow temp={"17"} month={"09.00 am"} date={"Moderate Rain"}/>
                                <ForecastRow temp={"22"} month={"12.00 pm"} date={"Moderate Rain"}/>
                                <ForecastRow temp={"16"} month={"15.00 pm"} date={"Moderate Rain"}/>
                                <ForecastRow temp={"19"} month={"18.00 pm"} date={"Moderate Rain"}/>
                                <ForecastRow temp={"17"} month={"21.00 pm"} date={"Moderate Rain"}/>

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