let tagArray = []
let typeArray = []
let itemsArray = []


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

function displayTypes() {
    let types = "";
        for (let i = 0; i < typeArray.length; i++) {
            let response = typeArray[i];
            let items = "{";
            for (let itemName in response[1]) {
                let itemTraits = "test"

                items += itemName + ": " + itemTraits + ", ";
            }
            items += "}";


            types += "[" + response[0] + ", " + items + "] ";
        }

        let topData = document.querySelector("#types")     
        topData.innerHTML = types;
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

function displayTags() {
    // This is an example
    let tagsDisplay = "["
    for (let i = 0; i < tagArray.length; i++) {
        tagsDisplay += "[" + tagArray[i][0] + ", " + tagArray[i][1] + "],"
    }
    tagsDisplay += "]"

    let topData = document.querySelector("#tags")     
    topData.innerHTML = tagsDisplay;
}


export async function loadItems() {

    //let type = document.querySelector("#type") 
    //let orderValue = document.querySelector("#orderValue") 
    //let order = document.querySelector("#order") 
    //let tags = document.querySelector("#tags") 
    //let tagRequirements = document.querySelector("#tagRequirements") 

    let data = {
        "type": "",
        "orderValue": "",
        "order": "0",
        "tags": [],
        "tagRequirements": "0"
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

        displayItems()

        
    }
    catch (ex) {
        console.error(ex);
    }

}

function displayItems() {
    let itemDisplay = "["
    for (let i = 0; i < itemsArray.length; i++) {
        let itemData = itemsArray[i][1]
        let itemValues = "{"
        for (let key in itemsArray[i][1])
            itemValues += key + ": " + itemData[key] + ", "
        itemValues += "}"

        itemDisplay += "[" + itemsArray[i][0] + ", " + itemValues + "],"
    }
    itemDisplay += "]"

    let itemHtml = document.querySelector("#items")     
    itemHtml.innerHTML = itemDisplay;
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

        displayItems()

        
    }
    catch (ex) {
        console.error(ex);
    }

}

export async function createNewItem(itemName, price, type, photo, tags, description) {

    let data = {
        "name": itemName,
        "price": price,
        "type": type, 
        "photo": photo,
        "tags": tags,
        "description": description,
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
        let response = await fetch("/item", options)
        if (!response.ok) {
            if(handle401(response)) {
                return;
            }
            throw new Error(`Response status: ${response.status}`);
        }
        let success = await response.json();

        if (success) {
            window.location.href = "/index.html/#/profile/yourListings";
        }

        
    }
    catch (ex) {
        console.error(ex);
    }

}

export function getPriceWidget(allTypes, type, timeSpan) {

    let items = null;
    for (let i = 0; i < allTypes.length; i++) {
        if (allTypes[i][0] == type) {
            items = allTypes[i][1]
        }

    }

    let currentDate = new Date();
    let year = currentDate.getFullYear(); 
    let month = currentDate.getMonth(); 
    let day = currentDate.getDate();

    month -= timeSpan;
    if (month <= 0) {
        month += 12;
        year -= 1;
    }

    

    let itemWidget = [0,[]];
    // Item Widget = [avg Price, [items in date]]
    

    let totalPrice = 0;
    let totalItems = 0;

    

    for (let item in items) {
        
        let itemData = items[item]
        let itemDate = itemData["dataMain"]
        let dateParts = itemDate.split("/");
        // [Month, Day, Year] //
        if ((dateParts[2] > year) || (dateParts[2] == year && dateParts[0] > month) || (dateParts[2] == year && dateParts[0] == month && dateParts[0] >= day)) {
            totalItems += 1;
            totalPrice += itemData["sold"]
            
        }
        

    }

    itemWidget[0] = totalPrice / totalItems;

    return itemWidget
}

