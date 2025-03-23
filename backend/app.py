# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

# Import the symptom checker function from the ai-module.
from ai_module.symptom_checker import symptom_checker

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests from the frontend.

@app.route('/api/symptom-checker', methods=['POST'])
def symptom_checker_endpoint():
    data = request.get_json()
    # Expecting a JSON body with a "features" key containing a list of 10 numbers.
    features = data.get('features', [])
    if not features or len(features) != 10:
        return jsonify({"error": "Invalid input. Expected 10 features."}), 400
    
    # Get prediction from the AI module.
    prediction = symptom_checker(features)
    return jsonify({"prediction": prediction})

if __name__ == '__main__':
    app.run(debug=True)
