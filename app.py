from flask import Flask, jsonify, request, make_response, abort
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

fruits_data = [] # When we implement the api with an external database and deploy it, this will be pulled from the db

def validate_fruit_data(data):
    if data["name"] and data["ripeness"] and data["expire_date"] and data["count"]:
        return data
    else:
        return abort(make_response({"details": "Invalid data"}, 400))

API_ENDPOINT = "http://3.88.181.187:8080/v1/"

def cost_lost_chat_completion(messages, model="gpt-4", max_tokens=None):
    headers = {
        "Content-Type": "application/json",
    }

    data = {
        "model": model,
        "messages": messages,
    }

    if max_tokens is not None:
        data["max_tokens"] = max_tokens

    response = requests.post(API_ENDPOINT, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"][1:]
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")
        
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

@app.route('/api/fruits/cost_lost', methods=['GET'])
def get_cost_lost():
    cost_lost = 0 # When we implement the api with an external database and deploy it, this will be pulled from the db
    for fruit in fruits_data:
        messages = [{
            "role": "user", 
            "content": f"Estimate how much money did we lose if we let {fruit['count']} {fruit['name']} go rotten, just give me the amount of money, no other text, dollar sign should go first"
        }]
        if fruit["ripeness"] == "rotten":
            data = cost_lost_chat_completion(messages, model="gpt-4", max_tokens=None)
            cost_lost += float(data)
    return jsonify(cost_lost), 200
