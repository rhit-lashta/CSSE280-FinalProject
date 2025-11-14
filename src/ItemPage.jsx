import './Login.css'
import React, { useEffect, useState} from "react";
import { loadItem } from "./scriptMain";
import { useLocation, Link } from "react-router-dom";
//import { displayTopLevel, displayTypes, displayTags } from "./loginScript"; 

function ItemPage() {

  let location = useLocation();
  let urlPeices = location.pathname.split("/");
  let [userData, setUser] = useState({});
  let [itemData, setItem] = useState({"tags":[]});

  if (urlPeices.length != 5) {
    window.location.href = "/index.html#/listings";
  }
  let userLink = "/profile/" + urlPeices[3];

  useEffect(() => {

    let fetchItem = async () => {
      try {
        let itemData = await loadItem(urlPeices[3], urlPeices[4]);
        setUser(itemData[0])
        setItem(itemData[1])
        

      } catch (error) {
        console.log(error)
        setItem({});
      }
    };
  
    fetchItem();

    

  }, []);
  

  return (
    <div>
      <h1>{urlPeices[4]}</h1>
      <div>Listed Price: {itemData["price"]}</div>
      <div>Type: {itemData["type"]}</div>
      Tags: 
        <p>
        {(itemData["tags"]).map((tag) => (
          <span class="displayTag">{tag}</span>
        ))}
        </p>
      <p class="descriptionBox"><div><strong> Item Description </strong></div>{itemData["description"]}</p>
      <img src={itemData["image"]} alt = {itemData["image"]} class = "itemImage" style={{ width: '500px', margin: '10px', float: "right"}}/>
      <div>Sold By: <Link to={userLink} class="bigLink"><strong>{urlPeices[3]}</strong></Link></div>
      <div>Email: {userData["email"]}</div>
      <div>Phone Number: {userData["phoneNumber"]}</div>
      <div>How to get into Contact: {userData["description"]}</div>
    </div>

  );
}

export default ItemPage