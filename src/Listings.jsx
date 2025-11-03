import './Login.css'
import React, { useEffect } from "react";
//import { displayTopLevel, displayTypes, displayTags } from "./loginScript"; 

function Listings() {

  //<> is a React Fragment that doesn't include extra DOM elements

  // Use Effects once at the start
  useEffect(() => {
    
  }, []);
  

  return (
    <> 
      <main>

        <div class = "banner">Header</div> 

        <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select> 
      
      </main>
    </>
  )
}

export default Listings