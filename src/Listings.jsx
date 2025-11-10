import './Login.css'
import React, { useEffect, useState,} from "react";
import { loadItems, loadTypes, loadTags } from "./scriptMain";
import Item from './Item.jsx';

function Listings() {

  //<> is a React Fragment that doesn't include extra DOM elements

  let [typeArray, setTypeArray] = useState([]);
  let [tagArray, setTagArray] = useState([]);
  let [itemArray, setItemArray] = useState([]);

  let orderValuesArray = ["Price"]; 
  let orderArray = [["Low to High", 1], ["High to Low", -1]]; 

  useEffect(() => {

    let fetchTypes = async () => {
      try {
        let typesData = await loadTypes();
  
        let types = [];
        for (let i = 0; i < typesData.length; i++) {
          types.push(typesData[i][0]);
        }
        setTypeArray(types);
        //setError(null);
      } catch (error) {
        //setError(err.message);
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
      } catch (err) {
        setTagArray([]);
      }

    };

    let fetchItems = async () => {
      try {
        let itemData = await loadItems("", "", 0, [], 0);
        setItemArray(itemData)
      } catch (error) {
        setItemArray([]);
      }
    };
  
    fetchTypes();
    fetchTags();
    fetchItems();

  }, []);


  let [currentType, setTypeData] = useState("");
  let [orderValue, setOrderValueData] = useState("");
  let [order, setOrderData] = useState(0);
  let [tags, setTagData] = useState([]);
  let [tagRequirement, setTagRequirementData] = useState(0);

  let handleType = (e) => {
    let {value} = e.target;
    setTypeData(value)
  };

  let handleOrderValue = (e) => {
    let {value} = e.target;
    setOrderValueData(value)
    if (value == "") {
      setOrderData(0)
    }
  };

  let handleOrder = (e) => {
    let {value} = e.target;
    setOrderData(value)
  };

  let handleTags = (e) => {
    let {value} = e.target;
    setTagData([value])

    if (tags.length > 0) {
      setTagRequirementData(1)
    }
    else {
      setTagRequirementData(0)
    }
    
  };

  let handleTagRequirement = (e) => {
    let {value} = e.target;
    setTagRequirementData(value)
  };

  async function handleSubmit(event) {
    event.preventDefault(); 
    try {
      let itemData = await loadItems(currentType, orderValue, order, tags, tagRequirement);
      setItemArray(itemData)
    } catch (error) {
      print(error)
    }
  }

  

  return (
    <> 
      <main>

      <h1>Listings</h1>

      <form onSubmit={handleSubmit}>
      <div>
            <label for="typeSelector"> Type: </label>
            <select id="typeSelector" name="type" className="typeSelector" value={currentType} onChange={handleType}>
              <option value=""> None </option>
                {typeArray.map((typeOption) => (
                  <option key={typeOption} value={typeOption}>
                    {typeOption}
                  </option>
            ))}
          </select>
      </div>

      <div>
        <label for="tagSelector"> Tags: </label>
        <select id="tagSelector" name="tag" className="tagSelector" value={tags} onChange={handleTags}>
          <option value="">--Select a Tag--</option>
            {tagArray.map((tagOption) => (
              <option key={tagOption} value={tagOption}>
                {tagOption}
              </option>
            ))}
          </select>
      </div>

      {tags.length > 0 && (
          <div>
            <label for="requirementSelector"> Required Tag Elements: </label>
            <input type="number" id="requirementSelector" name="requirements" className="requirements" value={tagRequirement} min="0" max={tags.length} onChange={handleTagRequirement}></input>

          </div>
          )
        }

      <div>
        <label for="orderValueSelector"> Sort By: </label>
        <select id="orderValueSelector" name="orderValueSelector" className="orderValueSelector" value={orderValue} onChange={handleOrderValue}>
          <option value="">--Select the Order--</option>
            {orderValuesArray.map((orderValueOption) => (
              <option key={orderValueOption} value={orderValueOption}>
                {orderValueOption}
              </option>
            ))}
          </select>
      </div>

      {orderValue != "" && (
          <div>
            <label for="orderSelector"> Order: </label>
            <select id="orderSelector" name="orderSelector" className="orderSelector" value={order} onChange={handleOrder}>
              <option value={0} >--Select a Order--</option>
                {orderArray.map((option) => (
                  <option key={option[1]} value={option[1]}>
                    {option[0]}
                  </option>
                ))}
            </select>
            </div>
          )
        }

        <button type="submit">Search With These Options</button>

      </form>

      {itemArray.map((item) => (
            <div>

              <Item item={item[0]} price={item[1]["price"]} tags={item[1]["tag"]} image={item[1]["image"]} description={item[1]["description"]} user={item[2]}/>
             
            </div>
        ))}


        

      </main>
    </>
  )
}

export default Listings