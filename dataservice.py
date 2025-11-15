import pickledb
import os
from datetime import date

global_db = None

db_path = 'marketplace_data.db'

data_key = "dataMain"
type_key = "type" 
tag_key = "tags"
sold_key = "sold"
date_key = "date"

users_key = "users"
password_key = "password"
info_key = "info"
email_key = "email"
phone_key = "phoneNumber"
contact_key = "contactDescription"
profile_key = "profileImage"
item_key = "items"

itemType_key = "type"
price_key = "price"
image_key = "image"
description_key = "description"


'''
Defualt Data Structure

Pickle DB = {
	“dataMain”: {
		types: {
            “loft”:{
	            “loft1”:{“sold”:”100”, “date”:”10/29/2025”},
                “loft2”:{“sold”:”150”, “date”:”10/30/2025”},
            }
            “light”:{
	            “light1”:{“sold”:”30”, “date”:”10/29/2025”},
            }
        },
        tags: {
	        “wooden”:”1”
            “metal”:”2”
        }
    },
	
	“users”: {
        “user1”: {
            “password”:”password123”,
            “Info”: {
                “email”:”blank@gmail.com”,
                “phoneNumber”:111-111-1111,
                “contactDescription”:“How to get in contact with me”,
                “profileImage”:”images/test.jpg”,
            }
 	        “items”:{
		        “Item1”: {
		        	“type”:”loft”,
			        “price”:”70”,
			        “tags”:[“wooden”, “metal”]
			        “image”:”images/test.jpg”
			        “description”,“text”
		        },
	        },
        }
    }
}
'''

def load_db():
    global global_db
    db_file_already_exists = os.path.exists(db_path)
    global_db = pickledb.PickleDB(db_path)
    global_db.save()
    if not db_file_already_exists:
        dataContent = {type_key:{}, tag_key:{}}
        global_db.set(data_key, dataContent)
        global_db.set(users_key, {})
        global_db.save()

    add_placeholder_values()


def get_db():
    global global_db
    if global_db is None:
        load_db()

    return global_db


def add_placeholder_values():
    db = get_db()

    types = db.get(data_key)[type_key]
    types["loft"] = {"loft1":{sold_key:100.00, date_key:"10/29/2025"},
                      "loft2":{sold_key:150.00, date_key:"11/10/2025"},
                      "loft3":{sold_key:200.00, date_key:"8/30/2025"},
                      "loft4":{sold_key:300.00, date_key:"12/25/2024"},
                      "loft5":{sold_key:100.00, date_key:"11/6/2025"},
                      "loft6":{sold_key:150.00, date_key:"4/10/2022"},
                      "loft7":{sold_key:75.00, date_key:"2/3/2017"}}
                      
    types["light"] = {"light1":{sold_key:30.00, date_key:"10/30/2025"},
                       "light2":{sold_key:40.00, date_key:"5/30/2025"}}
    
    types["chair"] = {"chair1":{sold_key:30.00, date_key:"11/13/2025"}}
    
    types["desk"] = {"desk1":{sold_key:100.00, date_key:"11/11/2025"},
                     "desk2":{sold_key:40.00, date_key:"5/30/2023"}}
    
    types["other"] = {}

    tags = db.get(data_key)[tag_key]
    tags["wooden"] = "1"
    tags["metal"] = "2"
    tags["over 6 feet"] = "3"
    tags["under 6 feet"] = "4"
    tags["over 9 feet"] = "5"
    tags["has instructions"] = "6"
    tags["hand made"] = "7"
    tags["soft"] = "8"

    users = db.get(users_key)
    item1 = {itemType_key:"loft", price_key:70.00, tag_key:["wooden","metal","over 6 feet","has instructions"], image_key:"/images/Loft1.png", description_key:"A medium sized wood loft."}
    item2 = {itemType_key:"loft", price_key:30.00, tag_key:["metal","over 9 feet","has instructions"], image_key:"/images/Loft2.jpg", description_key:"A Little loft for a little boy"}
    item3 = {itemType_key:"light", price_key:10.00, tag_key:["under 6 feet"], image_key:"/images/Lamp.jpg", description_key:"It would be a very bright idea to buy this"}
    item4 = {itemType_key:"chair", price_key:30.00, tag_key:["wooden","hand made"], image_key:"/images/Chair.jpg", description_key:"Deals like this come once in a lifetime"}
    item5 = {itemType_key:"chair", price_key:45.00, tag_key:["metal", "soft"], image_key:"/images/SoftChair.jpg", description_key:"Soft Chair"}
    users["user1"] = {password_key:"password123",
                      info_key:{
                        email_key:"awsome@gmail.com", 
                        phone_key:"111-111-1111", 
                        description_key:"I live in percopo 4, you must answer my riddles 3 to buy from me", 
                        profile_key: "images/testImage.jpg",
                      },
                      item_key:{"WoodLoft":item1,"Lamp":item3, "WoodChair":item4}
                    }
    users["user2"] = {password_key:"password1234",
                      info_key:{
                        email_key:"blank@gmail.com", 
                        phone_key:"111-111-1112", 
                        description_key:"I live right down the road", 
                        profile_key: "images/Dog.jpg",
                      },
                      item_key:{"MetalLoft":item2, "ComfyChair":item5}
                    }
    

    db.save()



def get_user_data(db, username):
    return db.get(users_key)[username]


def add_user(username, password):
    db = get_db()
    users = db.get(users_key)
    if username in users:
        return False
    new_user = {password_key:password,
                info_key:{email_key:"", phone_key:"", description_key:"", profile_key: ""},
                item_key:{}}
    users[username] = new_user
    db.save()
    return True

