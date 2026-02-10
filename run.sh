#!/bin/bash

# Check if port 8000 is open (skip on Windows or handle differently)
# lsof -ti:8000 | xargs kill -9 2>/dev/null

echo "Starting Alchemy AI Backend & Frontend..."
echo "Open http://localhost:8000 in your browser"
echo "Press Ctrl+C to stop"

# Start the uvicorn server
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
