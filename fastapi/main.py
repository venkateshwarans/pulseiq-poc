import sys
import os

# Add the api directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'api'))

# Import the app from the api/index.py file
from index import app

# This file is used for local development
# The actual implementation is in api/index.py which is also used for Vercel deployment

# If this script is run directly, start the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)