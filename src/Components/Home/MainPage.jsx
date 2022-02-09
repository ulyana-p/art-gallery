import React from 'react';
import './Mainpage.css'
import cover from '../Home/cover.png'


const MainPage = () => {
return(   
    <div className = "main">
            <div className = "left">
                <h1 className='main-title'>Buy Affordable Original Art</h1>
                <h4 className='main-text'>At Art Gallery, we’re excited to offer original art from talented artists. If you’re looking to buy affordable art online from inspirational independent artists, we can help you find an artwork you’ll love at a price you can afford.</h4>
            </div>    
            <div className = "right"> 
                <img id='img-cover' src={cover}></img>
            </div>
    </div>
    );
        
};

export default MainPage;