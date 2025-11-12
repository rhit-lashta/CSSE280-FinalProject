import './Login.css'
import React, { useEffect, useState} from "react";
import { loadTypes, loadTags, loadProfileInfo, loadUserItems} from "./scriptMain";
import OwnedItem from './OwnedItem.jsx';

function YourListings() {

  let [typeArray, setTypeArray] = useState([]);
  let [tagArray, setTagArray] = useState([]);
  let [userData, setUser] = useState([]);
  let [items, setItem] = useState([]);

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
        setTagArray([]);
      }

    };
    let fetchUser = async () => {
      try {
        let profileData = await loadProfileInfo("");
        setUser(profileData)
      } catch (error) {
        setUser([])
      }
    };
  
    
    let fetchItem = async () => {
      try {
        let itemData = await loadUserItems();
        setItem(itemData)
      } catch (error) {
        setItem([]);
      }
    };
  
    fetchTypes();
    fetchTags();
    fetchUser();
    fetchItem();
  }, []);
  

  return (
    <> 
      <main>

        <h1>Your Listings</h1>

        {items.map((item) => (
            <div>

              <OwnedItem item={item[0]} type={item[1]["type"]} price={item[1]["price"]} tags={item[1]["tag"]} image={item[1]["image"]} description={item[1]["description"]} user={userData[0]} allTypes={typeArray} allTags={tagArray}/>
             
            </div>
        ))}
      
      </main>
    </>
  )
}

export default YourListings