import pickledb
import os

global_db = None

db_path = 'marketplace_data.db'

data_key = "dataMain"
type_key = "type" 
tag_key = "tags"
sold_key = "sold"
date_key = "date"

users_key = "users"
password_key = "password"
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
            “email”:”blank@gmail.com”,
            “phoneNumber”:111-111-1111,
            “contactDescription”:“How to get in contact with me”,
            “profileImage”:”images/test.jpg”,
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
    types["loft"] = {"loft1":{sold_key:100.00, data_key:"10/29/2025"},
                      "loft2":{sold_key:150.00, data_key:"10/30/2025"},
                      "loft3":{sold_key:200.00, data_key:"8/30/2025"},
                      "loft4":{sold_key:300.00, data_key:"12/25/2024"},
                      "loft5":{sold_key:100.00, data_key:"11/6/2025"},
                      "loft6":{sold_key:150.00, data_key:"4/10/2022"},
                      "loft7":{sold_key:75.00, data_key:"2/3/2017"}}
                      
    types["light"] = {"light1":{sold_key:30.00, data_key:"10/30/2025"},
                       "light2":{sold_key:40.00, data_key:"5/30/2025"}}

    tags = db.get(data_key)[tag_key]
    tags["wooden"] = "1"
    tags["metal"] = "2"

    users = db.get(users_key)
    item1 = {itemType_key:"loft", price_key:70.00, tag_key:["wooden","metal"], image_key:"/images/testImage.jpg", description_key:"text"}
    item2 = {itemType_key:"loft", price_key:30.00, tag_key:["wooden"], image_key:"/images/testImage.jpg", description_key:"text2"}
    item3 = {itemType_key:"light", price_key:10.00, tag_key:["wooden"], image_key:"/images/testImage.jpg", description_key:"lightText"}
    users["user1"] = {password_key:"password123",
                      email_key:"blank@gmail.com", 
                      phone_key:"111-111-1111", 
                      description_key:"How to get in contact with me", 
                      profile_key: "images/test.jpg",
                      item_key:{"Item1":item1,"Item2":item2}}
    users["user2"] = {password_key:"password123",
                      email_key:"blank@gmail.com", 
                      phone_key:"111-111-1111", 
                      description_key:"How to get in contact with me", 
                      profile_key: "images/test.jpg",
                      item_key:{"Item3":item3}}
    

    db.save()



def get_user_data(db, username):
    return db.get(users_key)[username]


def add_user(username, password):
    db = get_db()
    users = db.get(users_key)
    if username in users:
        return False
    new_user = {password_key:password,
                email_key:"", 
                phone_key:"", 
                description_key:"", 
                profile_key: "",
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
    userData = users[username]
  
    return [userData]

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

    



'''
def get_shopping_list():
    db = get_db()
    list = get_user_data(db, username)
    all_items = db.all()
    shopping_list_items = {}
    for x in all_items:
        shopping_list_items[x] = list.get(x)

    return shopping_list_items

def add_item_to_list(item):
    db = get_db()
    list = get_user_data(db, username)
    if db.get(item) is None:
        # prevent duplicates
        list.set(item, {"got": False})
    db.save()
    return get_shopping_list()

def add_item_with_image(item, filepath):
    db = get_db()
    if db.get(item) is None:
        # prevent duplicates
        data = {"got": False, "image_path": filepath}
        print(data)
        db.set(item, data)
    db.save()
    return get_shopping_list()

def move_item_between_lists(item):
    db = get_db()
    db_item = db.get(item)
    if db_item is None:
        return get_shopping_list()
    db_item["got"] = not db_item["got"]
    db.set(item, db_item)
    db.save()
    return get_shopping_list()


def remove_item(item):
    db = get_db()
    db.remove(item)
    db.save()
    return get_shopping_list()
    '''