import './Login.css'
import React, { useEffect, useState,} from "react";
import {Link } from 'react-router-dom';

function Item({item, price, tags, image, description, user}) { 

  let link = "/listings/itemPage/" + user + "/" + item;
    
    return (
      <div>
        <h1><Link to={link}>{item}</Link></h1>
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