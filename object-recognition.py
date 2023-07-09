import cv2
import cvlib as cv
from cvlib.object_detection import draw_bbox
import requests
import json
from flask import jsonify

# Object recognition with OpenCV
video = cv2.VideoCapture(1)
labels = []
fruits = []
fruit = {}
x, y = 20, 30
count = 0


while True:
    ret, frame = video.read()
    count += 1
    if count % 6 != 0:
        continue

    bbox, label, conf = cv.detect_common_objects(frame)
    output_image = draw_bbox(frame, bbox, label, conf)
    
    for item in label:
        if item in labels:
            pass
        else:
            labels.append(item)

    for i in range(1, len(labels) + 1):
        item = labels[i-1]
        c = label.count(item)
        cv2.putText(output_image, str(f"{item}:{c}"), (x, y*i), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 0), 2)
        cv2.imshow("Food detection", output_image)

        # Update fruit data
        fruit["count"] = c
        fruit["name"] = item
        fruit["ripeness"] = "ripe"
        if fruit not in fruits:
            fruits.append(fruit)
    
    key = cv2.waitKey(33) & 0b11111111
    if key == ord('q'):
        break

# Prompt engineer to get estimated expiring date data from GPT API
for fruit in fruits:

    API_ENDPOINT = "http://3.88.181.187:8080/v1/"

    messages = [{
        "role": "user", 
        "content": f"For {fruit['name']} give me an approximation of when it will expire in number of days, if it is a fruit and the fruit is {fruit['ripeness']} and stored in a fridge. Only return numeric data."
        }]

    def generate_chat_completion(messages, model="gpt-4", max_tokens=None):
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
    fruit["expire_date"] = int(response_text)

# Update database on fruit api
API = 'http://127.0.0.1:5000/api/fruits'
requests.delete(API)
for fruit in fruits:
    requests.post(API, json=fruit)