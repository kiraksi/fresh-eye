import requests
import json

test_data = [{"name": "banana",
            "ripeness": "ripe",
            "expire_date": 7,
            "count": 1},
            {"name": "apple",
            "ripeness": "rotten",
            "expire_date": 3,
            "count": 1}]

API_ENDPOINT = "http://3.88.181.187:8080/v1/"



def cost_lost_chat_completion(test_data, model="gpt-4", max_tokens=None):
    for i in range(len(test_data)):
        if test_data[i]["ripeness"] == "rotten":
            messages = [{"role": "user", "content": f"Estimate how much money did we lose if we let {test_data[i]['count']} {test_data[i]['name']} go rotten, just give me the amount of money, no other text, dollar sign should go first"}]
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
        

print(cost_lost_chat_completion(test_data))
