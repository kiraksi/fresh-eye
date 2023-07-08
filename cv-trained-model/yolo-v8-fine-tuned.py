from ultralytics import YOLO

model = YOLO('yolov8n.pt')

results = model.train(
    data='../datasets/data.yaml',
    imgsz=1280,
    epochs=1,
    batch=8,
    name='yolov8n_v8_50e'
)