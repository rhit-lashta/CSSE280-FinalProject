import './App.css'
import React, { useEffect } from "react";
import { displayTopLevel } from "./loginScript"; 

function App() {

  //<> is a React Fragment that doesn't include extra DOM elements

  // Use Effects once at the start
  useEffect(() => {
    displayTopLevel()
  }, []);
  

  return (
    <> 
      <main>
        
        <h1>Shopping List</h1>
          <section>
            <h2>Please Log In</h2>
            <div id="login">
                <h3>Login</h3>
                <form action="/create_account" method="POST" enctype="application/x-www-form-urlencoded">
                    <p>
                        <label for="username_text">Username:</label>
                        <input id="username_text" type="text" name="username"></input>
                    </p>
                    <p>
                        <label for="password_text">Password:</label>
                        <input id="password_text" type="password" name="password"></input>
                    </p>
                    <input id="create_button" type="submit" value="Create Account" class="hide"></input>
                    <button id="login_button" type="button" onclick="login()">Login</button>
                </form>
            </div>
            <div>
                <p>
                    <a href="#" id="switch" onclick="swapBetweenLoginAndCreate()">Switch to Create Account</a>
                </p>
            </div>
            <div>
                <p> Database Top Level: </p>
                <div id="topLevel"></div>
            </div>
        </section>
      </main>
    </>
  )
}

export default App