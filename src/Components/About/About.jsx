import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import './About.css'
import Logo from './logo.png'

const About = () => {
    return (
        <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 5,
          maxWidth: '90%',
          height: 'auto',
          padding: 8,
        },
      }}
    >
      <Paper sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <img src={Logo} className='rot' alt='vinyl'/>
          <Typography variant='h4' mt={7} sx={{textAlign: 'center'}}>About Art Gallery</Typography>
          <Typography variant='h6' mt={2} sx={{textAlign: 'center', fontStyle: 'italic'}} color= 'text.secondary'>
            At Art Gallery you can buy stunning original art by some the World’s most talented artists. We sell artwork by established "names" as well as the cream of the crop of emerging talent.
             </Typography>
        
             <Typography variant='subtitle1' sx={{my: 3, textAlign: 'center'}}> 
             Making Art Accessible to the Masses
            </Typography>
            <Typography variant='body2' sx={{textAlign: 'center'}}> 
            Since it's inception back in 2007, ArtGallery.co.uk has endeavoured to help foster and build a lively online arts scene, taking on over 4000 artists, enabling them to sell their artworks across the world. Not only this, we've worked tirelessly to build our range of affordable artworks, to enable more people to enjoy the wonders of art.
          </Typography>
          <Typography variant='subtitle1' sx={{my: 3, textAlign: 'center'}}> 
            Nurturing a Lively Art Scene and Fostering New Talent
            </Typography>
            <Typography variant='body2' sx={{textAlign: 'center'}}> 
            Not only do we choose to work with established, successful artists, but we also proactively research, young upcoming talent.
          </Typography>

          <Typography variant='subtitle1' sx={{my: 3, textAlign: 'center'}}> 
          Artist you can trust, with realistic prices
            </Typography>
            <Typography variant='body2' sx={{textAlign: 'center'}}> 
            We have an individual relationship with all our artists, and we choose them based on their reputation and professionalism 
All our art is realistically priced to sell. Most of our customers just want to buy their art and go. They don't want to haggle, so we have fixed prices.
          </Typography>
      </Paper>
      
    </Box>
    );
};

export default About;


