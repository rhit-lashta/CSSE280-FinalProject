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
  let [newImage, setNewImage] = useState(null);
  let [newDescription, setNewDescription] = useState(description);

  let [sold, setSold] = useState(null);
  let [sellValue, setValue] = useState(-1);
  let [sellCustomValue, setCustomValue] = useState(0);

  let [deleted, setDelete] = useState(false);

  useEffect(() => {
    setLink("/listings/itemPage/" + user + "/" + item);
  })

  async function handleSubmit(event) {
    event.preventDefault(); 
    await updateItem(currentItem, newItem, newPrice, newType, newImage, newTags, newDescription)
    setCurrentItem(newItem)
    setCurrentType(newType)
    setCurrentPrice(newPrice)
    setCurrentTags(newTags)
    if (newImage != null) {
      setCurrentImage("/images/" + newImage.name)
    }
    setCurrentDescription(newDescription)
    setLink("/listings/itemPage/" + user + "/" + newItem)
    setNewImage(null)
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
    setNewImage(null)
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

  let handleTagChange = (e) => {
    let { value} = e.target;
    if (value == "") {
      return;
    }
    for (let i = 0; i < newTags.length; i++) {
      if (newTags[i] == value) {
        return;
      }
    }
    setNewTags([...newTags, value]);
  };

  let deleteTag = (e) => {
    let { value} = e.target;
    let newArray = [];
    for (let i = 0; i < newTags.length; i++) {
      if (newTags[i] != value) {
        newArray.push(newTags[i]);
      }
    }
    setNewTags(newArray);
  };

  let handleImageChange = (e) => {
    setNewImage(e.target.files[0])
  };


  let handleDescriptionChange = (e) => {
    let {value} = e.target;
    setNewDescription(value);
  };

  async function handleRemove(e) {
    e.preventDefault(); 
    
    await removeItem(currentItem, sellValue);
    setDelete(true);
    
  }

  let handleOptionChange = (e) => {
    setSold(e.target.value);
    if (sold == "notSold") {
      setCustomValue(0);
      setValue(-1);
    }
  }

  let handleValueChange = (e) => {
    setValue(e.target.value);
  }

  let handleCustomValueChange = (e) => {
    setCustomValue(e.target.value);
    setValue(e.target.value);
  }
    
    return (
      <div>
        {!deleted && (<div>
      <div class = "profileBox">
        
        {!inEditMode && !inRemoveMode && (
          <div>
            <div><img src={currentImage} alt = {currentImage} class = "itemImage" style={{ width: '500px', margin: '10px', float: "right"}}/></div>
            <h2><Link to={link}>{currentItem}</Link></h2>
            <div>Listed Price: {currentPrice}</div>
            <div>Types: {currentType}</div>
            <div>
            Tags: 
            <p>
            {(currentTags).map((tag) => (
                <span class="displayTag">{tag}</span>
            ))}
            </p>
            </div>
            <strong> Description: {currentDescription}</strong>
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
                <input type="number" id="price" name="price" value={newPrice} onChange={handlePriceChange} min="0" required></input>  
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
                <select id="tagSelector" name="tag" className="tagSelector" value={allTags} onChange={handleTagChange}>
                  <option value="">--Select a Tag--</option>
                  {allTags.map((tagOption) => (
                    <option key={tagOption} value={tagOption}>
                      {tagOption}
                    </option>
                  ))}
                </select>
              </div>

              <p className="selected-tags">
              {newTags.length > 0 ? (
                newTags.map((tag) => (
                  <button type="button" className="buttonTag" onClick={deleteTag} value={tag}> {tag} </button>
                ))
              ) : (
                <p className="no-tags">No tags selected</p>
              )}
              </p>
              
              <div>
                <label htmlFor="image"> Image: </label>
                <input name="image" id="image" type="file" accept="image/png, image/jpeg, image/jpg" class="uploadFile" onChange={handleImageChange}></input>
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
              <input type="radio" id="sold" name="sellState" value="sold" checked={sold === "sold"} onChange={handleOptionChange} required></input>
              <label for="sold">Sold</label><br></br>

              <input type="radio" id="notSold" name="sellState" value="notSold" checked={sold === "notSold"} onChange={handleOptionChange}></input>
              <label for="notSold">Not Sold</label><br></br>

              {sold == "sold" && (
                <div>
                  <input type="radio" id="listed" name="sellValue" value={currentPrice} checked={sellValue == currentPrice} onChange={handleValueChange} required></input>
                <label for="listed">Listed Price</label><br></br>

                <input type="radio" id="custom" name="sellValue" value={sellCustomValue} checked={sellValue == sellCustomValue} onChange= {handleCustomValueChange}></input>
                <label for="custom">Custom Price</label><br></br>
                {sellValue == sellCustomValue && (
                    <input type="number" id="customValue" name="price" value={sellCustomValue} onChange={handleCustomValueChange} required></input>  
                )}
                </div>
              )}

              <button type="submit">Remove Item</button>
              <button onClick={toggleRemoveMode}>Cancel</button>
            </form>
          </div>
          )
        }
        
      </div>
      </div>)}
      </div>
      
    );
};
  
  export default OwnedItem;