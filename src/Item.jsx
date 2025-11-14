import './Login.css'
import React, { useEffect} from "react";
import {Link } from 'react-router-dom';

function Item({item, type, price, tags, image, description, user}) { 

  let link = "/listings/itemPage/" + user + "/" + item;

  let userLink = "/profile/" + user;

  useEffect(() => {
    console.log(tags)
  })
    
    return (
      <div>
        <img src={image} alt = {image} class = "itemImage" style={{ width: '200px', margin: '10px', float: "right"}}/>
        <h2><Link to={link}>{item}</Link></h2>
        <div>Listed Price: {price}</div>
        <div>Type: {type}</div>
        <div>
        Tags: 
        <p>
        {tags.length > 0 && tags.map((tag) => (
          <span class="displayTag">{tag}</span>
        ))}
        </p>

        </div>
        <strong> Description: {description}</strong>
        <div>Sold By: <Link to={userLink}>{user}</Link></div>
      </div>
    );
};
  
  export default Item;