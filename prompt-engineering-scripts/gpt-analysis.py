import requests
import json

test_data = [{"name": "banana",
            "ripeness": "ripe",
            "expire_date": 7,
            "count": 1}]




# curl http://3.88.181.187:8080/v1/ \
#   -H 'Content-Type: application/json' \
#   -d '{
#   "model": "gpt-4",        
#   "messages": [{"role": "user", "content": "Hello, how are you?"}]
# }'

API_ENDPOINT = "http://3.88.181.187:8080/v1/"

messages = [{"role": "user", 
            "content": f"Only if {test_data[0]['name']} is a type of fruits, give me an approximation of when it will expire in number of days, given that the fruit is {test_data[0]['ripeness']} and stored in a fridge. Only return numeric data."
            }]

def generate_chat_completion(messages, model="gpt-4", temperature=1, max_tokens=None):
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
        return response.json()["choices"][0]["message"]["content"]
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")
    

response_text = generate_chat_completion(messages)
print(response_text)