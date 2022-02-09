import React, { useState, useEffect} from 'react';
import PopUpWindow from './PopUpWindow'

const PopUp = () => {
  const [timedPopup, setTimedPopup] = useState(false)
  
  useEffect(()=> {
    setTimeout(()=> {
      setTimedPopup(true)
    },3000)
  }, [])
  return (
    <div>
      <PopUpWindow trigger = {timedPopup} setTrigger={setTimedPopup}>
       
      </PopUpWindow>
       
    </div>
  );
};

export default PopUp;