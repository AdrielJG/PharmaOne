from datetime import datetime, timedelta, timezone
import os
from flask import Flask, redirect, url_for, session, request, jsonify, send_from_directory, abort
from authlib.integrations.flask_client import OAuth
from pymongo import MongoClient
from werkzeug.utils import secure_filename
from flask_cors import CORS
from bson.objectid import ObjectId
import logging
import json
import random
import string
from bson import ObjectId
from web3 import Web3
from collections import defaultdict
from web3.exceptions import ContractLogicError


# Connect to Ethereum node (Infura, Ganache, etc.)
web3 = Web3(Web3.HTTPProvider('https://sepolia.infura.io/v3/a3f0233fb3b941399bde2ef6337043b6'))  # Infura node URL

# Smart contract ABI and address
contract_address = '0xC4e39919613863152E6ebe1F81C292aee7277bA2'  # Deployed contract address
with open('MedicineStorageABI.json', 'r') as abi_file:
    contract_data = json.load(abi_file)
    contract_abi = contract_data["abi"]  # "abi" list from the JSON

# Load the smart contract
contract = web3.eth.contract(address=contract_address, abi=contract_abi)

# Wallet credentials
wallet_address = '0xf6781D5aD2650110ee44a37CC7d58A60ac00E4ad'
wallet_private_key = ''  
app = Flask(__name__)

# MongoDB configuration
MONGO_URI = os.getenv('MONGO_URI', '')
client = MongoClient(MONGO_URI)
db = client['test']
users_collection = db['users'] 
newsletter_collection = db['newsletter']
medicines_collection = db['medicinelist']
groups_collection = db['groups']
notifications_collection = db['notification']
feedback_collection = db["feedback"] 
log_collection = db['log']
sales_collection = db["sales"]
requests_collection = db["requests"]
reqtoman_collection = db["reqtoman"]
manoffer_collection = db["manoffer"]
orders_collection = db['orders']  

# Upload folder for documents
UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

PP_FOLDER = 'profile_pic'  # Folder to store profile pictures
ALLOWED_EXTENSIONS = {'pdf','png', 'jpg', 'jpeg'}  # Allowed file extensions
app.config['PP_FOLDER'] = PP_FOLDER

PAYMENT_PROOF = 'payment_proof'
app.config['PAYMENT_PROOF'] = PAYMENT_PROOF

MEMO_FOLDER = "memo"
app.config['MEMO_FOLDER'] = MEMO_FOLDER

INVOICE_FOLDER = 'invoice'
app.config['INVOICE_FOLDER'] = INVOICE_FOLDER
# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Secret key for session management
app.secret_key = os.environ.get("SECRET_KEY") or "random_secret_key"

# OAuth configuration
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id='',
    client_secret='',
    access_token_url='https://oauth2.googleapis.com/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    client_kwargs={'scope': 'openid profile email'},
    jwks_uri='https://www.googleapis.com/oauth2/v3/certs',
)

def log_action(user, action, details, ip_address):
    log_entry = {
        "Date": datetime.utcnow(),  # Use UTC time
        "User": user,
        "Action": action,
        "Details": details,
        "IP Address": ip_address
    }
    log_collection.insert_one(log_entry)

# Helper function to convert MongoDB documents to JSON serializable format
def json_converter(doc):
    doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
    return doc

# Ensure the upload folder exists
if not os.path.exists(PP_FOLDER):
    os.makedirs(PP_FOLDER)

# Helper function to check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to handle profile picture upload
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to handle profile picture upload
@app.route('/api/users/upload-profile-pic', methods=['POST'])
def upload_profile_pic():
    if 'profilePic' not in request.files:
        return jsonify({'message': 'No file uploaded'}), 400

    file = request.files['profilePic']
    email = request.form.get('email')

    if not email:
        return jsonify({'message': 'Email is required'}), 400
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if not allowed_file(file.filename):
        return jsonify({'message': 'File type not allowed'}), 400

    # Generate a secure filename using the user's email
    filename = secure_filename(email) + os.path.splitext(file.filename)[1]
    file_path = os.path.join(app.config['PP_FOLDER'], filename)

    # Save the file
    file.save(file_path)

    # File URL to be stored in the database
    file_url = f"/profile_pic/{filename}"

    # Update the user's profile_pic field in MongoDB
    users_collection.update_one(
        {'email': email},
        {'$set': {'profile_pic': file_url}},  # Update or create the profile_pic field
        upsert=True  # Create the user document if it doesn't exist
    )

    return jsonify({'profilePic': file_url}), 200

