import requests
import json

COST_LOST = []

test_data = [{"food_type": "bananas",
            "image_class": "rotten",
            "storage": "fridge"},
            {"food_type": "apples",
            "image_class": "rotten",
            "storage": "fridge"}]

API_ENDPOINT = "http://3.88.181.187:8080/v1/"



def generate_chat_completion(test_data, model="gpt-4", max_tokens=None):
    for i in range(len(test_data)):
        if test_data[i]["image_class"] == "rotten":
            messages = [{"role": "user", "content": f"Estimate how much money did we lose if we let 1 {test_data[i]['food_type']} go rotten, just give me the amount of money, no other text"}]
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
                COST_LOST.append(response.json()["choices"][0]["message"]["content"])
            else:
                raise Exception(f"Error {response.status_code}: {response.text}")
        

generate_chat_completion(test_data)
total_cost = sum([float(i[1:]) for i in COST_LOST])
print(total_cost)