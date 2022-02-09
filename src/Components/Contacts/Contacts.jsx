import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Contacts = () => {
    const map = require('./map.png');
    return (
        <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > :not(style)': {
          m: 5,
          maxWidth: '90%',
          height: 'auto',
          padding: 8,
          
        },
      }}
    >
      <Paper sx={{display: 'flex', alignItems: 'center'}}>
          <div>
          <img src={map} style={{width: '25em', marginRight: '2em'}} alt='map'/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography variant='h4' sx={{textAlign: 'center'}}>Contact Us</Typography>
          <br />
          <BusinessIcon/>
          <Typography variant='subtitle1' mt={2} sx={{textAlign: 'center'}}>
          2025 Benjamin Franklin Pkwy, Philadelphia, PA 19130, USA         
          </Typography>
          <br />
          <PhoneIcon/>
          <Typography variant='subtitle1' mt={2} sx={{textAlign: 'center'}}>
          215-320-2985  
          </Typography>
          <br />
          <EmailIcon/>
          <Typography variant='subtitle1' mt={2} sx={{textAlign: 'center'}}>
            store@artgallery.com
          </Typography>
          </div>
            
      </Paper>
      
    </Box>
    );
};

export default Contacts;