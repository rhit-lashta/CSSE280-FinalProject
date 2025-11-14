import './Login.css'
import React, { useEffect, useState } from "react";
import { loadTypes, loadTags, createNewItem } from "./scriptMain"; 

function AddListing() {
  
  let [typeArray, setTypeArray] = useState([]);
  let [tagArray, setTagArray] = useState([]);

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
        setTypeArray([]);
      } finally {
        //setLoading(false);
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
        //setError(null);
      } catch (err) {
        //setError(err.message);
        setTagArray([]);
      } finally {
        //setLoading(false);
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
    createNewItem(formData.itemName, formData.price, formData.type, formImage, tags, formData.description)
  }

  return (
    <> 
      <main>
        <h1>Add Listing</h1>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label for="itemName"> Item Name: </label>
            <input type="text" id="itemName" name="itemName" value={formData.itemName} onChange={handleFormChange} required></input>
          </div>

          <div>
            <label for="price"> Price: </label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleFormChange} required></input>  
          </div>

          <div>
            <label for="typeSelector"> Type: </label>
            <select id="typeSelector" name="type" className="typeSelector" value={formData.type} onChange={handleFormChange} required>
              <option value="">--Select a Type--</option>
              {typeArray.map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {typeOption}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label for="tagSelector"> Tags: </label>
            <select id="tagSelector" name="tag" className="tagSelector" value={tags} onChange={handleTagChange}>
              <option value="">--Select a Tag--</option>
              {tagArray.map((tagOption) => (
                <option key={tagOption} value={tagOption}>
                  {tagOption}
                </option>
              ))}
            </select>

            <p className="selected-tags">
              {tags.length > 0 ? (
                tags.map((tag) => (

                  <button type="button" className="buttonTag" onClick={deleteTag} value={tag}> {tag} </button>
                ))
              ) : (
                <p className="no-tags">No tags selected</p>
              )}
            </p>
          </div>

          <div>
            <label htmlFor="image"> Image: </label>
            <input name="image" id="image" type="file" accept="image/png, image/jpeg, image/jpg" class="uploadFile" onChange={handleImageChange} required></input>
          </div>


          <div>
            <label for="description"> Description: </label>
          </div>
          <div>
            <textarea id="description" rows="10" cols="50" name="description" placeholder="Enter a Description" value={formData.description} onChange={handleFormChange}></textarea>  
          </div>          

          <button type="submit">Add Listing</button>
        </form>
      </main>
    </>
  );
}

export default AddListing;