import React from 'react';
import './PopUp.css'
import Box from '@mui/material/Box';
import img from './img.png'


const PopUpWindow = (props) => {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <div class="heading">ENJOY ART WITH DISCOUNT</div>
                <p class = 'discount'>Take off 90% sitewide</p>
                <Box
        component="img"
        sx={{
          height: 250,
          width: 500,
          marginBottom: 0,
          marginLeft: 7,
          borderRadius: 10,
          
        }}
        alt="The house from the offer."
        src={img}
      />
                <button className='close-btn' onClick={()=> props.setTrigger(false)}>X</button>
                <span class="code">CODE:WINRER2022</span>
                {props.children}
            </div>
        </div>
    ): "";
};

export default PopUpWindow;