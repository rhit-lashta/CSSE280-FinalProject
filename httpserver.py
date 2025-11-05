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
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = flask.Flask(__name__,
            static_url_path='',
            static_folder='dist',)

app.config['IMAGE_FOLDER'] = IMAGE_FOLDER
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



@app.get("/shutdown")
@jwt_required()
def shutdown():
    if (dataservice.verify_user_exists(get_jwt_identity()) == False):
        return flask.Response(status="401")
    os._exit(0)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
