




export async function login() {
    try {
        let username = document.getElementById("username_text").value;
        let password = document.getElementById("password_text").value;
        
        let response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        let responseData = await response.json();
        let accessToken = responseData["access_token"];
        if (!accessToken) {
            alert("Login failed")
            return;
        }
        localStorage.setItem("access_token", accessToken);
        window.location.href = "/mainPage.html";

    }
    catch (ex) {
        console.error(ex);
    }
}

// UI STUFF
export function swapBetweenLoginAndCreate() {
    let loginButton = document.getElementById("login_button");
    let createButton = document.getElementById("create_button");
    let switchButton = document.getElementById("switch");
    if (createButton.classList.contains("hide")) {
        createButton.classList.remove("hide");
        loginButton.classList.add("hide");
        switchButton.innerText = "Switch to Login";
    }
    else {
        loginButton.classList.remove("hide");
        createButton.classList.add("hide");
        switchButton.innerText = "Switch to Create Account";
    }
    //This prevents the browser from actually redirecting to #, which we don't want
    return false;
}

window.addEventListener("load", (event) => {
    console.log("event occurred: " + event);
    console.log("page is fully loaded");
    //displayTopLevel();
});



export async function displayTopLevel() {
    let options = {
        method: 'GET'
    }
    try {
        let response = await fetch("/top", options);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        let responseData = await response.json();

        let topLevel = "";
        for (let i = 0; i < responseData.length; i++) {
            topLevel += responseData[i] + " ";
        }

        let topData = document.querySelector("#topLevel")     
        topData.innerHTML = topLevel;

    }
    catch (ex) {
        console.error(ex);
    }
}

export async function displayTypes() {
    let options = {
        method: 'GET'
    }
    try {
        let response = await fetch("/types", options);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        let responseData = await response.json();



        let types = "";
        for (let i = 0; i < responseData.length; i++) {
            response = responseData[i];
            let items = "{";
            for (let itemName in response[1]) {
                //let itemProperties = response[1].itemName
                //let itemTraits = "{sold:" + itemProperties.sold + ", date:" + itemProperties.date + "}"
                let itemTraits = "test"

                items += itemName + ": " + itemTraits + ", ";
            }
            items += "}";


            types += "[" + response[0] + ", " + items + "] ";
        }

        let topData = document.querySelector("#types")     
        topData.innerHTML = types;

    }
    catch (ex) {
        console.error(ex);
    }
}

export async function displayTags() {
    let options = {
        method: 'GET'
    }
    try {
        let response = await fetch("/tags", options);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        let responseData = await response.json();

        // This has the tags data
        let tags = responseData;
        // This is an example
        let tagsDisplay = "["
        for (let i = 0; i < responseData.length; i++) {
            tags[i] =  responseData[i]
            tagsDisplay += "[" + responseData[i][0] + ", " + responseData[i][1] + "],"
        }
        tagsDisplay += "]"

        let topData = document.querySelector("#tags")     
        topData.innerHTML = tagsDisplay;

    }
    catch (ex) {
        console.error(ex);
    }
}


export async function displayItems() {

    //let type = document.querySelector("#type") 
    //let orderValue = document.querySelector("#orderValue") 
    //let order = document.querySelector("#order") 
    //let tags = document.querySelector("#tags") 
    //let tagRequirements = document.querySelector("#tagRequirements") 

    let data = {
        "type": "",
        "orderValue": "",
        "order": "",
        "tags": [],
        "tagRequirements": ""
    }
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };


    try {
        let response = await fetch("/items", options)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        let responseData = await response.json();

        let itemDisplay = "["
        for (let i = 0; i < responseData.length; i++) {
            let itemData = responseData[i][1]
            let itemValues = "{"
            for (let key in responseData[i][1])
                itemValues += key + ": " + itemData[key] + ", "
            itemValues += "}"

            itemDisplay += "[" + responseData[i][0] + ", " + itemValues + "],"
        }
        itemDisplay += "]"

        let itemHtml = document.querySelector("#items")     
        itemHtml.innerHTML = itemDisplay;
    }
    catch (ex) {
        console.error(ex);
    }

}

