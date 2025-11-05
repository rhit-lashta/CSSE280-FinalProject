import './Login.css'
import React, { useEffect } from "react";
import { displayTopLevel } from "./scriptMain"; 

function Listings() {

  //<> is a React Fragment that doesn't include extra DOM elements
  useEffect(() => {
    displayTopLevel()
  }, []);

  // Use Effects once at the start
  useEffect(() => {
    
  }, []);
  

  return (
    <> 
      <main>

      <h1>Listings</h1>

      <div>
        <p> Database Top Level: </p>
        <div id="topLevel"></div>
      </div>

      </main>
    </>
  )
}

export default Listings