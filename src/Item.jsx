import './Login.css'
import {Link } from 'react-router-dom';

function Item({item, type, price, tags, image, description, user}) { 

  let link = "/listings/itemPage/" + user + "/" + item;

  let userLink = "/profile/" + user;
    
    return (
      <div>
        <img src={image} alt = {image} class = "itemImage" width = "500px" style={{float: "right"}}/>
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
        <p class="descriptionBox"><div><strong> Item Description </strong></div>{description}</p>
        <div>Sold By: <Link to={userLink} class="bigLink"><strong>{user}</strong></Link></div>
      </div>
    );
};
  
  export default Item;