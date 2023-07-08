import cv2
import cvlib as cv
from cvlib.object_detection import draw_bbox
import requests
import json

# Object recognition with OpenCV
video = cv2.VideoCapture(0)
labels = []
items = {}
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
        items[item] = c
        cv2.putText(output_image, str(f"{item}:{c}"), (x, y*i), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 0), 2)
        cv2.imshow("Food detection", output_image)
    
    key = cv2.waitKey(33) & 0b11111111
    if key == ord('q'):
        break

# Prompt engineer to get estimated expiring date data from GPT API
for key, value in items.items():
    test_data = {"fruit_type": key,
                "image_class": "ripe"}

    API_ENDPOINT = "http://3.88.181.187:8080/v1/"

    messages = [{
        "role": "user", 
        "content": f"For the fruit {test_data['fruit_type']} give me an approximation of when it will expire in number of days, if the fruit is {test_data['image_class']} and stored in a fridge. Only return numeric data."
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
    
