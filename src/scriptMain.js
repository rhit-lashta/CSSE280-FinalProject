let tagArray = []
let typeArray = []
let itemsArray = []
let userArray = []


function logout() {
    localStorage.removeItem("access_token");
    window.location.href = "/index.html";
}

function handle401(response){
    if(response.status == 401){
        logout();
        return true;
    }
    return false;
}

function addAuthHeader(options){
    if(localStorage["access_token"]){
        if(!options["headers"]){
            options["headers"] = {};
        }
        options["headers"]["Authorization"] = "Bearer " + localStorage.getItem("access_token");
    }
}

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
            alert("Login failed");
            return;
        }
        localStorage.setItem("access_token", accessToken);
        window.location.href = "index.html#/listings";

    }
    catch (ex) {
        console.error(ex);
    }
}

export async function displayTopLevel() {
    let options = {
        method: 'GET'
    }
    addAuthHeader(options)
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

export async function loadTypes() {
    let options = {
        method: 'GET'
    }
    addAuthHeader(options)
    try {
        let response = await fetch("/types", options);
        if (!response.ok) {
            if(handle401(response)) {
                return;
            }
            throw new Error(`Response status: ${response.status}`);
        }
        typeArray = await response.json();

        //displayTypes()
        return typeArray;

    }
    catch (ex) {
        console.error(ex);
        return [];
    }
}

export function getTypes() {
    let types = [];

    for (let i = 0; i < typeArray.length; i++) {
        types.append = typeArray[i][0];
    }

    return types;
}


export async function loadTags() {
    let options = {
        method: 'GET'
    }
    addAuthHeader(options)
    try {
        let response = await fetch("/tags", options);
        if (!response.ok) {
            if(handle401(response)) {
                return;
            }
            throw new Error(`Response status: ${response.status}`);
        }
        tagArray = await response.json();
        return tagArray;

        //displayTags()

    }
    catch (ex) {
        console.error(ex);
    }
}


export async function loadItems(type, orderValue, order, tags, tagRequirements) {

    let data = {
        "type": type,
        "orderValue": orderValue,
        "order": order,
        "tags": tags,
        "tagRequirements": tagRequirements
    }
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    addAuthHeader(options)

    try {
        let response = await fetch("/items", options)
        if (!response.ok) {
            if(handle401(response)) {
                return;
            }
            throw new Error(`Response status: ${response.status}`);
        }
        itemsArray = await response.json();
        return itemsArray

        //displayItems()

        
    }
    catch (ex) {
        console.error(ex);
    }

}

export async function loadItem(user, itemName) {

    let data = {
        "user":user,
        "itemName": itemName,
    }
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    addAuthHeader(options)

    try {
        let response = await fetch("/get_specific_item", options)
        if (!response.ok) {
            if(handle401(response)) {
                return;
            }
            throw new Error(`Response status: ${response.status}`);
        }
        let item = await response.json();
        if (item[0] == null) {
            window.location.href = "/index.html#/listings";
        }

        return item;
    }
    catch (ex) {
        console.error(ex);
    }

}


export async function loadProfileInfo(user) {

    let data = {
        "user":user,
    }
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    addAuthHeader(options)

    try {
        let response = await fetch("/profile", options)
        if (!response.ok) {
            if(handle401(response)) {
                return;
            }
            throw new Error(`Response status: ${response.status}`);
        }
        let profileInfo = await response.json();
        return profileInfo;
    }
    catch (ex) {
        console.error(ex);
    }
}

export async function loadUserItems() {

    let options = {
        method: 'GET'
    }
    addAuthHeader(options)

    try {
        let response = await fetch("/userItems", options)
        if (!response.ok) {
            if(handle401(response)) {
                return;
            }
            throw new Error(`Response status: ${response.status}`);
        }
        itemsArray = await response.json();
        return itemsArray;
    }
    catch (ex) {
        console.error(ex);
    }
}

export async function loadTargetUserItems(user) {
    let data = {
        "user":user,
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    addAuthHeader(options)

    try {
        let response = await fetch("/userItems", options)
        if (!response.ok) {
            if(handle401(response)) {
                return;
            }
            throw new Error(`Response status: ${response.status}`);
        }
        itemsArray = await response.json();
        return itemsArray;
    }
    catch (ex) {
        console.error(ex);
    }
}

export async function createNewItem(itemName, price, type, photo, tags, description) {

    let formData = new FormData();
    formData.append("name", itemName);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("tags", tags);
    formData.append("description", description);
    formData.append("image", photo, photo.name);

    let options = {
        method: "POST",
        body: formData, 
    };
    addAuthHeader(options)
    
    try {
        let response = await fetch("/item", options)
        if (!response.ok) {
            if(handle401(response)) {
                return;
            }
            throw new Error(`Response status: ${response.status}`);
        }
        let success = await response.json();

        if (success) {
            window.location.href = "/index.html/#/userListings";
        }

        
    }
    catch (ex) {
        console.error(ex);
    }

}

export async function loadUserInfo() {

    let options = {
        method: 'GET'
    }
    addAuthHeader(options)

    try {
        let response = await fetch("/profile", options)
        
        if (!response.ok) {
            if(handle401(response)) {
                return null;
            }
            throw new Error(`Response status: ${response.status}`);
        }
        userArray = await response.json();

        return userArray;
    }
    catch (err) {
        console.error(err);
        return null;
    }

} 
export async function updateItem(oldName, itemName, price, type, photo, tags, description) {


    let formData = new FormData();
    formData.append("oldName", oldName);
    formData.append("name", itemName);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("tags", tags);
    formData.append("description", description);
    if (photo != null) {
        formData.append("image", photo, photo.name);
    }

    let options = {
        method: "PATCH",
        body: formData, 
    };
    addAuthHeader(options)

    try {
        let response = await fetch("/item", options)
        if (!response.ok) {
            if(handle401(response)) {
                return;
            }
            throw new Error(`Response status: ${response.status}`);
        }
        return;
    }
    catch (ex) {
        console.error(ex);
    }

}

export async function updateProfile(email, phoneNumber, description, photo) {

    let formData = new FormData();
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("description", description);
    if (photo != null) {
        formData.append("image", photo, photo.name);
    }

    let options = {
        method: "PATCH",
        body: formData,
    };
    addAuthHeader(options)

    try {
        let response = await fetch("/profile", options)
        if (!response.ok) {
            if(handle401(response)) {
                return;
            }
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    }
    catch (ex) {
        console.error(ex);
    }

}

export async function removeItem(itemName, price) {

    let data = {
        "itemName": itemName,
        "price": price,
    }
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    addAuthHeader(options)

    try {
        let response = await fetch("/item", options)
        if (!response.ok) {
            if(handle401(response)) {
                return;
            }
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();


        
    }
    catch (ex) {
        console.error(ex);
    }

}
