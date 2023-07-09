# fresh-eye
Fresh Eye: Eat Everything You Buy

Team Members: Rahul Shah, Trang Tran, Kira Sidhu, Carolyn Qi

### Background
According to the [USDA](https://www.ers.usda.gov/webdocs/publications/43833/43679_eib121_summary.pdf?v=3619.3), 31% or 133 billion pound of food gets goes uneated every year. Fresh Eye is focused on combatting this food waste problem by using computer vision processing and AI to provide addiitonal information to users about their groceries. Fresh Eyes will identify when a specific piece of fruit will go bad, acting as a fresh fruit expiration date for users to follow. When the user puts the item in the fridge, Fresh Eye will use OpenCV to identify the specific fruit or vegetable. It will compare it to other photos of the same fruit or vegetable to understand how ripe it is. Then, it will calculate how much longer before the item goes bad. 

The Global Smart Fridge market has been growing at a [16% compound annual growth rate](https://www.researchandmarkets.com/report/smart-refrigerator?utm_source=BW&utm_medium=PressRelease&utm_code=9hkzxj&utm_campaign=1827649+-+Smart+Refrigerators+Global+Market+Report+2023%3a+Dawn+of+the+IoT+at+Home+Spurs+Further+Growth+in+the+Sector&utm_exec=como322prd), and expected to hit $4.56B by 2025. By participating in this growth, Fresh Eye's functionality will become part of more homes and impact more households. Our functionality also rides on the backs of existing smart fridge functionality, which can identify the produce type with computer vision processing. 

### Tech Stack: ML, AI, and IoT
- Python, Flask, Reactjs
- OpenCV
- YOLOv8
- GPT-4 API

### Additional Features:

### Getting Started:
- Clone this repo to your local machine
- In a terminal, run ```flask run```
- In another terminal, run ```yarn start```
- In another terminal, turn on your device camera:
  - Run ```python3 object-recognition.py``` to detect common food items
  - Run ```python3 object-recognition-yolov8.py``` to detect food items with its state of freshness (our current model has been trained on banana data only, more updates to come, stay tuned)
  - Press 'q' to terminate
