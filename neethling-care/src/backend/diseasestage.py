from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # Apply CORS to your Flask app

# Load the trained model
model = joblib.load("../Trained_files/trained_model.pkl")

@app.route('/disease_stage', methods=['POST'])
def disease_stage():
    try:
        # Get the form data from the request
        form_data = request.form.to_dict()
        # Convert the form data to the format expected by the model
        input_data = preprocess_input(form_data)
        # Make prediction using the trained model
        prediction = model.predict(input_data)
        # Convert the prediction result to a human-readable format
        disease_stage = decode_prediction(prediction)
        # Return the prediction result
        return jsonify({'disease_stage': disease_stage})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def preprocess_input(form_data):
    # Implement preprocessing steps if necessary
    # For example, convert data types, scale features, encode categorical variables, etc.
    # Ensure that the input data matches the format expected by the model
    return form_data

def decode_prediction(prediction):
    # Define mapping of numeric predictions to human-readable disease stages
    disease_stages = {
        0: 'Low',
        1: 'Medium',
        2: 'High'
        # Add more mappings as needed based on your model's output
    }
    
    # If the prediction is in the mapping, return the corresponding disease stage
    if prediction in disease_stages:
        return disease_stages[prediction]
    else:
        return 'Unknown'  # Return 'Unknown' if prediction doesn't match any mapping

if __name__ == '__main__':
    app.run(debug=True)
