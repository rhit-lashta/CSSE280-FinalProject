import './Login.css'
import React, { useEffect, useState} from "react";
import { loadTypes, loadTags, loadProfileInfo, loadTargetUserItems} from "./scriptMain";
import OwnedItem from './OwnedItem.jsx';
import { useLocation } from 'react-router-dom';

function YourListings() {

  let [typeArray, setTypeArray] = useState([]);
  let [tagArray, setTagArray] = useState([]);
  let [userData, setUser] = useState([]);
  let [items, setItem] = useState([]);

  let [profileFound, setFound] = useState(null);

  let location = useLocation();
  let urlPeices = location.pathname.split("/");

  let targetUser = "";
  if (urlPeices.length == 3) {
    console.log(urlPeices[2])
    targetUser = urlPeices[2];
  }

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
    let fetchUser = async () => {
      try {
        let profileData = await loadProfileInfo(targetUser);
        if (profileData.length == 3) {
          setUser(profileData)
          setFound(true)
          fetchItem();
        }
        else {
          setFound(false)
        }
      } catch (error) {
        console.log(error)
        setUser([])
      }
    };
  
    
    let fetchItem = async () => {
      try {
        let itemData = await loadTargetUserItems(targetUser);
        setItem(itemData)
        
      } catch (error) {
        console.log(error)
        setItem([]);
      }
    };
  
    fetchTypes();
    fetchTags();
    fetchUser();
  }, []);
  

  return (
    <> 
      <main>

        {profileFound == true && (
        <div>  
        
        <h1>{userData[0]} Listings</h1>

        {items.map((item) => (
            <div>
              <OwnedItem item={item[0]} type={item[1]["type"]} price={item[1]["price"]} tags={item[1]["tags"]} image={item[1]["image"]} description={item[1]["description"]} user={userData[0]} isOwner={userData[2]} allTypes={typeArray} allTags={tagArray}/>
             
            </div>
        ))}


        


        </div>
        )}

        {profileFound == false && (
            <h1>The user <i>{targetUser}</i> could not be found</h1>
        )}
      
      </main>
    </>
  )
}

export default YourListings