@app.route('/api/uploadPaymentProof', methods=['POST'])
def upload_payment_proof():
    # Check if the request contains a file
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    offer_id = request.form.get('offer_id')

    # Validate file and offer_id
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if not offer_id:
        return jsonify({"error": "Missing offer_id"}), 400

    # Check if the file is allowed
    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed. Only images (png, jpg, jpeg, gif) are accepted."}), 400

    # Secure the filename and save it with offer_id as the name
    file_extension = file.filename.rsplit('.', 1)[1].lower()
    new_filename = f"{offer_id}.{file_extension}"
    file_path = os.path.join(app.config['PAYMENT_PROOF'], new_filename)

    try:
        # Save the file
        file.save(file_path)

        # Update the status of the record in the manoffer collection to 3
        result = manoffer_collection.update_one(
            {"_id": offer_id},  # Assuming offer_id is the _id of the record
            {"$set": {"status": 3}}  # Set the status to 3
        )

        if result.matched_count == 0:
            return jsonify({"error": "No record found with the given offer_id"}), 404

        return jsonify({"message": "File uploaded successfully and status updated", "file_path": file_path}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to save file or update status: {str(e)}"}), 500


@app.route('/api/saveInvoice', methods=['POST'])
def save_invoice():
    """Endpoint to save the invoice, update blockchain inventory, and store order details."""
    if 'invoice' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['invoice']
    data = request.form  # Additional data sent from the client
    orderid = data.get('orderid')

    print("Received form data:", data)  # Debug log
    print("Received file:", file.filename if file else "No file received")  # Debug log

    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400

    if file and allowed_file(file.filename):
        try:
            # Check if order already exists
            existing_order = orders_collection.find_one({'orderid': orderid})
            if existing_order:
                return jsonify({
                    'message': 'Order with the same orderid already exists. No action taken.',
                    'file_path': None,
                    'order_id': str(existing_order['_id'])
                }), 200

            # Create the invoice directory if it doesn't exist
            os.makedirs(app.config['INVOICE_FOLDER'], exist_ok=True)

            # Secure the filename and save it
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['INVOICE_FOLDER'], filename)
            file.save(file_path)

            # Fetch manufacturer and pharmacy details
            manufacturer_name = data.get('manufacturer_name')
            pharmacy_name = data.get('pharmacy_name')
            medicine_name = data.get('medicine_name')
            quantity = int(data.get('quantity'))  # Convert to integer

            manufacturer = users_collection.find_one({'name': manufacturer_name})
            pharmacy = users_collection.find_one({'name': pharmacy_name})

            if not manufacturer or not pharmacy:
                return jsonify({'error': 'Manufacturer or pharmacy not found'}), 404

            manufacturer_email = manufacturer.get("email")
            pharmacy_email = pharmacy.get("email")

            # 🔹 **Step 1: Deduct quantity from Manufacturer's Blockchain Inventory**
            try:
                # Fetch medicine details from the blockchain
                manufacturer_medicine = contract.functions.getMedicineByEmailAndName(
                    manufacturer_email, medicine_name
                ).call()

                print("Manufacturer medicine data:", manufacturer_medicine)  # Debug log
                print("Length of manufacturer_medicine:", len(manufacturer_medicine))  # Debug log
                print("Type of manufacturer_medicine:", type(manufacturer_medicine))  # Debug log

                # Ensure the returned data has the expected length
                if len(manufacturer_medicine) != 6:
                    return jsonify({'error': 'Invalid medicine data returned from blockchain'}), 500

                # Unpack the returned data
                med_id, med_group, med_quantity, usage, side_effects, added_at = manufacturer_medicine

                # Debug log for unpacked data
                print("Unpacked data:", med_id, med_group, med_quantity, usage, side_effects, added_at)

                # Check if the manufacturer has sufficient stock
                if med_quantity < quantity:
                    return jsonify({'error': 'Insufficient medicine stock in manufacturer inventory'}), 400

                new_manufacturer_quantity = med_quantity - quantity

                # Debug log for med_id and new_manufacturer_quantity
                print("med_id:", med_id, "Type:", type(med_id))
                print("new_manufacturer_quantity:", new_manufacturer_quantity, "Type:", type(new_manufacturer_quantity))

                # Debug log before calling updateMedicineQuantity
                print("Calling updateMedicineQuantity with med_id:", med_id, "and new_quantity:", new_manufacturer_quantity)

                # Get the current gas price and nonce
                gas_price = web3.eth.gas_price
                nonce = web3.eth.get_transaction_count(wallet_address)

                # Build the transaction
                txn = contract.functions.updateMedicineQuantity(
                    med_id,  # Pass medicine_id as a string
                    new_manufacturer_quantity  # Pass the new quantity
                ).build_transaction({
                    'chainId': 11155111,  # Replace with your chain ID
                    'gas': 2000000,  # Adjust gas limit as needed
                    'gasPrice': gas_price,
                    'nonce': nonce
                })

                # Sign and send the transaction
                signed_txn = web3.eth.account.sign_transaction(txn, private_key=wallet_private_key)
                
                # Use the correct attribute based on web3.py version
                if hasattr(signed_txn, 'rawTransaction'):  # For web3.py 5.x
                    tx_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
                elif hasattr(signed_txn, 'raw_transaction'):  # For web3.py 6.x
                    tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)
                else:
                    raise AttributeError("SignedTransaction object has no attribute 'rawTransaction' or 'raw_transaction'")

                # Wait for the transaction to be mined
                tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
                print("Transaction receipt:", tx_receipt)

            except ContractLogicError as e:
                print(f"Blockchain revert: {str(e)}")
                return jsonify({'error': f'Blockchain revert: {str(e)}'}), 400
            except ValueError as e:
                print(f"ValueError: {str(e)}")
                return jsonify({'error': f'ValueError: {str(e)}'}), 400
            except Exception as e:
                print(f"Unexpected error: {str(e)}")
                return jsonify({'error': f'Unexpected error: {str(e)}'}), 500
            
            # Add medicine details to MongoDB
            medicine_data = {
                'medicine_name': medicine_name,
                'medicine_id': med_id,
                'medicine_group': med_group,
                'quantity': quantity,
                'usage_instructions': usage,
                'side_effects': side_effects,
                'added_by': pharmacy_email,
                'added_at': datetime.utcnow()
            }
            medicines_collection.insert_one(medicine_data)
            print("Medicine added to MongoDB:", medicine_data)

            # 🔹 **Step 2: Add/Update Medicine in Pharmacy's Blockchain Inventory**
            try:
                # Fetch medicine details from the blockchain for the pharmacy
                pharmacy_medicine = contract.functions.getMedicineByEmailAndName(
                    pharmacy_email, medicine_name
                ).call()

                print("Pharmacy medicine data:", pharmacy_medicine)  # Debug log

                # Define the default values for "medicine not found"
                default_values = ("", "", 0, "", "", 0)

                print(medicine_name, med_id, med_group, quantity, usage, side_effects, pharmacy_email)

                # Check if the returned data matches the default values
                if pharmacy_medicine == default_values:  # Medicine does not exist, add new entry
                    # Build the transaction to add the medicine
                    txn = contract.functions.addMedicine(
                        medicine_name,  # Pass medicine_name
                        med_id,  # Pass medicine_id
                        med_group,  # Pass medicine_group
                        quantity,  # Pass quantity
                        usage,  # Pass usage instructions
                        side_effects,  # Pass side effects
                        pharmacy_email  # Pass pharmacy_email
                    ).build_transaction({
                        'chainId': 11155111,  # Replace with your chain ID
                        'gas': 2000000,  # Adjust gas limit as needed
                        'gasPrice': web3.eth.gas_price,
                        'nonce': web3.eth.get_transaction_count(wallet_address)
                    })

                    # Sign and send the transaction
                    signed_txn = web3.eth.account.sign_transaction(txn, private_key=wallet_private_key)
                    if hasattr(signed_txn, 'rawTransaction'):  # For web3.py 5.x
                        tx_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
                    elif hasattr(signed_txn, 'raw_transaction'):  # For web3.py 6.x
                        tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)
                    else:
                        raise AttributeError("SignedTransaction object has no attribute 'rawTransaction' or 'raw_transaction'")
                    
                    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash, timeout=300)
                    print("Transaction receipt (addMedicine):", tx_receipt)

                    

                else:  # Medicine exists, update quantity
                    pharmacy_med_id, _, pharmacy_med_quantity, _, _, _ = pharmacy_medicine
                    new_pharmacy_quantity = pharmacy_med_quantity + quantity

                    # Build the transaction to update the quantity
                    txn = contract.functions.updateMedicineQuantity(
                        pharmacy_med_id,  # Pass medicine_id as a string
                        new_pharmacy_quantity  # Pass the new quantity
                    ).build_transaction({
                        'chainId': 11155111,  # Replace with your chain ID
                        'gas': 2000000,  # Adjust gas limit as needed
                        'gasPrice': web3.eth.gas_price,
                        'nonce': web3.eth.get_transaction_count(wallet_address)
                    })

                    # Sign and send the transaction
                    signed_txn = web3.eth.account.sign_transaction(txn, private_key=wallet_private_key)
                    if hasattr(signed_txn, 'rawTransaction'):  # For web3.py 5.x
                        tx_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
                    elif hasattr(signed_txn, 'raw_transaction'):  # For web3.py 6.x
                        tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)
                    else:
                        raise AttributeError("SignedTransaction object has no attribute 'rawTransaction' or 'raw_transaction'")
                    
                    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
                    print("Transaction receipt (addMedicine):", tx_receipt)

                    # Update medicine quantity in MongoDB
                    medicines_collection.update_one(
                        {'medicine_id': med_id, 'pharmacy_email': pharmacy_email},
                        {'$set': {'quantity': new_pharmacy_quantity}}
                    )
                    print("Medicine quantity updated in MongoDB:", med_id, new_pharmacy_quantity)

            except Exception as e:
                print(f"Blockchain error while adding/updating pharmacy stock: {str(e)}")
                return jsonify({'error': f'Blockchain error while adding/updating pharmacy stock: {str(e)}'}), 500
            
            # 🔹 **Step 3: Save Order in Database**
            order_data = {
                'orderid': orderid,
                'invoice_file': filename,
                'file_path': file_path,
                'manufacturer_name': manufacturer_name,
                'manufacturer_address': manufacturer.get('address'),
                'pharmacy_name': pharmacy_name,
                'pharmacy_address': pharmacy.get('address'),
                'medicine_name': medicine_name,
                'quantity': quantity,
                'quotation': data.get('quotation'),
                'shipping_date': datetime.strptime(data.get('shipping_date'), '%a, %d %b %Y %H:%M:%S %Z'),
                'created_at': datetime.utcnow()
            }

            result = orders_collection.insert_one(order_data)

            # Update manufacturer offer status
            result2 = manoffer_collection.update_one(
                {"_id": orderid},
                {"$set": {"status": 5}}
            )

            if result2.matched_count == 0:
                return jsonify({"error": "No record found with the given offer_id"}), 404

            return jsonify({
                'message': 'File saved, blockchain updated, and order details added successfully',
                'file_path': file_path,
                'order_id': str(result.inserted_id),
                'txn_hash': tx_hash.hex()
            }), 200

        except Exception as e:
            print("Error:", str(e))  # Debug log
            return jsonify({'error': f'An error occurred: {str(e)}'}), 500

    return jsonify({'error': 'File type not allowed. Only PDF files are accepted.'}), 400

# Route to serve profile pictures
@app.route('/profile_pic/<filename>')
def serve_profile_pic(filename):
    return send_from_directory(app.config['PP_FOLDER'], filename)

@app.route('/api/auth/user', methods=['GET'])
def user_auth():
    if 'email' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    
    email = session['email']
    user = db.users.find_one({"email": email})

    print(user)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({
        "email": user.get("email"),
        "role": user.get("account_type")
    })

@app.route('/api/audit-logs', methods=['GET'])
def get_audit_logs():
    try:
        # Fetch audit logs from the MongoDB collection
        logs = log_collection.find()  # This retrieves all documents
        logs_list = [json_converter(log) for log in logs]
        
        return jsonify(logs_list), 200

    except Exception as e:
        print("Error fetching logs:", e)
        return jsonify({"error": "Failed to fetch audit logs"}), 500

