from ultralytics import YOLO
import cv2
import cvlib as cv
import requests
import json
from cvlib.object_detection import draw_bbox
import sys
import os

video = cv2.VideoCapture(0)
ret, frame = video.read()
# video_path_out = '{}_out.mp4'.format(0)
# H, W, _ = frame.shape
# out = cv2.VideoWriter(video_path_out, cv2.VideoWriter_fourcc(*'mp4v'), int(video.get(cv2.CAP_PROP_FPS)), (W, H))

# Load yolo custom model
model_path = './YOLO_models/runs/detect/yolov8n_v8_50e4/weights/best.pt'
model = YOLO(model_path)  

threshold = 0.5

while ret:

    results = model(frame)[0]

    for result in results.boxes.data.tolist():
        x1, y1, x2, y2, score, class_id = result
        print(x1, y1, x2, y2, score, class_id)

        if score > threshold:
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 4)
            cv2.putText(frame, results.names[int(class_id)].upper(), (int(x1), int(y1 - 10)),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 255, 0), 3, cv2.LINE_AA)
    cv2.imshow('Food', frame)
    out.write(frame)
    ret, frame = video.read()
# out.release()