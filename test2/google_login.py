
import os
from flask import Flask, redirect, url_for, session, request, jsonify
from authlib.integrations.flask_client import OAuth
from pymongo import MongoClient
from flask_cors import CORS
import json

app = Flask(__name__)

MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://rahulsonawane280305:duIPNAZpQ9rPC8pC@cluster0.g8seh.mongodb.net/')
client = MongoClient(MONGO_URI)
db = client.test  # Specify your database name here
users_collection = db.users  # Collection for storing user form data

CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Secret key for session management
app.secret_key = os.environ.get("SECRET_KEY") or "random_secret_key"

# OAuth configuration
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id='',  # From client_secret.json
    client_secret='',  # From client_secret.json
    access_token_url='https://oauth2.googleapis.com/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',  # Google's OpenID userinfo endpoint
    client_kwargs={'scope': 'openid profile email'},
    jwks_uri='https://www.googleapis.com/oauth2/v3/certs',  # JWKS URI for Google's public keys
)

# Route to handle Google login
@app.route('/login/google')
def google_login():
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri, prompt = 'select_account')

# OAuth callback route (this is called after authentication)
@app.route('/authorize')
def authorize():
    token = google.authorize_access_token()  # Get the token from Google
    user_info = google.get('https://openidconnect.googleapis.com/v1/userinfo').json()  # Fetch the user's info

    # Storing user's email in the session
    session['email'] = user_info['email']

    # After login, redirect to registration2 page
    return redirect(url_for('registration2'))

# Route for registration page (after login)
@app.route('/registration2')
def registration2():
    return redirect("http://localhost:5173/registration2")

# Logout route to clear session and log out user
@app.route('/logout')
def logout():
    # Clear the session to log out the user
    session.clear()
    return redirect(url_for('google_login'))  # Redirect to login page after logout

@app.route('/api/get-session-email')
def get_session_email():
    # Check if the email is in the session
    print('Session contents:', session)
    if 'email' in session:
        return {'email': session['email']}
    else:
        return {'error': 'No email in session'}, 400

@app.route('/api/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()  # Get the form data sent as JSON from frontend
        print('Form Data Received:', data)
        
        # Save data to MongoDB
        result = users_collection.insert_one(data)  # Insert into users collection
        return jsonify({'status': 'success', 'inserted_id': str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400
    
if __name__ == '__main__':
    app.run(debug=True)
