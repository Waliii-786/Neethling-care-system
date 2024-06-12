from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model # type: ignore
from tensorflow.keras.preprocessing import image # type: ignore
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load the trained model
model = load_model('../Trained_files/1.h5')

# Class names
class_names = ['Lumpy Skin', 'Normal Skin']  # Update with your class names

def predict_image(img_path):
    img = image.load_img(img_path, target_size=(256, 256))
    img_array = image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    
    predictions = model.predict(img_array)
    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = round(100 * (np.max(predictions[0])), 2)
    
    return predicted_class, confidence

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file:
        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)
        
        predicted_class, confidence = predict_image(file_path)
        
        return jsonify({'class': predicted_class, 'confidence': confidence})

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(host='0.0.0.0', port=5000)
