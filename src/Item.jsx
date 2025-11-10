import './Login.css'
import React, { useEffect, useState,} from "react";

function Item({item, price, tags, image, description, user}) { 

  //let [name, setName] = useState();

  //setName(item[0])  
    
    return (
      <div>
        <h1>{item}</h1>
        <div>Listed Price: {price}</div>
        <div>
        Tags: 
        {tags && tags.map((tag, index) => (
        //    {tags[index]}
        <p></p>
        ))}
        Tags not Working
        </div>
        <strong> Description: {description}</strong>
        <img src={image} alt = {image} style={{ width: '200px', margin: '10px' }}/>
        <div>Sold By: {user}</div>
      </div>
    );
};
  
  export default Item;