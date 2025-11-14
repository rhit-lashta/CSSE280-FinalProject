import './Login.css'
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { loadProfileInfo, updateProfile } from "./scriptMain";
//import { displayTopLevel, displayTypes, displayTags } from "./loginScript"; 

function Profile() {

  let [profileArray, setProfileArray] = useState([]);

  // Use Effects once at the start
  useEffect(() => {
    let fetchProfile = async () => {
      try {
        let profileData = await loadProfileInfo("");
        setProfileArray(profileData)
      } catch (err) {
        console.error(err);
        setProfileArray([]);
      }
    };

    fetchProfile();
  }, []);

  let userName = profileArray[0] || "";
  let userInformation = profileArray[1] || {};
  let isUser = profileArray[2] || false;

  let [inEditMode, setEdit] = useState(false);
  let [newEmail, setNewEmail] = useState("");
  let [newPhone, setNewPhone] = useState("");
  let [newDescription, setNewDescription] = useState("");
  let [newImage, setNewImage] = useState(null);
  // console.log("User Name:", userName);
  // console.log("User Information:", userInformation);
  // console.log("Is User:", isUser);

  function enterEditMode() {
    setNewEmail(userInformation.email || "");
    setNewPhone(userInformation.phoneNumber || "");
    setNewDescription(userInformation.description || "");
    setNewImage(null);
    setEdit(true);
  }

  function exitEditMode() {
    setEdit(false);
    setNewImage(null);
  }

  let handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  let handleEmailChange = (e) => setNewEmail(e.target.value);
  let handlePhoneChange = (e) => setNewPhone(e.target.value);
  let handleDescriptionChange = (e) => setNewDescription(e.target.value);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await updateProfile(newEmail, newPhone, newDescription, newImage);
      // refresh profile data
      let newProfileInfo = await loadProfileInfo("");
      setProfileArray(newProfileInfo || []);
    } catch (err) {
      console.error(err);
    }
    setEdit(false);
  }

  return (
    <> 
      <main>
        <h1>Profile</h1>
        <div class = "profileBox">
          <div class = "profileHeader">
            <img className="profileImage" src={userInformation.profileImage || "/images/testImage.jpg"} alt="Profile"/>
            <div>
              {!inEditMode && (
                <>
                  <h3>{userName || "Username not provided/found"}</h3>
                  <Link to="/profile/yourListings">{userName || "Placeholder"}'s Listings</Link>
                </>
              )}
              {inEditMode && (
                <>
                  <h3>{userName || "Username not provided/found"}</h3>
                </>
              )}
              {inEditMode && (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="email" value={newEmail} onChange={handleEmailChange} />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone:</label>
                    <input id="phone" name="phone" type="tel" value={newPhone} onChange={handlePhoneChange} />
                  </div>
                  <div>
                    <label htmlFor="profileImage">Profile Image:</label>
                    <input id="profileImage" name="profileImage" type="file" accept="image/*" onChange={handleImageChange} />
                  </div>
                  <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" rows="6" cols="40" value={newDescription} onChange={handleDescriptionChange} />
                  </div>
                  <div>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={exitEditMode}>Discard Changes</button>
                  </div>
                </form>
              )}
            </div>
          </div>
          {!inEditMode && (
            <>
              <h3>Contact Information</h3>
              <p>Email: {userInformation.email || "Email not provided/found"}</p>
              <p>Phone: {userInformation.phoneNumber || "Phone Number not provided/found"}</p>
              <p>Contact Description: {userInformation.description || "No contact description provided."}</p>
            </>
          )}
          {/* Move Edit Profile button to bottom of profile box */}
          {isUser && !inEditMode && (
            <div>
              <button onClick={enterEditMode}>Edit Profile</button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default Profile