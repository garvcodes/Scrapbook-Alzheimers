import cv2
import numpy as np
import requests
import io
import json

img_path = "authapp/app/OCR/Images/Alice-In-Wonderland-Book-Page-3-Old-Design-Shop-655x1024.jpg"
img = cv2.imread(img_path)

height, width, _ = img.shape
#cutting the shape to size
roi = img[0: height, 0: width]

#OCR starts
url_api = "https://api.ocr.space/parse/image"

_, compressedImage = cv2.imencode(".jpg", roi, [1, 90])

file_bytes = io.BytesIO(compressedImage)

result = requests.post(url_api, 
            files = {"Part-9.jpg": file_bytes},
            data = {"apikey": "K82460447488957"})

result = result.content.decode()

result = json.loads(result)

text_detected = result.get("ParsedResults")[0].get("ParsedText")


