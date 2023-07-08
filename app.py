from flask import Flask, jsonify, request, make_response, abort
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

fruits_data = []

def validate_fruit_data(data):
    if data["name"] and data["ripeness"] and data["expire_date"] and data["count"]:
        return data
    else:
        return abort(make_response({"details": "Invalid data"}, 400))
    
@app.route('/api/fruits', methods=['POST'])
def post_fruits():
    request_body = request.get_json()
    fruit = validate_fruit_data(request_body)
    fruits_data.append(fruit)
    return fruits_data, 200

@app.route('/api/fruits', methods=['GET'])
def get_fruits():
    return fruits_data

@app.route('/api/fruits', methods=['DELETE'])
def delete_fruits():
    fruits_data.clear()
    return fruits_data, 200
