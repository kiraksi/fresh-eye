from flask import Flask, jsonify, request, make_response, abort
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

fruits_data = []
COST_LOST = 0

def validate_fruit_data(data):
    if data["name"] and data["ripeness"] and data["expire_date"] and data["count"]:
        return data
    else:
        return abort(make_response({"details": "Invalid data"}, 400))

API_ENDPOINT = "http://3.88.181.187:8080/v1/"

def cost_lost_chat_completion(data, model="gpt-4", max_tokens=None):
        messages = [{"role": "user", "content": f"Estimate how much money did we lose if we let {data['count']} {data['name']} go rotten, just give me the amount of money, no other text, dollar sign should go first"}]
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
    data = cost_lost_chat_completion(fruits_data, model="gpt-4", max_tokens=None)
    return data, 200
