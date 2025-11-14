import './Login.css'
import React, { useEffect, useState} from "react";
import { login} from "./scriptMain"; 

function Login() {

  //<> is a React Fragment that doesn't include extra DOM elements

  // Use Effects once at the start
  useEffect(() => {

  }, []);

  let [inLogin, setLogin] = useState(true);

  function toggleLogin() {
    setLogin(!inLogin)
  };
  

  return (
    <> 
      <main>
        
        <h1><strong>Rose Marketplace</strong></h1>
          <section>
            <div id="login">
                {inLogin && (<h2>Login</h2>)} {!inLogin && (<h2>Create Account</h2>)}
                <form action="/create_account" method="POST" enctype="application/x-www-form-urlencoded">
                    <p>
                        <label for="username_text">Username:</label>
                        <input id="username_text" type="text" name="username" required></input>
                    </p>
                    <p>
                        <label for="password_text">Password:</label>
                        <input id="password_text" type="password" name="password" required></input>
                    </p>
                    {inLogin && (<button id="login_button" type="button" onClick={login}>Login</button>)}
                    {!inLogin && (<button id="create_button" type="submit" value="Create Account" class="hide">Create Account</button>)}
                    
                    
                </form>
            </div>
            <div>
                <p>
                    <a href="#" id="switch" onClick={toggleLogin}>Switch to Create Account</a>
                </p>
            </div>
        </section>
      </main>
    </>
  )
}

export default Login