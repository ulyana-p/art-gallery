import React from 'react';
import './Cover.css'
import artCover from '../Home/art-cover.png'
import { Button, ThemeProvider, createTheme  } from '@mui/material';
import { Link } from 'react-router-dom';

const customTheme = createTheme({
    palette: {
      success: {
        main: 'rgb(31, 96, 124)',
        contrastText: "#ffff"
      }
    }
  });

const Cover = () => {
return(   
    <ThemeProvider theme={customTheme}>
        <div className = "main-cover">
                    <img id='art-cover' src={artCover}></img>  
                    <div className='cover-content'>
                        <h1 className='title-cover'>Buy Affordable Original Art</h1>
                        <h4 className='text-cover'>At Art Gallery, we’re excited to offer original art from talented artists. If you’re looking to buy affordable art online from inspirational independent artists, we can help you find an artwork you’ll love at a price you can afford.</h4>
                        <Link to='/products' style={{ textDecoration: "none" }}>
                            <Button variant="contained" color="success" size="large">Shop now</Button>       
                        </Link>     
                    </div>       
        </div>
    </ThemeProvider>

    );
        
};

export default Cover;