from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
#Abenezer Erklo(30172289)
#Rodney Del Rosario(30208419)
app = Flask(__name__)
CORS(app)  # Enable CORS for development

# Predefined user credentials
credentials = {
    "alice": "password123",
    "bob": "secure456",
    "charlie": "qwerty789",
    "diana": "hunter2",
    "eve": "passpass",
    "frank": "letmein",
    "grace": "trustno1",
    "heidi": "admin123",
    "ivan": "welcome1",
    "judy": "password1"
}

@app.route('/validate_login', methods=['POST'])
def validate_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username in credentials and credentials[username] == password:
        return jsonify({
            "success": True,
            "message": "Login successful!"
        })
    else:
        return jsonify({
            "success": False,
            "message": "Invalid username or password."
        }), 401

@app.route('/predict_house_price', methods=['POST'])
def predict_house_price():
    # Load the Random Forest model
    try:
        model = joblib.load("./src/random_forest_model.pkl")
    except Exception as e:
        return jsonify({"error": "Model loading failed", "details": str(e)}), 500

    data = request.json

    cats = True if 'pets' in data and data['pets'] else False
    dogs = True if 'pets' in data and data['pets'] else False

    sample_data = [
        data['city'],
        data['province'],
        float(data['latitude']),
        float(data['longitude']),
        data['lease_term'],
        data['type'],
        float(data['beds']),
        float(data['baths']),
        float(data['sq_feet']),
        data['furnishing'],
        data['smoking'],
        cats,
        dogs
    ]
    
    sample_df = pd.DataFrame([sample_data], columns=[
        'city', 'province', 'latitude', 'longitude', 'lease_term',
        'type', 'beds', 'baths', 'sq_feet', 'furnishing',
        'smoking', 'cats', 'dogs'
    ])
    
    predicted_price = model.predict(sample_df)
    return jsonify({"predicted_price": float(predicted_price[0])})

if __name__ == '__main__':
    app.run(debug=True)
