import './Login.css'
import React, { useEffect, useState } from "react";
import { loadTypes, loadTags, createNewItem, checkNoSpecialOrSpaces} from "./scriptMain"; 

function AddListing() {
  
  let [typeArray, setTypeArray] = useState([]);
  let [tagArray, setTagArray] = useState([]);

  let [error, setError] = useState("");

  useEffect(() => {

    let fetchTypes = async () => {
      try {
        let typesData = await loadTypes();
        
        let types = [];
        for (let i = 0; i < typesData.length; i++) {
          types.push(typesData[i][0]);
        }
        setTypeArray(types);

      } catch (error) {
        console.log(error)
        setTypeArray([]);
      } 
    };

    let fetchTags = async () => {
      try {
        let tagsData = await loadTags();
        
        let tags = [];
        for (let i = 0; i < tagsData.length; i++) {
          tags.push(tagsData[i][0]);
        }
        setTagArray(tags);
      } catch (error) {
        console.log(error)
        setTagArray([]);
      } 
    };

    fetchTypes();
    fetchTags();
  }, []);

    

  let [formData, setFormData] = useState({
    itemName: "",
    price: 0,
    type: "", 
    description: "",
  });

  let [formImage, setImageData] = useState(null);
  let [tags, setTagsData] = useState([]);
  

  let handleFormChange = (e) => {
    let { name, value} = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    
  };

  let handleTagChange = (e) => {
    let { value} = e.target;
    if (value == "") {
      return;
    }
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] == value) {
        return;
      }
    }
    setTagsData([...tags, value]);
  };

  let deleteTag = (e) => {
    let { value} = e.target;
    let newArray = [];
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] != value) {
        newArray.push(tags[i]);
      }
    }
    setTagsData(newArray);
  };

  let handleImageChange = (e) => {
      setImageData(e.target.files[0]);
  };

  function handleSubmit(event) {
    event.preventDefault(); 
    if (checkNoSpecialOrSpaces(formData.itemName)) {
      setError("")
      createNewItem(formData.itemName, formData.price, formData.type, formImage, tags, formData.description)
    }
    else {
      setError("Item Name can only have numbers and letters with no spaces")
    }
  }

  return (
    <> 
      <main>
        <h1>Add Listing</h1>
        <div className="centerOptions">
        <form onSubmit={handleSubmit}>
          <div>
            <label for="itemName"> Item Name: </label>
            <input type="text" id="itemName" name="itemName" className="choice" value={formData.itemName} onChange={handleFormChange} required></input>
            <div class="error">{error}</div>
          </div>

          <div>
            <label for="price"> Price: </label>
            <input type="number" id="price" name="price" className="choiceSmall" value={formData.price} onChange={handleFormChange} min="0" required></input>  
          </div>

          <div>
            <label for="typeSelector"> Type: </label>
            <select id="typeSelector" name="type" className="choice" value={formData.type} onChange={handleFormChange} required>
              <option value="">--Select a Type--</option>
              {typeArray.map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {typeOption}
                </option>
              ))}
            </select>
          </div>

          <div>

            <select id="tagSelector" name="tag" className="choice" value={tags} onChange={handleTagChange}>
              <option value=""> Add Search Tags </option>
              {tagArray.map((tagOption) => (
                <option key={tagOption} value={tagOption}>
                  {tagOption}
                </option>
              ))}
            </select>

            <p className="selected-tags">
              {tags.length > 0 ? (
                <p>
                  Search Tags:
                {tags.map((tag) => (
                  <button type="button" className="buttonTag" onClick={deleteTag} value={tag}> {tag} </button>
                ))}
                </p>
              ) : (
                <p className="no-tags">No tags selected</p>
              )}
            </p>
          </div>

          <p>
            <label htmlFor="image"> Image: </label>
            <input name="image" id="image" type="file" className="choice" accept="image/png, image/jpeg, image/jpg" class="uploadFile" onChange={handleImageChange} required></input>
          </p>


          <div>
            <label for="description"> Description: </label>
          </div>
          <div>
            <textarea id="description" rows="10" cols="50" name="description" placeholder="Enter a Description" value={formData.description} onChange={handleFormChange}></textarea>  
          </div>          

          <button type="submit" className="choice" >Add Listing</button>
        </form>
        </div>
      </main>
    </>
  );
}

export default AddListing;