@app.route('/api/user-stats', methods=['GET'])
def user_stats():
    try:
        one_week_ago = datetime.utcnow() - timedelta(days=7)

        # Fetch all users and log entries for recent logins
        all_users = users_collection.find()
        total_users = 0
        active_emails = set()

        # Track active users based on recent logins
        recent_logins = log_collection.find({"Date": {"$gte": one_week_ago}})
        for log in recent_logins:
            active_emails.add(log["User"])

        # Count total and active users
        active_users = 0
        inactive_users = 0

        # Iterate through all users and categorize them as active or inactive
        for user in all_users:
            total_users += 1
            if user.get("email") in active_emails:
                active_users += 1

        inactive_users = total_users - active_users

        # Construct the response with the data
        response = {
            "activeUsers": active_users,
            "inactiveUsers": inactive_users,
            "totalUsers": total_users
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def find_user_by_email(email):
    if not email:
        return None
    
    # Assuming `db.users` is your MongoDB collection
    user = db.users.find_one({'email': email})
    return user

# Get user profile based on session email
@app.route('/api/users/profile', methods=['GET'])
def get_user_profile():
    print("Received request to fetch user profile")

    email = session['email']
    print(f"Session email: {email}")

    if not email:
        print("No session email found")
        return jsonify({'message': 'Unauthorized: No session email found'}), 401

    user = find_user_by_email(email)

    if not user:
        print(f"User with email {email} not found")
        return jsonify({'message': 'User not found'}), 404

    # Convert ObjectId to string for JSON serialization
    user['_id'] = str(user['_id'])

    # Initialize missing fields
    fields = ['name', 'phone', 'address', 'account_type', 'password']
    for field in fields:
        if field not in user:
            user[field] = None

    return jsonify(user), 200


# Update or add fields to the user profile
@app.route('/api/users/profile', methods=['POST'])
def update_user_profile():
    print("Received request to update user profile")

    # Get the email from the session (assuming the session has been set earlier)
    email = session.get('email')
    print(f"Session email: {email}")

    if not email:
        print("No session email found")
        return jsonify({'message': 'Unauthorized: No session email found'}), 401

    # Retrieve the user's record from the database using the email
    user = find_user_by_email(email)
    print(f"Fetched user: {user}")

    if not user:
        print(f"User with email {email} not found")
        return jsonify({'message': 'User not found'}), 404

    # Get the data to update from the request body
    update_data = request.json
    print(f"Update data received: {update_data}")

    # Prevent updating restricted fields
    restricted_fields = ['email', 'account_type']
    for field in restricted_fields:
        if field in update_data:
            print(f"Attempt to update restricted field: {field}")
            return jsonify({'message': f'Cannot update {field}'}), 400

    # Add or update fields in the user document
    for key, value in update_data.items():
        user[key] = value  # Add new field or update existing field
        print(f"Set field {key} to value {value}")

    # Update the document in the database
    result = db.users.update_one({'email': email}, {'$set': user})
    if result.modified_count > 0 or result.upserted_id:
        print(f"User profile updated successfully for email: {email}")
        return jsonify({'message': 'Profile updated successfully'}), 200
    else:
        print(f"No changes made for user with email {email}")
        return jsonify({'message': 'No changes made to profile'}), 400

@app.route('/api/get-all-inventory', methods=['GET'])
def get_all_inventory():
    try:
        # Fetch all inventory items from the database
        inventory_items = list(medicines_collection.find({}, {"_id": 0}))

        # Return the inventory items as a JSON response
        return jsonify({"inventory": inventory_items}), 200
    except Exception as e:
        return jsonify({"error": "An error occurred while fetching all inventory"}), 500
    

@app.route('/api/get-requests', methods=['GET'])
def get_requests():
    try:
        # Fetch all inventory items from the database
        inventory_items = list(requests_collection.find({}, {"_id": 0}))

        # Return the inventory items as a JSON response
        return jsonify({"inventory": inventory_items}), 200
    except Exception as e:
        return jsonify({"error": "An error occurred while fetching all inventory"}), 500
    
@app.route("/api/reqtoman", methods=["POST"])
def add_request_to_manufacturers():
    try:
        data = request.json
        print("Received payload:", data)  # Debugging log

        # Insert the data into reqtoman collection
        reqtoman_collection.insert_one(data)

        # Process manufacturers and create documents in manoffer_collection
        manoffer_docs = []
        for manufacturer in data["manufacturers"]:
            manoffer_docs.append({
                "_id": f"{manufacturer['name'].replace(' ', '_')}___{data['medicineID']}",
                "name": manufacturer["name"],
                "pharmacy_name": data["clientName"],
                "medicine_name": data["medicineName"],
                "medicine_group": data["medicineGroup"],
                "quantity": manufacturer["quantity"],
                "status": 0,  # Default status
                "delivery_date": None,
                "quotation": None
            })
        print("manoffer docs: ", manoffer_docs, " \n\n")
        # Insert all manufacturer offers at once
        if manoffer_docs:
            manoffer_collection.insert_many(manoffer_docs)

        db.requests.update_one(
            {"orderid": data['medicineID']},  # Use order-id for lookup
            {"$set": {"Status": 1}}
        )

        return jsonify({
            "message": "Request successfully added to both collections",
        }), 201

    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Print full error message
        return jsonify({"error": str(e)}), 500  # Return actual error message
    
# Normal Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    ip_address = request.remote_addr

    session['email'] = email
    print(email)

    user = users_collection.find_one({'email': email, 'password': password})
    
    if user:
        verified_state = user.get('verified', 0)  

        if verified_state == 0:
            log_action(email, "Login Failed", "Verification pending", ip_address)
            return jsonify({
                'message': 'Account not yet verified. Please wait.',
                'status': 'verification_pending'
            }), 403

        if verified_state == 2:
            log_action(email, "Login Failed", "Account rejected", ip_address)
            return jsonify({
                'message': 'Your account has been rejected.',
                'status': 'rejected'
            }), 403

        account_type = user.get('account_type')
        session['account_type'] = account_type

        dashboard_routes = {
            'manufacturer': "http://localhost:5173/dashboard",
            'distributor': "http://localhost:5173/dashboardD",
            'regulator': "http://localhost:5173/dashboardR",
            'pharmacy': "http://localhost:5173/dashboardP",
            'admin': "http://localhost:5173/dashboardA"
        }

        log_action(email, "Login Successful", "Normal login", ip_address)
        return jsonify({
            'message': 'Login successful',
            'dashboard': dashboard_routes.get(account_type)
        }), 200
    
    else:
        log_action(email, "Login Failed", "Invalid email or password", ip_address)
        return jsonify({'message': 'Invalid email or password'}), 401
    
@app.route("/api/usersmail", methods=["GET"])
def get_user_by_email():
    """Fetch user details by email."""
    email = request.args.get("email")
    if not email:
        return jsonify({"error": "Email parameter is required"}), 400

    user = users_collection.find_one({"email": email}, {"_id": 0, "name": 1})
    if user:
        return jsonify({"name": user.get("name")})
    else:
        return jsonify({"error": "User not found"}), 404

# Route to handle Google login
@app.route('/login/google')
def google_login():
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri, prompt = 'select_account')

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    # Validate input
    if not data.get('firstName') or not data.get('lastName') or not data.get('email') or not data.get('message'):
        return jsonify({"error": "All fields are required"}), 400

    # Save feedback to MongoDB
    feedback_entry = {
        "firstName": data['firstName'],
        "lastName": data['lastName'],
        "email": data['email'],
        "message": data['message']
    }
    feedback_collection.insert_one(feedback_entry)

    return jsonify({"message": "Feedback submitted successfully"}), 201

@app.route('/api/feedback', methods=['GET'])
def get_feedback():
    feedbacks = list(feedback_collection.find({}, {"_id": 0}))  # Exclude the MongoDB ObjectId in the response
    return jsonify(feedbacks), 200

# OAuth callback route (called after authentication)
# Google Login
@app.route('/authorize')
def authorize():
    token = google.authorize_access_token()  
    user_info = google.get('https://openidconnect.googleapis.com/v1/userinfo').json()  
    email = user_info['email']
    ip_address = request.remote_addr

    session['email'] = email

    user = users_collection.find_one({'email': email})

    if user:
        account_type = user.get('account_type')
        session['account_type'] = account_type

        dashboard_routes = {
            'manufacturer': "http://localhost:5173/dashboard",
            'distributor': "http://localhost:5173/dashboardD",
            'regulator': "http://localhost:5173/dashboardR",
            'pharmacy': "http://localhost:5173/dashboardP",
            'admin': "http://localhost:5173/dashboardA"
        }

        log_action(email, "Login Successful", "Google login", ip_address)
        if account_type in dashboard_routes:
            return redirect(dashboard_routes[account_type])
        else:
            log_action(email, "Login Failed", "Unknown account type", ip_address)
            return jsonify({"error": "Unknown account type"}), 400
    else:
        log_action(email, "Login Failed", "User not registered", ip_address)
        return redirect(url_for('registration2'))

# Route for registration page (after login)
@app.route('/registration2')
def registration2():
    return redirect("http://localhost:5173/registration2")

# Logout route to clear session and log out user
@app.route('/api/logout', methods=['POST'])
def logout():
    print("Session data:", session)
    ip_address = request.remote_addr
    email = session['email']
    session.clear()  # Clears all session data
    log_action(email, "Logout", "User logged out", ip_address)
    return jsonify({'message': 'Logged out successfully', 'redirect_url': 'http://localhost:5173/login'}), 200


