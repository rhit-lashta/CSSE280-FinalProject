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
    photo: "",
    tags: [],
    description: "",
  });

  let handleFormChange = (e) => {
    let { name, value, files, type } = e.target;

    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } 
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  let handleTagChange = (e) => {
    let selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setFormData(prevData => ({
      ...prevData,
      tags: selectedOptions
    }));
  };


  function handleSubmit(event) {
    event.preventDefault(); 
    createNewItem(formData.itemName, formData.price, formData.type, formData.photo, formData.tags, formData.description)
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
            <select id="tagSelector" name="tag" className="tagSelector" onChange={handleTagChange}>
              <option value="">--Select a Tag--</option>
              {tagArray.map((tagOption) => (
                <option key={tagOption} value={tagOption}>
                  {tagOption}
                </option>
              ))}
            </select>

            <div className="selected-tags">
              {formData.tags.length > 0 ? (
                formData.tags.map((tag) => (
                  <button className="tags" onClick> {tag} - </button>
                ))
              ) : (
                <p className="no-tags">No tags selected</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="image"> Image: </label>
            <input name="image" id="image" type="file" accept="image/png, image/jpeg, image/jpg" class="uploadFile" required></input>
          </div>

          {formData.photo && (<div> <img src={URL.createObjectURL(formData.photo)} alt="preview"></img> </div>)}

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