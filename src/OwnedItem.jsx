import './Login.css'
import React, { useEffect, useState,} from "react";
import {Link } from 'react-router-dom'; 
import { updateItem, removeItem } from "./scriptMain";

function OwnedItem({item, type, price, tags, image, description, user, allTypes, allTags}) { 

  let [inEditMode, setEdit] = useState(false);
  let [inRemoveMode, setRemove] = useState(false);

  let [currentItem, setCurrentItem] = useState(item);
  let [currentType, setCurrentType] = useState(type);
  let [currentPrice, setCurrentPrice] = useState(price);
  let [currentTags, setCurrentTags] = useState(tags);
  let [currentImage, setCurrentImage] = useState(image);
  let [currentDescription, setCurrentDescription] = useState(description);

  let [link, setLink] = useState("/listings/itemPage/" + user + "/" + item);

  let [newItem, setNewItem] = useState(item);
  let [newType, setNewType] = useState(type);
  let [newPrice, setNewPrice] = useState(price);
  let [newTags, setNewTags] = useState(tags);
  let [newImage, setNewImage] = useState(image);
  let [newDescription, setNewDescription] = useState(description);

  function handleSubmit(event) {
    event.preventDefault(); 
    updateItem(currentItem, newItem, newPrice, newType, newImage, newTags, newDescription)
    setCurrentItem(newItem)
    setCurrentType(newType)
    setCurrentPrice(newPrice)
    setCurrentTags(newTags)
    setCurrentImage(newImage)
    setCurrentDescription(newDescription)
    setLink("/listings/itemPage/" + user + "/" + newItem)
    setEdit(false);
  }

  function enterEditMode() {
    setEdit(true);
  }

  function toggleRemoveMode() {
    setRemove(!inRemoveMode);
  }

  function exitEditMode() {
    setEdit(false);
    setNewItem(currentItem)
    setNewType(currentType)
    setNewPrice(currentPrice)
    setNewTags(currentTags)
    setNewImage(currentImage)
    setNewDescription(currentDescription)
  }

  let handleNameChange = (e) => {
    let {value} = e.target;
    setNewItem(value)
  };

  let handlePriceChange = (e) => {
    let {value} = e.target;
    setNewPrice(value)
  };

  let handleTypeChange = (e) => {
    let {value} = e.target;
    setNewType(value)
  };

  let handleTagsChange = (e) => {
    let {value} = e.target;
    setNewTags([value])
    
  };

  let handleImageChange = (e) => {
    let {value} = e.target;
    setNewImage(value)
  };

  let handleDescriptionChange = (e) => {
    let {value} = e.target;
    setNewDescription(value)
  };

  function handleRemove(event) {
    
  }
    
    return (
      <div id="itemBox">
        {!inEditMode && !inRemoveMode && (
          <div>
            <h1><Link to={link}>{currentItem}</Link></h1>
            <div>Listed Price: {currentPrice}</div>
            <div>Types: {currentType}</div>
            <div>
            Tags: 
            {tags && tags.map((tag, index) => (
            //    {tags[index]}
            <p></p>
            ))}
            Tags not Working
            </div>
            <strong> Description: {currentDescription}</strong>
            <img src={currentImage} alt = {currentImage} style={{ width: '200px', margin: '10px' }}/>
            <div>Sold By: {user}</div>
            <button onClick={enterEditMode}>Edit</button>
            <button onClick={toggleRemoveMode}>Remove</button>

          </div>
          )
        }

        {inEditMode && !inRemoveMode && (
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label for="itemName"> Item Name: </label>
                <input type="text" id="itemName" name="itemName" value={newItem} onChange={handleNameChange} required></input>
              </div>
            
              <div>
                <label for="price"> Price: </label>
                <input type="number" id="price" name="price" value={newPrice} onChange={handlePriceChange} required></input>  
              </div>

              <div>
                <label for="typeSelector"> Type: </label>
                <select id="typeSelector" name="type" className="typeSelector" value={newType} onChange={handleTypeChange} required>
                  {allTypes.map((typeOption) => (
                  <option key={typeOption} value={typeOption}>
                    {typeOption}
                  </option>
                ))}
                </select>
              </div>

              <div>
                <label for="tagSelector"> Tags: </label>
                <select id="tagSelector" name="tag" className="tagSelector" value={newTags} onChange={handleTagsChange}>
                  <option value="">--Select a Tag--</option>
                  {allTags.map((tagOption) => (
                    <option key={tagOption} value={tagOption}>
                      {tagOption}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="image"> Image: </label>
                <input name="image" id="image" type="file" accept="image/png, image/jpeg, image/jpg" class="uploadFile" required></input>
              </div>

              <div>
                <label for="description"> Description: </label>
              </div>
              <div>
                <textarea id="description" rows="10" cols="50" name="description" placeholder="Enter a Description" value={newDescription} onChange={handleDescriptionChange}></textarea>  
              </div>  

            
            <button type="submit">Save Changes</button>
            <button onClick={exitEditMode}>Discard Changes</button>
            
          </form>

          </div>
          )
        }

        {!inEditMode && inRemoveMode && (
          <div>
            <form onSubmit={handleRemove}>
              <h2>Why Remove?</h2>
              <button onClick={toggleRemoveMode}>Cancel</button>
            </form>

          </div>
          )
        }
        
      </div>
    );
};
  
  export default OwnedItem;