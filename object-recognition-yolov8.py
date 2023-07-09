from ultralytics import YOLO
import cv2
import cvlib as cv
from cvlib.object_detection import draw_bbox
import requests
import json


# define some constants
CONFIDENCE_THRESHOLD = 0.7
GREEN = (0, 255, 0)


# initialize the video capture object
video_cap = cv2.VideoCapture(0)
# initialize the video writer object

# load the pre-trained YOLOv8n model
model = YOLO('fine-tuning-models/YOLO_models/runs/detect/yolov8n_v8_50e4/weights/best.pt')

labels = []
fruits = []
x, y = 20, 30
count = 0


while True:
    ret, frame = video_cap.read()

    # if there are no more frames to process, break out of the loop
    if not ret:
        break

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


    # run the YOLO model on the frame
    detections = model(frame)[0]


    # loop over the detections
    for data in detections.boxes.data.tolist():
        
        # extract the confidence (i.e., probability) associated with the detection
        confidence = data[4]

        # filter out weak detections by ensuring the 
        # confidence is greater than the minimum confidence
        if float(confidence) < CONFIDENCE_THRESHOLD:
            continue

        clist= detections.boxes.cls
        cls = []
        for cno in clist:
            cls.append(model.names[int(cno)])

        
        # if the confidence is greater than the minimum confidence,
        # draw the bounding box on the frame
        xmin, ymin, xmax, ymax = int(data[0]), int(data[1]), int(data[2]), int(data[3])
        cv2.rectangle(frame, (xmin, ymin) , (xmax, ymax), GREEN, 2)
        cv2.putText(frame, f"{cls[0]}", (xmin, ymin-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)
    
        for i in range(1, len(labels) + 1):
            item = labels[i-1]
            if item in ["banana", "apple", "orange"]:
                c = label.count(item)
                cv2.putText(output_image, str(f"{item}:{c}"), (x, y*i), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 0), 2)

                # Update fruit data
                fruit = {}
                fruit["count"] = c
                fruit["name"] = item
                fruit["ripeness"] = cls[0]
                if fruit not in fruits:
                    fruits.append(fruit)

    # show the frame to our screen
    cv2.imshow("Frame", frame)

    if cv2.waitKey(1) == ord("q"):
        break

for fruit in fruits:

    API_ENDPOINT = "http://3.88.181.187:8080/v1/"

    messages = [{
        "role": "user", 
        "content": f"Only if {fruit['name']} is a type of fruits, give me an approximation of when it will expire in number of days, given that the fruit is {fruit['ripeness']} and stored in a fridge. Only return numeric data."
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
    try:
        fruit["expire_date"] = int(response_text)
    except ValueError:
        fruits.remove(fruit)

print(fruits)

# Update database on fruit api
API = 'http://127.0.0.1:5000/api/fruits'
requests.delete(API)
for fruit in fruits:
    requests.post(API, json=fruit)

video_cap.release()
cv2.destroyAllWindows()