#!/bin/bash

curl -X POST "https://pulseiq-poc.vercel.app/api/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "id": "msg_1",
        "role": "user",
        "message": "recipe for fried chicken"
      }
    ]
  }'
