// import './CustomPopUp.css';
//
// const Model = (prop) => {
//     return (
//         <div className={"main-popup"}>
//
//         </div>
//     )
// }
//
// export default Model;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

import React from 'react';
import { Modal, Box, Typography } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius:'5px',
    boxShadow: 24,
    p: 4,
};



const Model = ({ open, setOpen, weatherData, name, cardObj }) => {
    if (!open) return null;

    return (
        <div>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {cardObj.name}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
        </div>
    );
};

export default Model;


// https://openweathermap.org/forecast5 -- forecast link