def authenticate_user(username, password):
    db = get_db()
    users = db.get(users_key)
    if not username in users:
        return False
    user = users[username]
    if not password_key in user:
        return False
    return user[password_key] == password

def verify_user_exists(username):
    db = get_db()
    users = db.get(users_key)
    return username in users

def get_top_list():
    db = get_db()
    all_items = db.all()
    topLevel = []
    for x in all_items:
        topLevel.append(x)

    return topLevel

def get_types_list():
    db = get_db()
    all_types = db.get(data_key)[type_key]
    types = []
    for typeName in all_types:
        sales = all_types[typeName]
        typeData = [typeName, sales]
        types.append(typeData)

    types = sorted(types, key=lambda types: -len(types[1]))
    return types

def get_tags_list():
    db = get_db()
    all_tags = db.get(data_key)[tag_key]
    tags = []
    for tagName in all_tags:
        offers = all_tags[tagName]
        tagData = [tagName, offers]
        tags.append(tagData)

    tags = sorted(tags, key=lambda tags: -(int(tags[1])))
    return tags

def get_item_list(type, orderValue, order, tags, tagRequirements):
    db = get_db()
    users = db.get(users_key)
    items = []

    for username in users:
        userItems = users[username][item_key]
        for itemName in userItems:
            itemTraits = userItems[itemName]
            if ((type == "" or type == itemTraits[type_key]) and (check_item_tags(itemTraits[tag_key], tags, tagRequirements))):
                newItem = [itemName, itemTraits, username]
                items.append(newItem)

    if (orderValue == "Price"):
        items = sorted(items, key=lambda items: order * (int(items[1][price_key])))
  
    return items

def get_item(user, itemName):
    db = get_db()
    users = db.get(users_key)

    if ((user in users) and (itemName in users[user][item_key])):
        userInfo = users[user][info_key]
        itemTraits = users[user][item_key][itemName]
        itemTraits = itemTraits
        item = [userInfo, itemTraits]
        return item
    else:
        return [None]


def check_item_tags(itemTags, tags, tagRequirements):

    if tagRequirements <= 0:
        return True

    correctTags = 0
    for tag in itemTags:
        if tag in tags:
            correctTags += 1
            if (correctTags >= tagRequirements):
                break

    return correctTags >= tagRequirements


def get_user_items_list(username):
    db = get_db()
    users = db.get(users_key)
    userItems = users[username][item_key]
    items = []

    for itemName in userItems:
        itemTraits = userItems[itemName]
        newItem = [itemName, itemTraits]
        items.append(newItem)
  
    return items

def get_profile(username):
    db = get_db()
    users = db.get(users_key)
    userData = users[username][info_key]
    userData["username"] = username
    
    return [userData]

def get_specific_profile(currentUser, username):
    db = get_db()
    users = db.get(users_key)

    if (username in users):
        userData = users[username][info_key]
        sameUser = (currentUser == username)
        return [username, userData, sameUser]
    
    return []

    


def update_profile(currentUsername, photo, email, phoneNumber, description):
    db = get_db()
    users = db.get(users_key)

    if currentUsername not in users:
        return ""

    # remember old profile image path for possible deletion
    old_image = users[currentUsername][info_key].get(profile_key, "") or ""
    delete_path = ""

    userInfo = users[currentUsername][info_key]
    if email is not None:
        userInfo[email_key] = email
    if phoneNumber is not None:
        userInfo[phone_key] = phoneNumber
    if description is not None:
        userInfo[description_key] = description
    if photo is not None:
        if old_image and (old_image != photo):
            fixed_path = old_image.lstrip('/')
            delete_path = os.path.join('dist', fixed_path)
        userInfo[profile_key] = photo

    db.save()
    return delete_path

def create_new_item(username, itemName, photo, type, price, tags, description):
    db = get_db()
    users = db.get(users_key)
    userItems = users[username][item_key]

    newItem = {
		        	itemType_key:type,
			        price_key:price,
			        tag_key:tags,
			        image_key:photo,
			        description_key:description
		        } 
    
    userItems[itemName] = newItem
    db.save()
  
    return True

def update_item(username, oldName, itemName, photo, type, price, tags, description):
    db = get_db()
    users = db.get(users_key)
    userItems = users[username][item_key]

    newPhoto = photo
    filepath = ""
    
    if (oldName in userItems):
        if (photo == None):
            newPhoto = userItems[oldName][image_key]
        else:
            filepath = "dist" + userItems[itemName][image_key]
        

        del userItems[oldName]

    newItem = {
		        	itemType_key:type,
			        price_key:price,
			        tag_key:tags,
			        image_key:newPhoto,
			        description_key:description
		        } 
    
    userItems[itemName] = newItem
    db.save()
  
    return filepath
    
def remove_item(username, itemName, price):
    db = get_db()
    users = db.get(users_key)
    userItems = users[username][item_key]
    
    if (itemName in userItems):
        itemType = userItems[itemName][type_key]
        fileName = userItems[itemName][image_key]
        del userItems[itemName]

        if (price > 0):
            
            today = date.today()
            currentDate =  str(today.month) + "/" + str(today.day) + "/" + str(today.year)

            dataMain = db.get(data_key)
            typeSection = dataMain[type_key][itemType]

            newSale = {sold_key:price, date_key:currentDate}

            ## Prevents Item Override
            count = 0
            saveItemName = itemName
            while (saveItemName in typeSection):
                saveItemName = itemName + str(count)
                count += 1

            typeSection[saveItemName] = newSale

          
        db.save()
        return "dist" + fileName
    else:
        return False
