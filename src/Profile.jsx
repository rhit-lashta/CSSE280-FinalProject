import './Login.css'
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { loadUserInfo, loadProfileInfo } from "./scriptMain";
//import { displayTopLevel, displayTypes, displayTags } from "./loginScript"; 

function Profile() {


  let [userName, setName] = useState("");
  let [userInfo, setInfo] = useState({});
  let [isOwner, setOwner] = useState(false);

  // [name, profileInfo{}, SameUser(bool)]
  //<> is a React Fragment that doesn't include extra DOM elements

  // Use Effects once at the start
  useEffect(() => {
    let fetchProfile = async () => {
      try {
        let profileData = await loadProfileInfo("");
        console.log(profileData[0])
        console.log(profileData[2])
        console.log(profileData[1])
        setName(profileData[0])
        setInfo(profileData[1])
        setOwner(profileData[2])
      } catch (error) {
        setProfileArray([]);
      }
    };

    fetchProfile();
  }, []);

  // Safely extract the object from the array; default to an empty object so
  // property access won't throw while the fetch is in-flight.
  let userInformation = userName || {};
  console.log("User Information:", userInformation);

  return (
    <> 
      <main>
        <h1>Profile</h1>
        <div class = "profileBox">
          <div class = "profileHeader">
            <img className="profileImage" src={userInformation.profileImage || "/images/testImage.jpg"} alt="Profile"/>
            <div>
              <h3>{userName || "Not provided"}</h3>
              <Link to="/profile/yourListings">{userInformation.username || "Not provided"}'s Listings</Link>
            </div>
          </div>
          <h3>Contact Information</h3>
          <p>Email: {userInfo.email  || "Not provided"}</p>
          <p>Phone: {userInfo.phoneNumber || "Not provided"}</p>
          <p>Contact Description: {userInfo.contactDescription || "No contact description provided."}</p>
        </div>
      </main>
    </>
  )
}

export default Profile