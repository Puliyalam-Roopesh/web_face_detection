#!/usr/bin/env python3
import json
import os
import uuid
from http import HTTPStatus
import sys

# Data storage
DATA_DIR = "server/data"
USERS_FILE = os.path.join(DATA_DIR, "users.json")

# Create data directory if it doesn't exist
os.makedirs(DATA_DIR, exist_ok=True)

# Initialize users database
if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, "w") as f:
        json.dump({"users": {}}, f)

def load_users():
    try:
        with open(USERS_FILE, "r") as f:
            return json.load(f)
    except:
        return {"users": {}}

def save_users(data):
    with open(USERS_FILE, "w") as f:
        json.dump(data, f)

def handle_request():
    # Read the request from stdin
    content_length = int(os.environ.get('CONTENT_LENGTH', 0))
    request_body = sys.stdin.read(content_length) if content_length > 0 else ''
    request_path = os.environ.get('PATH_INFO', '')
    request_method = os.environ.get('REQUEST_METHOD', '')

    # Set CORS headers
    print("Status: 200")
    print("Content-Type: application/json")
    print("Access-Control-Allow-Origin: *")
    print("Access-Control-Allow-Methods: GET, POST, OPTIONS")
    print("Access-Control-Allow-Headers: Content-Type")
    print()  # Empty line to separate headers from body

    if request_method == 'OPTIONS':
        return

    if request_method == 'GET' and request_path == '/api/status':
        print(json.dumps({"status": "running"}))
        return

    if request_method == 'POST':
        try:
            data = json.loads(request_body)
            
            if request_path == '/api/register':
                result = register_user(data)
                print(json.dumps(result))
                return
                
            elif request_path == '/api/login':
                result = login_user(data)
                print(json.dumps(result))
                return
                
        except Exception as e:
            print(json.dumps({"error": str(e)}))
            return

    # Default 404 response
    print("Status: 404")
    print()

def register_user(data):
    username = data.get("username")
    face_data = data.get("faceData")
    
    if not username or not face_data:
        return {"success": False, "message": "Username and face data required"}
    
    users_data = load_users()
    
    if username in users_data["users"]:
        return {"success": False, "message": "Username already exists"}
    
    user_id = str(uuid.uuid4())
    users_data["users"][username] = {
        "id": user_id,
        "face_data": face_data,
        "created_at": "2025-01-01T00:00:00Z"
    }
    
    save_users(users_data)
    
    return {
        "success": True, 
        "message": "User registered successfully",
        "user": {
            "id": user_id,
            "username": username
        }
    }

def login_user(data):
    username = data.get("username")
    face_data = data.get("faceData")
    
    if not username or not face_data:
        return {"success": False, "message": "Username and face data required"}
    
    users_data = load_users()
    
    if username not in users_data["users"]:
        return {"success": False, "message": "User not found"}
    
    # In a real system, we would compare facial features
    # For this demo, we'll simulate authentication
    authenticated = username in users_data["users"]
    
    if authenticated:
        return {
            "success": True, 
            "message": "Authentication successful",
            "user": {
                "id": users_data["users"][username]["id"],
                "username": username
            }
        }
    else:
        return {"success": False, "message": "Face recognition failed"}

if __name__ == "__main__":
    handle_request()