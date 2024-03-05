# { label: 'Dark Guy', code: 'dark_guy', url: '/images/elements/general/black_boi.png' }
import json
import os

payload = []
for file in os.listdir('./public/images/elements/cod'):
    if file.endswith(".png"):
        label = file
        code = file.replace(" ", "_").lower()
        path = "/images/elements/cod/" + file
        
        payload.append({
            "label": label,
            "code": code,
            "url": path
        })

    
print(json.dumps(payload))