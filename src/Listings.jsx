import './Login.css'
import React, { useEffect, useState,} from "react";
import { loadItems, loadTypes } from "./scriptMain";
import Item from './Item.jsx';

function Listings() {

  //<> is a React Fragment that doesn't include extra DOM elements

  let [typeArray, setTypeArray] = useState([]);
  let [itemArray, setItemArray] = useState([]);

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
      } finally {
        //setLoading(false);
      }
    };

    let fetchItems = async () => {
      try {
        let itemData = await loadItems();
        setItemArray(itemData)
      } catch (error) {
        setItemArray([]);
      }
    };
  
    fetchTypes();
    fetchItems();

  }, []);


  let [currentType, setTypeData] = useState("");

  let handleTypeChange = (e) => {
    let {value} = e.target;
    setTypeData(value)
  };
  

  return (
    <> 
      <main>

      <h1>Listings</h1>

      <div>
        <p> Database Top Level: </p>
      </div>

      <div>
            <label for="typeSelector"> Type: </label>
            <select id="typeSelector" name="type" className="typeSelector" value={currentType} onChange={handleTypeChange} required>
              <option value="">--Select a Type--</option>
                {typeArray.map((typeOption) => (
                  <option key={typeOption} value={typeOption}>
                    {typeOption}
                  </option>
            ))}
          </select>
      </div>

      <div>
        <h1>Looping through the Fun component:</h1>
        {typeArray.map((item) => (
            <div key={item} value={item}>
              Item
            </div>
        ))}
      </div>

      {itemArray.map((item) => (
            <div key={item} value={item}>
              <Item item={item[0]} price={item[1]["price"]} image={item[1]["image"]} description={item[1]["description"]}/>
            </div>
        ))}


 

      </main>
    </>
  )
}

export default Listings