# API to get the email from the session
@app.route('/api/get-session-email')
def get_session_email():
    if 'email' in session:
        return {'email': session['email']}
    else:
        return {'error': 'No email in session'}, 400

# API to handle user registration and document upload
@app.route('/api/register', methods=['POST'])
def register():
    try:
        account_type = request.form.get('accountType')
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')

        document1 = request.files.get('document1')
        document2 = request.files.get('document2')

        if document1:
            original_filename = secure_filename(document1.filename)
            truncated_name = original_filename[:50]  # Limit the base name to 50 characters
            document1_filename = truncated_name
            document1.save(os.path.join(app.config['UPLOAD_FOLDER'], document1_filename))
        if document2:
            original_filename = secure_filename(document2.filename)
            truncated_name = original_filename[:50]
            document2_filename = truncated_name
            document2.save(os.path.join(app.config['UPLOAD_FOLDER'], document2_filename))

        user_data = {
            'account_type': account_type,
            'name': name,
            'email': email,
            'password': password,
            'document1': document1_filename if document1 else None,
            'document2': document2_filename if document2 else None,
            'verified' : 0
        }
        users_collection.insert_one(user_data)

        return jsonify({'message': 'User registered successfully!', 'status': 'success'}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400
    
# Convert ObjectId to string for JSON serialization
def object_id_to_str(obj):
    return str(obj) if isinstance(obj, ObjectId) else obj

# Route to fetch all sales data
@app.route('/api/sales', methods=['GET'])
def get_sales_data():
    sales_data = sales_collection.find()  # Fetch all sales from MongoDB
    sales_list = []

    for sale in sales_data:
        sale['_id'] = object_id_to_str(sale['_id'])  # Convert ObjectId to string
        sales_list.append(sale)

    return jsonify(sales_list)

@app.route('/api/requests', methods=['GET'])
def get_user_requests():
    # Check if user email is stored in session
    user_email = session.get("email")
    if not user_email:
        return jsonify({"error": "User not logged in"}), 401

    try:
        # Fetch requests for the logged-in user
        user_requests = list(db.requests.find({"Client": user_email}, {"_id": 0}))  # Exclude _id field

        return jsonify(user_requests)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get offers from manufacturer
@app.route('/api/getOfferDetails', methods=['GET'])
def get_offer_details():
    try:
        orderid = request.args.get('orderid')
        print(orderid)
        if not orderid:
            return jsonify({"message": "Missing order ID"}), 400

        # Find matching documents where _id contains the given orderid and status is 1
        offer_details = list(manoffer_collection.find(
            {"_id": {"$regex": f"___{orderid}$"}, "status": {"$in": [1, 2, 3, 5]}}
        ))        
        print(offer_details)
        if not offer_details:
            return jsonify({"message": "No offers with status 1 found"}), 404

        return jsonify(offer_details), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        # Get the email from the session
        email = session.get('email')
        if not email:
            return jsonify({"error": "User not logged in"}), 401

        # Fetch the user's name from the 'users' collection using the email
        user = db.users.find_one({"email": email})
        if not user:
            return jsonify({"error": "User not found"}), 404

        pharmacy_name = user.get('name')

        # Fetch orders from the 'orders' collection where pharmacy_name matches
        orders = list(db.orders.find({"pharmacy_name": pharmacy_name}))
        for order in orders:
            order['_id'] = str(order['_id'])  # Convert ObjectId to string

        return jsonify(orders), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/manorders', methods=['GET'])
def get_manorders():
    try:
        # Get the email from the session
        email = session.get('email')
        if not email:
            return jsonify({"error": "User not logged in"}), 401

        # Fetch the user's name from the 'users' collection using the email
        user = db.users.find_one({"email": email})
        if not user:
            return jsonify({"error": "User not found"}), 404

        manufacturer_name = user.get('name')

        # Fetch orders from the 'orders' collection where pharmacy_name matches
        orders = list(db.orders.find({"manufacturer_name": manufacturer_name}))
        for order in orders:
            order['_id'] = str(order['_id'])  # Convert ObjectId to string

        return jsonify(orders), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/invoices/<filename>', methods=['GET'])
def download_invoice(filename):
    """
    Serve the invoice file for download.
    """
    try:
        # Check if the file exists in the invoices directory
        if not os.path.exists(os.path.join(INVOICE_FOLDER, filename)):
            abort(404, description="Invoice file not found")

        # Send the file as an attachment to force download
        return send_from_directory(
            directory=INVOICE_FOLDER,
            path=filename,
            as_attachment=True  # Forces the browser to download the file
        )
    except Exception as e:
        # Log the error and return a 500 Internal Server Error
        app.logger.error(f"Error serving file {filename}: {e}")
        abort(500, description="Internal Server Error")
    
@app.route('/api/downloadPaymentProof/<request_id>', methods=['GET'])
def download_payment_proof(request_id):
    try:
        # Check for files with allowed extensions
        file_name = None
        for ext in ALLOWED_EXTENSIONS:
            file_path = os.path.join(PAYMENT_PROOF, f"{request_id}.{ext}")
            if os.path.exists(file_path):
                file_name = f"{request_id}.{ext}"
                break

        # If no file is found, return a 404 error
        if not file_name:
            abort(404, description="Payment proof not found")

        # Send the file for download with the correct extension
        return send_from_directory(
            directory=PAYMENT_PROOF,
            path=file_name,
            as_attachment=True,  # Forces the browser to download the file
            download_name=file_name  # Use the original file name with its extension
        )
    except Exception as e:
        # Log the error and return a 500 Internal Server Error
        app.logger.error(f"Error downloading payment proof: {e}")
        abort(500, description="Internal server error")

@app.route("/api/requests/<request_id>", methods=["PUT"])
def update_request_status(request_id):
    try:
        # Validate request_id (ensure it's a valid order-id string)
        if not request_id or len(request_id) != 24:  # Assuming order-id is a 24-character string
            return jsonify({"error": "Invalid request ID"}), 400

        status_data = request.json.get("Status")
        if status_data is None:
            return jsonify({"error": "Invalid data"}), 400

        # Update the request status using order-id
        result = db.requests.update_one(
            {"order-id": request_id},  # Use order-id for lookup
            {"$set": {"Status": status_data}}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Request not found"}), 404

        return jsonify({"message": "Status updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/update-status-cancel', methods=['POST'])
def update_status_cancel():
    data = request.json
    offer_name = data.get("offer_name")
    offer_id = data.get("offer_id")  # Use offer_id directly
    print(offer_id)

    if not offer_name or not offer_id:
        return jsonify({"error": "Missing offer_name or offer_id"}), 400

    # Find the document in manoffer_collection using offer_id directly
    manoffer_item = manoffer_collection.find_one({"_id": offer_id, "status": 2})

    if not manoffer_item:
        return jsonify({"message": "Order not found or status is not 2"}), 404

    # Update manoffer_collection: Set status to 0
    manoffer_collection.update_one(
        {"_id": offer_id},
        {"$set": {"status": 0}}
    )

    # Strip the order_id up to the third underscore
    # Example: "Adriel___ORD7178" → "ORD7178"
    stripped_order_id = offer_id.split("___")[-1]

    # Find all records in manoffer_collection that contain the stripped_order_id in their _id
    all_manoffer_records = manoffer_collection.find({
        "_id": {"$regex": f"___{stripped_order_id}$"}
    })

    # Check if all records have status == 0
    all_status_zero = all(record["status"] == 0 for record in all_manoffer_records)
    all_status_two = all(record["status"] == 2 for record in all_manoffer_records)

    # Update requests_collection only if all records in manoffer_collection have status == 0
    if all_status_zero:
        requests_collection.update_one(
            {"orderid": stripped_order_id},
            {"$set": {"Status": 1}}
        )
    
    if not all_status_two:
        requests_collection.update_one(
            {"orderid": stripped_order_id},
            {"$set": {"Status": 2}}
        )
    
    return jsonify({"message": "Status updated successfully"}), 200

@app.route("/api/update_manoffer_status/<request_id>", methods=["PUT"])
def update_manoffer_status(request_id):
    try:

        # Get status from request
        status_data = request.json.get("status")
        if status_data is None:
            return jsonify({"error": "Invalid data"}), 400

        # Update the request status using _id
        result = manoffer_collection.update_one(
            {"_id": request_id},
            {"$set": {"status": status_data}}
        )

        print(request_id)

        if result.matched_count == 0:
            return jsonify({"error": "Offer not found"}), 404

        return jsonify({"message": "Status updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Generate a random order ID
def generate_order_id():
    return "ORD" + ''.join(random.choices(string.digits, k=4))

# Ensure the order ID is unique by checking the database
def get_unique_order_id():
    while True:
        order_id = generate_order_id()
        if not db.requests.find_one({"order-id": order_id}):
            return order_id

@app.route('/api/order-medicine', methods=['POST'])
def place_order():
    data = request.get_json()

    # Check if data is a list (multiple orders)
    if not isinstance(data, list):
        return jsonify({"message": "Expected a list of orders."}), 400

    client = session.get("email")
    if not client:
        return jsonify({"message": "Client not authenticated."}), 401

    orders = []
    for order_data in data:
        # Extract data for each medicine order
        medicine_name = order_data.get('medicine_name')
        medicine_group = order_data.get('medicine_group')
        quantity = order_data.get('quantity')

        if not medicine_name or not medicine_group or not quantity:
            return jsonify({"message": "All fields are required for each medicine."}), 400

        # Generate a unique order ID for each medicine
        order_id = get_unique_order_id()

        # Create an order record
        order = {
            "orderid": order_id,
            "Quantity": quantity,
            "Client": client,
            "Status": 0,  # Default status is 0
            "MedicineGroup": medicine_group,
            "MedicineName": medicine_name
        }
        orders.append(order)

    try:
        # Insert all orders into the "requests" collection
        db.requests.insert_many(orders)
        return jsonify({"message": "Orders placed successfully!", "order_ids": [order["orderid"] for order in orders]}), 201
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500


# Newsletter route    
@app.route('/api/newsletter/subscribe', methods=['POST'])
def subscribe():
    try:
        email = request.json.get('email')
        print("Received request with email:", email)  

        if not email:
            return jsonify({"message": "Email is required"}), 400

        existing_email = newsletter_collection.find_one({"email": email})
        if existing_email:
            return jsonify({"message": "This email is already subscribed"}), 409

        subscription = {
            "email": email,
            "subscribedAt": datetime.utcnow()
        }
        newsletter_collection.insert_one(subscription)
        return jsonify({"message": "Subscription successful"}), 201

    except Exception as e:
        print("Error processing request:", e)  
        return jsonify({"message": "An error occurred"}), 500
    
@app.route("/api/get-username", methods=["GET"])
def get_username():
    email = request.args.get("email")
    print(f"Received email: {email}")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = users_collection.find_one({"email": email})
    name = user.get("name")
    print(name)
    if user:
        # Use "name" instead of "username"
        return jsonify({"name": user.get("name", "N/A")})
    else:
        return jsonify({"error": "User not found"}), 404
    
@app.route('/api/getman', methods=['GET'])
def get_manufacturer_offers():
    try:
        user_email = session.get('email')
        if not user_email:
            return jsonify({'message': 'User not logged in'}), 401
        
        # Find the user based on email
        user = users_collection.find_one({"email": user_email}, {"name": 1, "_id": 0})
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        user_name = user.get("name")
        print(f"User Name: {user_name}")

        # Query the manoffer collection to find offers related to the user
        user_offers = list(manoffer_collection.find({"name": user_name}))

        if not user_offers:
            return jsonify({'message': 'No offers found'}), 404

        return jsonify(user_offers), 200

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'message': 'An error occurred while fetching the offers'}), 500

@app.route('/api/makeoffer', methods=['POST']) 
def make_offer():
    try:
        data = request.json
        print("Incoming request data:", data)  # Debugging log

        request_id = data.get("requestId")
        quotation = data.get("quotation")
        shipping_date = data.get("shippingDate")

        # Validate input data
        if not request_id or not quotation or not shipping_date:
            print("Missing required fields")
            return jsonify({"error": "Missing required fields"}), 400

        # Convert shipping_date to a proper date object
        try:
            shipping_date = datetime.strptime(shipping_date, "%Y-%m-%d")
        except ValueError:
            print("Invalid date format")
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400

        # Extract the order ID (removing everything before the 3rd underscore)
        order_id = request_id.split("___")[-1]
        print(f"Extracted Order ID: {order_id}")

        # Update the offer details in manoffer_collection
        offer_update_result = manoffer_collection.update_one(
            {"_id": request_id},  
            {"$set": {"quotation": float(quotation), "delivery_date": shipping_date}}
        )

        print("MongoDB update result:", {
            "matched_count": offer_update_result.matched_count,
            "modified_count": offer_update_result.modified_count,
        })

        if offer_update_result.matched_count == 0:
            print("Request not found in manoffer_collection")
            return jsonify({"error": "Request not found"}), 404

        # Update the status in requests_collection to 2
        status_update_result = requests_collection.update_one(
            {"orderid": order_id},
            {"$set": {"Status": 2}}
        )

        print("Status update result:", {
            "matched_count": status_update_result.matched_count,
            "modified_count": status_update_result.modified_count,
        })

        if status_update_result.matched_count == 0:
            print("Order not found in requests_collection")
            return jsonify({"error": "Order not found"}), 404

        return jsonify({"message": "Offer updated successfully and status changed"}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/mandetail', methods=['GET'])
def get_user():
    try:
        user_email = session.get('email')
        if not user_email:
            return jsonify({'message': 'User not logged in'}), 401
        
        user = db.users.find_one({"email": user_email}, {'_id': 0})
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        return jsonify(user), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/api/get-user-details', methods=['GET'])
def get_user_details():
    if 'email' in session:
        email = session['email']
        user = users_collection.find_one({'email': email})
        if user:
            return jsonify({
                'name': user.get('name'),
                'email': email,
                'account_type': user.get('account_type')
            }), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    else:
        return jsonify({'error': 'No user logged in'}), 401

@app.route('/api/get-manufacturers', methods=['GET'])
def get_manufacturers():
    medicine_name = request.args.get('medicineName')
    if not medicine_name:
        return jsonify({"error": "Medicine name is required"}), 400

    # Fetch all manufacturers from the users collection
    manufacturers = users_collection.find({"account_type": "manufacturer"})
    manufacturer_medicines = []

    for manufacturer in manufacturers:
        added_by_email = manufacturer.get("email")
        if not added_by_email:
            continue

        try:
            # Call the blockchain function
            medicine_data = contract.functions.getMedicineByEmailAndName(added_by_email, medicine_name).call()

            # Filter out empty data
            if not medicine_data or all(x in ("", 0) for x in medicine_data):
                continue

            # Add manufacturer details if valid medicine data is found
            manufacturer_medicines.append({
                "added_by": added_by_email,
                "quantity": medicine_data[2],  # Extracting quantity from blockchain response
                "name": manufacturer.get("name")
            })
        
        except Exception as e:
            print(f"Error fetching from blockchain: {e}")

    if not manufacturer_medicines:
        return jsonify({"error": "No manufacturers found for this medicine"}), 404

    return jsonify(manufacturer_medicines)

# Document verification for admin
@app.route('/api/documents', methods=['GET'])
def get_documents():
    try:
        documents = list(users_collection.find({"verified": 0}, {
            '_id': 0,  
            'name': 1,
            'account_type': 1,
            'document1': 1,
            'document2': 1
        }))
        return jsonify(documents), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update medicine details
@app.route('/api/medicinedetails/<medicine_id>', methods=['PUT'])
def update_medicine_details(medicine_id):
    """
    Updates the details of a specific medicine by its ID.
    """
    if 'email' not in session:
        return jsonify({"message": "User not logged in"}), 401

    try:
        data = request.json  # Get the updated data from the request body

        # Validate the required fields
        update_fields = {
            "medicine_name": data.get("medicine_name"),
            "medicine_group": data.get("medicine_group"),
            "quantity": data.get("quantity"),
            "usage_instructions": data.get("usage_instructions"),
            "side_effects": data.get("side_effects"),
        }

        # Remove fields that are None (not updated)
        update_fields = {k: v for k, v in update_fields.items() if v is not None}

        if not update_fields:
            return jsonify({"message": "No valid fields to update"}), 400

        # Find and update the medicine record
        result = medicines_collection.update_one(
            {"medicine_id": medicine_id, "added_by": session['email']},
            {"$set": update_fields}
        )

        if result.matched_count == 0:
            return jsonify({"message": "Medicine not found or you don't have permission to update"}), 404

        return jsonify({"message": "Medicine updated successfully"}), 200

    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    
@app.route("/api/check_memo/<request_id>", methods=["GET"])
def check_memo(request_id):
    """Check if a memo exists for a given request"""
    memo_path = os.path.join(MEMO_FOLDER, f"memo_{request_id}.pdf")
    exists = os.path.exists(memo_path)
    return jsonify({"exists": exists})
    
@app.route('/api/checkMemo', methods=['GET'])
def check_memo_exists():
    filename = request.args.get('filename', '').strip()  # Remove any accidental spaces
    if not filename:
        return jsonify({"error": "Filename parameter is missing"}), 400

    memo_folder = os.path.join(os.getcwd(), "memo")  # Ensure correct folder
    full_path = os.path.join(memo_folder, f"{filename}.pdf")  # Force `.pdf` extension

    print("\nChecking file existence:")
    print(f"- Current working directory: {os.getcwd()}")
    print(f"- Memo folder absolute path: {memo_folder}")
    print(f"- Full file path being checked: {full_path}")
    print(f"- File exists: {os.path.exists(full_path)}")

    return jsonify({"exists": os.path.exists(full_path)})

@app.route("/memo/<filename>", methods=["GET"])
def download_memo(filename):
    """Endpoint to download memo files."""
    try:
        return send_from_directory(MEMO_FOLDER, filename, as_attachment=True)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404

@app.route('/api/updatestatus', methods=['POST'])
def update_status():
    try:
        data = request.json
        print("Incoming request data:", data)  # Log the incoming request data

        request_id = data.get("requestId")
        status = data.get("status")

        # Validate input data
        if not request_id or status is None:
            print("Missing required fields")
            return jsonify({"error": "Missing required fields"}), 400

        print("Parsed data:", {"requestId": request_id, "status": status})

        # Extract orderid from request_id by splitting up to the third underscore
        orderid = request_id.split('___')[-1]  # Splits on triple underscore and takes the last part
        print("Extracted orderid:", orderid)

        # Fetch the existing status from requests_collection
        existing_record = requests_collection.find_one({"orderid": orderid}, {"status": 1})

        # Update the status in manoffer_collection (Always update, even if requests_collection is 2)
        manoffer_result = manoffer_collection.update_one(
            {"_id": request_id},  # Use the custom ID directly
            {"$set": {"status": status}}
        )

        print("manoffer_collection update result:", {
            "matched_count": manoffer_result.matched_count,
            "modified_count": manoffer_result.modified_count,
        })

        if manoffer_result.matched_count == 0:
            print("Request not found in manoffer_collection")
            return jsonify({"error": "Request not found"}), 404

        # If status in requests_collection is already 2, do nothing and return success
        if existing_record and existing_record.get("status") == 2:
            print("Status is already 2 in requests_collection, skipping update.")
            return jsonify({"message": "Status already set to 2 in requests_collection. manoffer_collection updated successfully."}), 200

        # Update the status in requests_collection only if it's not already 2
        records_result = requests_collection.update_one(
            {"orderid": orderid},  # Match the orderid in requests_collection
            {"$set": {"status": 2}}  # Set the status to 2
        )

        print("requests_collection update result:", {
            "matched_count": records_result.matched_count,
            "modified_count": records_result.modified_count,
        })

        return jsonify({"message": "Status updated successfully in both collections."}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@app.route('/api/saveMemo', methods=['POST'])
def save_memo():
    try:
        # Check if the 'memo' file is in the request
        if 'memo' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        memo_file = request.files['memo']

        # Ensure the file has a valid name
        if memo_file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # Save the file to the 'memos' folder
        file_path = os.path.join('memo', memo_file.filename)
        memo_file.save(file_path)

        return jsonify({"message": "Memo saved successfully", "file_path": file_path}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/acceptOffer", methods=["POST"])
def accept_offer():
    data = request.json
    offer_id = data.get("offer_id")
    order_id = data.get("order_id")

    if not offer_id or not order_id:
        return jsonify({"error": "Missing offer_id or order_id"}), 400

    try:
        # Step 1: Update the status of the accepted offer to 2
        manoffer_collection.update_one(
            {"_id": offer_id},
            {"$set": {"status": 2}}
        )

        # Step 2: Get the stripped_order_id from the offer_id
        stripped_order_id = offer_id.split("___")[1]

        print("stripped: ", stripped_order_id)

        # Step 3: Find all offers with the same stripped_order_id
        all_offers = list(manoffer_collection.find({"_id": {"$regex": f"___{stripped_order_id}$"}}))
        print("All offers: ", all_offers)

        # Step 4: Check if there is only one record with the stripped_order_id
        if len(all_offers) == 1:
            # If only one record exists, update the request status to 3
            requests_collection.update_one(
                {"orderid": order_id},
                {"$set": {"Status": 3}}
            )
        else:
            # If multiple records exist, check if all have status 2
            all_accepted = all(offer["status"] == 2 for offer in all_offers)
            if all_accepted:
                # If all offers are accepted, update the request status to 3
                requests_collection.update_one(
                    {"orderid": order_id},
                    {"$set": {"Status": 3}}
                )

        return jsonify({"message": "Offer accepted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# View Documenrts
@app.route('/uploads/<filename>')
def serve_file(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file_extension = os.path.splitext(filename)[1].lower()
    mime_types = {
        '.pdf': 'application/pdf',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
    }
    mime_type = mime_types.get(file_extension, 'application/octet-stream')

    response = send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    response.headers['Content-Type'] = mime_type
    if mime_type != 'application/octet-stream':  
        response.headers['Content-Disposition'] = 'inline'
    else:  
        response.headers['Content-Disposition'] = f'attachment; filename="{filename}"'

    return response

# Medicine add
@app.route('/api/add-medicine', methods=['POST'])
def add_medicine():
    if 'email' not in session:
        return jsonify({"message": "User not logged in"}), 401

    try:
        data = request.json
        medicine_name = data.get('medicine_name')
        medicine_id = data.get('medicine_id')
        medicine_group = data.get('medicine_group')
        quantity = int(data.get('quantity', 0))  # Ensure quantity is an integer
        usage_instructions = data.get('usage_instructions')
        side_effects = data.get('side_effects')
        user_email = session['email']

        if not all([medicine_name, medicine_id, medicine_group, quantity, usage_instructions]):
            return jsonify({"message": "Missing mandatory fields"}), 400

        # Step 1: Check if the medicine already exists in MongoDB
        existing_medicine = medicines_collection.find_one({
            "medicine_name": medicine_name,
            "added_by": user_email
        })

        if existing_medicine:
            # Update the quantity in MongoDB
            new_quantity = existing_medicine["quantity"] + quantity
            medicines_collection.update_one(
                {"_id": existing_medicine["_id"]},
                {"$set": {"quantity": new_quantity, "added_at": datetime.utcnow()}}
            )
        else:
            # Insert a new document in MongoDB
            medicine_data = {
                "medicine_name": medicine_name,
                "medicine_id": medicine_id,
                "medicine_group": medicine_group,
                "quantity": quantity,
                "usage_instructions": usage_instructions,
                "side_effects": side_effects,
                "added_by": user_email,
                "added_at": datetime.utcnow()
            }
            medicines_collection.insert_one(medicine_data)

        # Step 2: Check if the medicine exists in the blockchain
        try:
            blockchain_medicine = contract.functions.getMedicine(medicine_id).call()
            blockchain_quantity = int(blockchain_medicine[3])  # Assuming quantity is at index 3
        except Exception:
            blockchain_quantity = 0  # Medicine not found in blockchain

        total_quantity = blockchain_quantity + quantity

        # Step 3: Update Blockchain
        nonce = web3.eth.get_transaction_count(wallet_address)
        gas_price = web3.eth.gas_price

        if blockchain_quantity > 0:
            # If the medicine exists in blockchain, update the quantity
            txn = contract.functions.updateMedicineQuantity(
                medicine_id,  # Only pass medicineId
                total_quantity  # Correct parameter order
            ).build_transaction({
                'chainId': 11155111,
                'gas': 2000000,
                'gasPrice': gas_price,
                'nonce': nonce
            })
        else:
            # If not found, add a new medicine entry to the blockchain
            txn = contract.functions.addMedicine(
                medicine_name,
                medicine_id,
                medicine_group,
                quantity,
                usage_instructions,
                side_effects,
                user_email
            ).build_transaction({
                'chainId': 11155111,
                'gas': 2000000,
                'gasPrice': gas_price,
                'nonce': nonce
            })

        # Debugging: Print transaction data
        print("Transaction Data:", txn)

        # Sign and send the transaction
        signed_txn = web3.eth.account.sign_transaction(txn, private_key=wallet_private_key)
        tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)
        tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

        # Debugging: Check transaction status
        if tx_receipt.status == 0:
            return jsonify({"message": "Blockchain transaction failed"}), 500

        # Debugging: Verify blockchain data
        medicine_on_chain = contract.functions.getMedicine(medicine_id).call()
        print("Medicine on Chain:", medicine_on_chain)

        return jsonify({
            "message": "Medicine updated successfully",
            "transaction_hash": tx_hash.hex(),
            "block_number": tx_receipt.blockNumber
        }), 201

    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    
@app.route('/api/get-manufacturer-names', methods=['GET'])
def get_manufacturer_names():
    try:
        # Fetch all users with account_type 'manufacturer'
        manufacturers = list(users_collection.find({"account_type": "manufacturer"}, {"_id": 0}))
        return jsonify({"manufacturers": manufacturers}), 200
    except Exception as e:
        return jsonify({"error": "An error occurred while fetching manufacturers"}), 500

@app.route('/api/get-pharmacie-names', methods=['GET'])
def get_pharmacie_names():
    try:
        # Fetch all users with account_type 'pharmacy'
        pharmacies = list(users_collection.find({"account_type": "pharmacy"}, {"_id": 0}))
        return jsonify({"pharmacies": pharmacies}), 200
    except Exception as e:
        return jsonify({"error": "An error occurred while fetching pharmacies"}), 500

@app.route('/api/get-inventory-details/<email>', methods=['GET'])
def get_inventory_details(email):
    try:
        print(f"Fetching inventory for email: {email}")  # Debugging

        inventory_items = list(medicines_collection.find({"added_by": email}, {"_id": 0, "medicine_name": 1, "quantity": 1}))

        if not inventory_items:
            print("No inventory found for this email.")

        # Sum quantities for medicines with the same name
        inventory_summed = defaultdict(int)
        for item in inventory_items:
            try:
                inventory_summed[item['medicine_name']] += int(item['quantity'])  # Ensure integer conversion
            except ValueError:
                print(f"Invalid quantity for {item['medicine_name']}: {item['quantity']}")  # Debugging
                continue  # Skip invalid values

        # Convert back to list format
        inventory_summed_list = [{"medicine_name": name, "quantity": qty} for name, qty in inventory_summed.items()]

        return jsonify({"inventory": inventory_summed_list}), 200
    except Exception as e:
        print(f"Error fetching inventory: {str(e)}")  # Debugging
        return jsonify({"error": str(e)}), 500  # Return actual error message for debugging


# inventory list
@app.route('/api/get-inventory', methods=['GET'])
def get_inventory():
    if 'email' not in session:
        return jsonify({"error": "User not logged in"}), 401

    try:
        user_email = session['email']
        print(f"User email: {user_email}")  # Debug log

        # Fetch all medicine IDs
        medicine_ids = contract.functions.getAllMedicineIds().call()
        print(f"Medicine IDs fetched: {medicine_ids}")  # Debug log

        user_inventory = []

        # Fetch each medicine by ID
        for medicine_id in medicine_ids:
            medicine = contract.functions.getMedicine(medicine_id).call()
            if medicine[6] == user_email:  # Filter by addedBy
                user_inventory.append({
                    "medicineName": medicine[0],
                    "medicineId": medicine[1],
                    "medicineGroup": medicine[2],
                    "quantity": medicine[3],
                    "usageInstructions": medicine[4],
                    "sideEffects": medicine[5],
                    "addedBy": medicine[6],
                    "addedAt": datetime.utcfromtimestamp(medicine[7]).strftime('%Y-%m-%d %H:%M:%S')
                })

        inventory_count = len(user_inventory)  # Get the count of the inventory
        print("Medicine count: ", inventory_count)
        print(f"User inventory: {user_inventory}")
        return jsonify({"inventory": user_inventory, "count": inventory_count}), 200
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

# All inventory count
@app.route('/api/get-inventory-all', methods=['GET'])
def get_inventory_all():
    if 'email' not in session:
        return jsonify({"error": "User not logged in"}), 401

    try:
        # Fetch all medicine IDs
        medicine_ids = contract.functions.getAllMedicineIds().call()
        
        all_inventory = []
        total_quantity = 0  # Initialize total quantity counter

        # Fetch and process all medicines
        for medicine_id in medicine_ids:
            medicine = contract.functions.getMedicine(medicine_id).call()
            # Add all medicines regardless of owner
            all_inventory.append({
                "medicineName": medicine[0],
                "medicineId": medicine[1],
                "medicineGroup": medicine[2],
                "quantity": medicine[3],
                "usageInstructions": medicine[4],
                "sideEffects": medicine[5],
                "addedBy": medicine[6],
                "addedAt": datetime.utcfromtimestamp(medicine[7]).strftime('%Y-%m-%d %H:%M:%S')
            })
            # Accumulate total quantity
            total_quantity += int(medicine[3])

        print(f"Total inventory items: {len(all_inventory)}")
        print(f"Total quantity across all inventory: {total_quantity}")
        
        return jsonify({
            "inventory": all_inventory,
            "total_quantity": total_quantity,
            "total_items": len(all_inventory)
        }), 200
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/get-pharinventory', methods=['GET'])
def get_pharinventory():
    if 'email' not in session:
        return jsonify({"error": "User not logged in"}), 401

    try:
        user_email = session['email']
        print(f"User email: {user_email}")  # Debug log

        # Fetch medicines added by the user
        user_medicines = list(medicines_collection.find({"added_by": user_email}))

        print(user_medicines)

        # Aggregate quantities of medicines with the same name
        inventory_dict = defaultdict(lambda: {
            "medicineName": None,
            "medicineId": None,
            "medicineGroup": None,
            "quantity": 0,
            "usageInstructions": None,
            "sideEffects": None,
            "addedBy": user_email,
            "addedAt": None
        })

        for medicine in user_medicines:
            medicine_name = medicine.get("medicine_name")
            if medicine_name in inventory_dict:
                inventory_dict[medicine_name]["quantity"] += medicine.get("quantity", 0)
            else:
                inventory_dict[medicine_name].update({
                    "medicineName":(medicine_name),
                    "medicineId": str(medicine.get("medicine_id")),
                    "medicineGroup": medicine.get("medicine_group"),
                    "quantity": medicine.get("quantity", 0),
                    "usageInstructions": medicine.get("usage_instructions"),
                    "sideEffects": medicine.get("side_effects"),
                    "addedAt": medicine.get("added_at", datetime.utcnow()).strftime('%Y-%m-%d %H:%M:%S')
                })

        user_inventory = list(inventory_dict.values())

        inventory_count = len(user_inventory)  # Get the count of the inventory
        print("Medicine count: ", inventory_count)
        print(f"User inventory: {user_inventory}")
        return jsonify({"inventory": user_inventory, "count": inventory_count}), 200

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Pharmacy inventory count
@app.route('/api/get-pharinventory-all', methods=['GET'])
def get_pharinventory_all():
    if 'email' not in session:
        return jsonify({"error": "User not logged in"}), 401

    try:
        # Get all pharmacy emails from users collection
        pharmacy_emails = users_collection.distinct(
            "email", 
            {"account_type": "pharmacy"}
        )

        # Aggregate medicine quantities using MongoDB pipeline
        pipeline = [
            {
                "$match": {
                    "added_by": {"$in": pharmacy_emails}
                }
            },
            {
                "$group": {
                    "_id": "$added_by",
                    "total_quantity": {"$sum": "$quantity"},
                    "medicines": {
                        "$push": {
                            "name": "$medicine_name",
                            "quantity": "$quantity",
                            "group": "$medicine_group"
                        }
                    }
                }
            },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "_id",
                    "foreignField": "email",
                    "as": "pharmacy_info"
                }
            },
            {
                "$unwind": "$pharmacy_info"
            },
            {
                "$project": {
                    "pharmacy_name": "$pharmacy_info.name",
                    "pharmacy_email": "$_id",
                    "total_quantity": 1,
                    "medicines": 1,
                    "_id": 0
                }
            }
        ]

        results = list(medicines_collection.aggregate(pipeline))
        
        return jsonify({"pharmacies": results}), 200

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

# medicine details
@app.route('/api/medicinedetails/<medicine_id>', methods=['GET'])
def medicine_details(medicine_id):
    if 'email' not in session:
        return jsonify({"message": "User not logged in"}), 401

    try:
        # Query for the medicine by its ID
        medicine = medicines_collection.find_one({"medicine_id": medicine_id})

        if not medicine:
            return jsonify({"message": "Medicine not found"}), 404

        # Returning the medicine details
        medicine_details = {
            "medicine_name": medicine.get("medicine_name"),
            "medicine_id": medicine.get("medicine_id"),
            "medicine_group": medicine.get("medicine_group"),
            "quantity": medicine.get("quantity"),
            "usage_instructions": medicine.get("usage_instructions"),
            "side_effects": medicine.get("side_effects"),
            "added_by": medicine.get("added_by"),
            "added_at": medicine.get("added_at"),
        }

        return jsonify(medicine_details), 200

    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500



# verification status
@app.route('/api/update-verification', methods=['POST'])
def update_verification():
    try:
        data = request.json 
        print("Received payload:", data)

        document_name = data.get('document_name')  
        verified = data.get('verified')

        if not document_name or verified not in [1, 2]:
            return jsonify({'error': 'Invalid data'}), 400

        result = users_collection.update_one(
            {'name': document_name},  
            {'$set': {'verified': verified}}
        )

        if result.matched_count == 0:
            return jsonify({'error': 'Document not found'}), 404

        return jsonify({'message': 'Verification status updated successfully'}), 200

    except Exception as e:
        print("Error:", str(e))  # Log errors
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/ban-unban', methods=['POST'])
def ban_unban():
    try:
        data = request.json
        print("Received payload:", data)

        # Extract email and status from the payload
        email = data.get('email')  
        verified = data.get('verified')

        # Validate the input
        if not email or verified not in [0, 1, 2]:  # Ensure valid email and status
            return jsonify({'error': 'Invalid data'}), 400

        # Update the user's verification status in the database
        result = users_collection.update_one(
            {'email': email},  # Match user by email
            {'$set': {'verified': verified}}
        )

        if result.matched_count == 0:
            return jsonify({'error': 'User not found'}), 404

        return jsonify({'message': 'User status updated successfully'}), 200

    except Exception as e:
        print("Error:", str(e))  # Log errors
        return jsonify({'error': str(e)}), 500

# verification status handling 
@app.route('/api/verification-state', methods=['GET'])
def get_verification_state():
    email = session.get('email')
    if not email:
        return jsonify({'message': 'Unauthorized'}), 401

    user = users_collection.find_one({'email': email})  
    if not user:
        return jsonify({'message': 'User not found'}), 404

    return jsonify({'verified': user.get('verified', 0)})

# user details fetch
def decode_bytes(obj):
    for key, value in obj.items():
        if isinstance(value, bytes):
            obj[key] = value.decode('utf-8')  # Convert bytes to string
    return obj

@app.route('/api/users', methods=['GET'])
def get_users():
    print("Request args:", request.args)  # Debugging line
    try:
        verified_users = [decode_bytes(user) for user in users_collection.find({'verified': 1}, {'_id': 0})]
        rejected_users = [decode_bytes(user) for user in users_collection.find({'verified': 2}, {'_id': 0})]
        return jsonify({'verified_users': verified_users, 'rejected_users': rejected_users}), 200
    except Exception as e:
        print("Error in /api/users:", str(e))
        return jsonify({'error': str(e)}), 500

            
# Group create
@app.route('/api/groups', methods=['POST'])
def create_group():
    try:
        # Parse the request data
        data = request.json
        group_name = data.get('name')
        members = data.get('members', [])
        date_created = data.get('date')

        # Generate a custom unique group ID (gid)
        import uuid
        gid = str(uuid.uuid4())  # Generate a unique ID

        # Create the group document with `gid`
        group_doc = {
            'gid': gid,  # Add gid
            'name': group_name,
            'members': members,
            'date-created': date_created
        }

        # Insert the group document into the database
        inserted_id = groups_collection.insert_one(group_doc).inserted_id

        # Convert the `_id` for JSON serialization
        group_doc['_id'] = str(inserted_id)

        # Create a new collection for the group's chats using `gid`
        chat_collection_name = f"group_{gid}"  # Use `gid` as the collection name
        db.create_collection(chat_collection_name)

        return jsonify({'message': 'Group created successfully', 'group': group_doc}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Fetch notifications for the logged-in user
@app.route('/api/notifications', methods=['GET'])
def get_notifications():
    print("Session data:", session)
    user_email = session.get('email')  # Fetch email from session
    if not user_email:
        return jsonify({"error": "Unauthorized: User not logged in"}), 401

    # Query database for notifications belonging to the user
    notifications = list(notifications_collection.find(
        {"user_mail": user_email},
        {"_id": 1, "sender_mail": 1, "message": 1, "date": 1, "time": 1, "status": 1}
    ))
    for notification in notifications:
        notification["_id"] = str(notification["_id"])  # Convert ObjectId to string
    return jsonify(notifications), 200

# Mark a notification as read
@app.route('/api/notifications/<notification_id>', methods=['PATCH'])
def mark_as_read(notification_id):
    try:
        result = notifications_collection.update_one(
            {"_id": ObjectId(notification_id)},
            {"$set": {"status": 1}}
        )
        if result.matched_count == 0:
            return jsonify({"error": "Notification not found"}), 404

        return jsonify({"message": "Notification marked as read"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Route to post a notification
@app.route('/api/notification', methods=['POST'])
def post_notification():
    try:
        data = request.json
        
        # Insert data into the collection
        result = notifications_collection.insert_one(data)
        
        # Add the MongoDB-generated ID to the data (convert ObjectId to string)
        data["_id"] = str(result.inserted_id)
        
        return jsonify({"message": "Notification sent successfully", "notification": data}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# Get group data
@app.route('/api/group/<gid>', methods=['GET'])
def get_group_data(gid):
    try:
        # Fetch group details
        group = groups_collection.find_one({'gid': gid})
        if not group:
            return jsonify({'error': 'Group not found'}), 404
        name = group.get('name')
        date = group.get('date-created')
        members = list(group.get('members'))
        res = []
        for val in members:
            if val != None :
                res.append(val)
        
        print("Filtered: ", res)
        memberslength = len(res)
        print("Name: ", name)
        print("Date: ", date)
        print("Members: ", members)
        print("Total members: ", memberslength)

        # Fetch messages from the chat collection
        chat_collection_name = f"group_{gid}"
        chat_collection = db[chat_collection_name]
        messages = list(chat_collection.find({}, {'_id': 0}))  # Exclude `_id`

        return jsonify({'name': name, 'date': date, 'memberslength': memberslength}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/groups/<gid>/messages', methods=['GET'])
def get_messages(gid):
    """
    Fetch all messages from a group.
    """
    if 'email' not in session:
        return jsonify({"message": "User not logged in"}), 401

    try:
        # Get the collection name for the group
        chat_collection_name = f"group_{gid}"

        # Fetch all messages from the group's chat collection
        messages = list(db[chat_collection_name].find({}, {"_id": 0}))

        return jsonify({"messages": messages}), 200

    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


# Route to send a message in a group
@app.route('/api/groups/<gid>/messages', methods=['POST'])
def send_message(gid):
    """
    Send a message in a group.
    """
    if 'email' not in session:
        return jsonify({"message": "User not logged in"}), 401

    try:
        data = request.json
        message_content = data.get('message')
        timestamp = datetime.utcnow()

        if not message_content:
            return jsonify({"message": "Message content is required"}), 400

        # Retrieve the user's email from the session
        sender_email = session['email']

        # Create the message document
        message_doc = {
            "sender": sender_email,
            "message": message_content,
            "timestamp": timestamp
        }

        # Get the collection name for the group
        chat_collection_name = f"group_{gid}"

        # Insert the message into the group's chat collection
        db[chat_collection_name].insert_one(message_doc)

        return jsonify({"message": "Message sent successfully"}), 201

    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    
@app.route('/api/my-groups', methods=['GET'])
def my_groups():
    # Ensure email exists in the session
    if 'email' not in session:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        # Retrieve email from session
        user_email = session['email']

        # Query the database for groups containing the user
        groups = list(groups_collection.find({"members": user_email}, {"_id": 0}))

        # Return the groups as a JSON response
        return jsonify({"groups": groups}), 200

    except Exception as e:
        # Log the error for debugging (optional)
        app.logger.error(f"Error fetching groups: {e}")

        # Return a user-friendly error response
        return jsonify({"error": "An unexpected error occurred"}), 500

# Total revenue/expenditure    
@app.route('/api/total-transactions', methods=['GET'])
def total_transactions():
    # Fetch email from session
    email = session.get('email')
    if not email:
        return jsonify({"error": "User not logged in"}), 401

    # Fetch user's details from users_collection
    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    user_name = user['name']

    # Pipeline to search across relevant fields and sum quotations
    pipeline = [
        {"$match": {
            "$or": [
                {"manufacturer_name": user_name},
                {"pharmacy_name": user_name}
            ]
        }},
        {"$addFields": {
            "quotation_numeric": {
                "$convert": {
                    "input": "$quotation",
                    "to": "double",
                    "onError": 0.0,  # Handle invalid numbers
                    "onNull": 0.0     # Handle missing values
                }
            }
        }},
        {"$group": {
            "_id": None,
            "total_quotation": {"$sum": "$quotation_numeric"},
            "transaction_count": {"$sum": 1}
        }}
    ]

    try:
        result = list(orders_collection.aggregate(pipeline))
        print(round(result[0]['total_quotation'], 2))
        if result:
            return jsonify({
                "total_quotation": round(result[0]['total_quotation'], 2),
                "transaction_count": result[0]['transaction_count']
            })
        return jsonify({
            "total_quotation": 0,
            "transaction_count": 0
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
@app.route('/api/get-user-role', methods=['GET'])
def get_user_role():
    email = session.get('email')
    if not email:
        return jsonify({"error": "User not logged in"}), 401

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "account_type": user.get('account_type', 'unknown')
    })

if __name__ == '__main__':
    app.run(debug=True)