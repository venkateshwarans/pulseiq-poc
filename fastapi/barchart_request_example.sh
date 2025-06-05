#!/bin/bash

curl -X POST "http://localhost:8000/api/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "id": "msg_1",
        "role": "user",
        "message": "Generate a bar chart showing sales data for different product categories"
      }
    ]
  }'
