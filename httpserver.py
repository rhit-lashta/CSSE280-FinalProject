import flask
import json
import dataservice
import os
from flask import jsonify
from flask import request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import verify_jwt_in_request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from werkzeug.utils import secure_filename
IMAGE_FOLDER = 'public/images'
BUILD_IMAGE_FOLDER = 'dist/images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = flask.Flask(__name__,
            static_url_path='',
            static_folder='dist',)

app.config['IMAGE_FOLDER'] = IMAGE_FOLDER
app.config['BUILD_IMAGE_FOLDER'] = BUILD_IMAGE_FOLDER
app.config['JWT_SECRET_KEY'] = "mysecretkey"
jwt = JWTManager(app)


@app.post("/create_account")
def create_account():
    username = request.form["username"]
    password = request.form["password"]
    if not dataservice.add_user(username, password):
        return flask.redirect("/index.html")
    return flask.redirect("/index.html")


@app.post("/login")
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if not dataservice.authenticate_user(username, password):
        return flask.Response(status=401)
    access_token = create_access_token(identity = username)
    return jsonify(access_token = access_token)

@app.get("/top")
@jwt_required()
def get_top():
    if (dataservice.verify_user_exists(get_jwt_identity()) == False):
        return flask.Response(status="401")
    print(get_jwt_identity())
    return flask.Response(status="200 OK",
                          headers={"Content-Type": "application/json"},
                          response = json.dumps(dataservice.get_top_list()))

@app.get("/types")
@jwt_required()
def get_types():
    if (dataservice.verify_user_exists(get_jwt_identity()) == False):
        return flask.Response(status="401")
    return flask.Response(status="200 OK",
                          headers={"Content-Type": "application/json"},
                          response = json.dumps(dataservice.get_types_list()))

@app.get("/tags")
@jwt_required()
def get_tags():
    if (dataservice.verify_user_exists(get_jwt_identity()) == False):
        return flask.Response(status="401")
    return flask.Response(status="200 OK",
                          headers={"Content-Type": "application/json"},
                          response = json.dumps(dataservice.get_tags_list()))

@app.get("/userItems")
@jwt_required()
def get_user_items():
    username = get_jwt_identity()
    if (dataservice.verify_user_exists(username) == False):
        return flask.Response(status="401")
    return flask.Response(status="200 OK",
                          headers={"Content-Type": "application/json"},
                          response = json.dumps(dataservice.get_user_items_list(username)))

@app.get("/profile")
@jwt_required()
def get_profile():
    username = get_jwt_identity()
    if (dataservice.verify_user_exists(username) == False):
        return flask.Response(status="401")
    return flask.Response(status="200 OK",
                          headers={"Content-Type": "application/json"},
                          response = json.dumps(dataservice.get_profile(username)))

@app.post("/profile")
@jwt_required()
def get_specfic_profile():
    username = get_jwt_identity()
    if (dataservice.verify_user_exists(username) == False):
        return flask.Response(status="401")
    data = request.get_json()
    userToFind = data.get("user")
    if (userToFind == ""):
        userToFind = username

    return flask.Response(status="200 OK",
                          headers={"Content-Type": "application/json"},
                          response = json.dumps(dataservice.get_profile(username, userToFind)))



@app.post("/items")
@jwt_required()
def get_items():
    if (dataservice.verify_user_exists(get_jwt_identity()) == False):
        return flask.Response(status="401")

    data = request.get_json()
    type = data.get("type")
    orderValue = data.get("orderValue")
    order = int(data.get("order"))
    tags = data.get("tags")
    tagRequirements = int(data.get("tagRequirements"))

    return flask.Response(status="200 OK",
                          headers={"Content-Type": "application/json"},
                          response = json.dumps(dataservice.get_item_list(type, orderValue, order, tags, tagRequirements)))

@app.post("/item")
@jwt_required()
def add_item():
    username = get_jwt_identity()
    if (dataservice.verify_user_exists(username) == False):
        return flask.Response(status="401")
    ##data = request.get_json()

    itemName = request.form.get("name")
    price = float(request.form.get("price"))
    type = request.form.get("type")
    tags = request.form.get("tags")
    description = request.form.get("description")
    filepath = request.form.get("image")
    filepath = process_image_file(request)

    return flask.Response(status="200 OK",
                          headers={"Content-Type": "application/json"},
                          response = json.dumps(dataservice.create_new_item(username, itemName, filepath, type, price, tags, description)))

@app.patch("/item")
@jwt_required()
def update_item():
    username = get_jwt_identity()
    if (dataservice.verify_user_exists(username) == False):
        return flask.Response(status="401")
    data = request.get_json()

    oldName = data.get("oldName")
    itemName = data.get("name")
    price = float(data.get("price"))
    type = data.get("type")
    tags = data.get("tags")
    description = data.get("description")
    filepath = data.get("photo")
    
    ##dataservice.delete_item(username, oldName, filepath, type, price, tags, description)
    dataservice.create_new_item(username, itemName, filepath, type, price, tags, description)

    return flask.Response(status="204 No Content")

@app.post("/get_specific_item")
@jwt_required()
def get_specific_item():
    if (dataservice.verify_user_exists(get_jwt_identity()) == False):
        return flask.Response(status="401")

    data = request.get_json()
    user = data.get("user")
    itemName = data.get("itemName")

    return flask.Response(status="200 OK",
                          headers={"Content-Type": "application/json"},
                          response = json.dumps(dataservice.get_item(user, itemName)))



@app.get("/shutdown")
@jwt_required()
def shutdown():
    if (dataservice.verify_user_exists(get_jwt_identity()) == False):
        return flask.Response(status="401")
    os._exit(0)

# File Processing Code Below

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_image_file(request):
    # check if the post request has the file part
    if 'image' not in request.files:
        return None
    file = request.files['image']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        return None
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['IMAGE_FOLDER'], filename)
        print(os.getcwd())
        file.save(filepath)
        filepathDist = os.path.join(app.config['BUILD_IMAGE_FOLDER'], filename)
        file.save(filepathDist)
        return "/images/" + filename


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
