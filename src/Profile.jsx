import './Login.css'
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { loadUserInfo } from "./scriptMain";
//import { displayTopLevel, displayTypes, displayTags } from "./loginScript"; 

function Profile() {

  let [profileArray, setProfileArray] = useState([]);
  //<> is a React Fragment that doesn't include extra DOM elements

  // Use Effects once at the start
  useEffect(() => {
    let fetchProfile = async () => {
      try {
        let profileData = await loadUserInfo();
        setProfileArray(profileData)
      } catch (error) {
        setProfileArray([]);
      }
    };

    fetchProfile();
  }, []);

  // Safely extract the object from the array; default to an empty object so
  // property access won't throw while the fetch is in-flight.
  const userInformation = profileArray[0] || {};
  console.log("User Information:", userInformation);

  return (
    <> 
      <main>
        <h1>Profile</h1>
        <div class = "profileBox">
          <div class = "profileHeader">
            <img className="profileImage" src={userInformation.profileImage || "/images/testImage.jpg"} alt="Profile"/>
            <div>
              <h3>{userInformation.username || "Not provided"}</h3>
              <Link to="/profile/yourListings">{userInformation.username || "Not provided"}'s Listings</Link>
            </div>
          </div>
          <h3>Contact Information</h3>
          <p>Email: {userInformation.email || "Not provided"}</p>
          <p>Phone: {userInformation.phoneNumber || "Not provided"}</p>
          <p>Contact Description: {userInformation.description || "No contact description provided."}</p>
        </div>
      </main>
    </>
  )
}

export default Profile