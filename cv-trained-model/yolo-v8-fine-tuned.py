from ultralytics import YOLO
from PIL import Image

model = YOLO('yolov8n.pt')

results = model.train(
    data='../datasets/data.yaml',
    imgsz=1280,
    epochs=50,
    batch=8,
    name='yolov8n_v8_50e'
)

# !yolo task=detect \
    # mode=predict \
    # model=/content/runs/detect/yolov8n_v8_50e4/weights/best.pt \
    # source=/content/Banana-Ripening-Process-2/valid/images \
    # imgsz=1280 \
    # name=yolov8n_v8_50e_infer1280 \
    # hide_labels=True

im1 = Image.open("/content/test_banana.jpg")
results = model.predict(source=im1, save=True)  # save plotted images
print(results)
