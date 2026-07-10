from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient

app = Flask(__name__)
# Enable CORS for all routes and restrict origins
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173", "methods": ["POST", "OPTIONS"], "allow_headers": ["Content-Type"]}})

# MongoDB configuration
client = MongoClient('mongodb+srv://rahulsonawane280305:duIPNAZpQ9rPC8pC@cluster0.g8seh.mongodb.net/')
db = client['test']
users_collection = db['users']

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({'email': email, 'password': password})

    if user:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

if __name__ == '__main__':
    app.run(debug=True)
