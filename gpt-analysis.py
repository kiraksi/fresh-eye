import requests
import json

test_data = {"fruit_type": "bananas",
            "image_class": "ripe",
            "user_lat": 47.606209,
            "user_lon": -122.332069}


# curl http://3.88.181.187:8080/v1/ \
#   -H 'Content-Type: application/json' \
#   -d '{
#   "model": "gpt-4",        
#   "messages": [{"role": "user", "content": "Hello, how are you?"}]
# }'

API_KEY = "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"
API_ENDPOINT = "http://3.88.181.187:8080/v1/"

messages = [{"role": "user", "content": f"For the fruit {test_data['fruit_type']} give me an approximation of how when it will rot in number of days, if the fruit is {test_data['image_class']} and the user's location is {test_data['user_lat']}, {test_data['user_lon']}"}]


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