import './Login.css'
import React, { useEffect, useState} from "react";
import { login, createAccount, checkNoSpecial} from "./scriptMain"; 

function Login() {

  //<> is a React Fragment that doesn't include extra DOM elements

  // Use Effects once at the start
  useEffect(() => {

  }, []);

  let [inLogin, setLogin] = useState(true);

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let [error, setError] = useState("");

  function toggleLogin() {
    setLogin(!inLogin)
  };

  function handleLogin() {
    login(username, password)
  }

  async function handleCreateAccount(event) {
    event.preventDefault();
    if (checkNoSpecial(username)) {
      setError("")
      let accountCreated = await createAccount(username, password)
      if (accountCreated) {
          window.location.href = "index.html";
      }
    }
    else {
      setError("Username can only have letters a-z and A-Z")
    }
  }

  let handleUsernameChange = (e) => {
    let {value} = e.target;
    setUsername(value);
  };

  let handlePasswordChange = (e) => {
    let {value} = e.target;
    setPassword(value);
  };

  

  return (
    <> 
      <main>
        
        <h1><strong>Rose Marketplace</strong></h1>
          <section>
            <div id="login">
                {inLogin && (<h2>Login</h2>)} {!inLogin && (<h2>Create Account</h2>)}
                <form onSubmit={handleCreateAccount}>
                    <p>
                        <label for="username_text">Username:</label>
                        <input id="username_text" type="text" name="username" value={username} onChange={handleUsernameChange} required></input>
                    </p>
                    <p>
                        <label for="password_text">Password:</label>
                        <input id="password_text" type="password" name="password" value={password} onChange={handlePasswordChange} required></input>
                    </p>
                    {inLogin && (<button id="login_button" type="button" onClick={handleLogin}>Login</button>)}
                    {!inLogin && (<button id="create_button" type="submit" value="Create Account" class="hide">Create Account</button>)}
                    
                    
                </form>
            </div>
            <div>
            {inLogin && (<p><a href="#" id="switch" onClick={toggleLogin}>Switch to Create Account</a></p>)}
            {!inLogin && (<p><a href="#" id="switch" onClick={toggleLogin}>Switch to Login</a></p>)}
            </div>
            <div>
            {!inLogin && (<div class="error">{error}</div>)}
            </div>
        </section>
      </main>
    </>
  )
}

export default Login