import './Login.css'
import React, { useEffect, useState,} from "react";

function Item({item, price, tags, image, description}) { 

  //let [name, setName] = useState();

  //setName(item[0])  
    
    return (
      <div>
        <h1>{item}</h1>
        <div>Listed Price: {price}</div>
        <strong> Description: {description}</strong>
        <img src={image} alt = {image} style={{ width: '200px', margin: '10px' }}/>
      </div>
    );
};
  
  export default Item;