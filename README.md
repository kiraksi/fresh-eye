# fresh-eye
Fresh Eye: Eat Everything You Buy

Team Members: Rahul Shah, Trang Tran, Kira Sidhu, Carolyn Qi

## Background

According to the [USDA](https://www.ers.usda.gov/webdocs/publications/43833/43679_eib121_summary.pdf?v=3619.3), 31% or 133 billion pound of food gets goes uneated every year. Fresh Eye is focused on combatting this food waste problem by using computer vision processing and Machine Learning Fine Tuning to provide addiitonal information to users about their groceries. Fresh Eyes will identify when a specific piece of fruit will go bad, acting as a fresh fruit expiration date for users to follow. When the user puts the item in the fridge, Fresh Eye will use OpenCV to identify the specific fruit or vegetable. It will compare it to other photos of the same fruit or vegetable to understand how ripe it is. Then, it will calculate how much longer before the item goes bad. 

The Global Smart Fridge market has been growing at a [16% compound annual growth rate](https://www.researchandmarkets.com/report/smart-refrigerator?utm_source=BW&utm_medium=PressRelease&utm_code=9hkzxj&utm_campaign=1827649+-+Smart+Refrigerators+Global+Market+Report+2023%3a+Dawn+of+the+IoT+at+Home+Spurs+Further+Growth+in+the+Sector&utm_exec=como322prd), and expected to hit $4.56B by 2025. By participating in this growth, Fresh Eye's functionality will become part of more homes and impact more households. Our functionality also rides on the backs of existing smart fridge functionality, which can identify the produce type with computer vision processing. 

##Purpose of Project

Fresh Eyes will combat the global food waste problem by using computer vision processing and Machine Learning Fine Tuning model to provide additional information to customers about their fresh produce and fruit. Provided extra information, customers will be better informed of the status of the produce in their fridge and will be less likely to let food rot. 

Fresh eyes uses [OpenCV](https://opencv.org/), a computer vision library, to take a photo of the produce and identify the type of fruit that it is. In the future, we would like to integrate this with existing smart fridge technology, which includes cameras and food recognition capabilities. Then, we send the same photo, split up into the separate fruits, to ChatGPT4. Using [OpenAI ChatGPT4's](https://openai.com/gpt-4) prompt engineering capabilities and our machine learning fine tuning algorithm, Fresh Eyes then identifies the estimated expiration date based on the current freshness of the produce. Our machine learning fine tuning algorithm is run on hundreds of photos of fruit, tagged with levels of freshness. We have also created a temporary User Experience Interface to display all the food that exists in the fridge. In the future, we would like to integrate this into the existing apps built for smart fridge technology.

##Tech Stacks Used

- OpenCV
- ChatCPT4
- 

##Set-Up

Please install the requirements.txt file and run yarn install and yarn start to view the front end experience.  

##Future Features

- Training our machine learning fine tuning algorithm with additional fruits and vegetables: we would like to upload more tagged photos of more fresh produce so that it can identify the expiration date for a larger variety of fresh produce.
- Label reading capabilities for packaged foods: this will allow users to also be able to 
- Notification features:
- Advanced food placement recommendations:
- Syncing multiple cameras:
- Integrate with existing smart fridge technology:
- End of year produce summary:
- Cellphone camera imaging:
