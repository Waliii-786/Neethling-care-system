from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

# Load and preprocess data
data = pd.read_csv('../Assets/lumpy_skin_disease_data.csv')

# Train a TF-IDF vectorizer and transform the data
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(data['Question'])

# Generate a response based on the input query
def generate_response(query):
    query_vector = tfidf_vectorizer.transform([query])
    cosine_similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()
    top_similar_indices = cosine_similarities.argsort()[-1:][::-1]
    response = data.iloc[top_similar_indices]['Answer'].tolist()
    return response[0] if response else "I'm sorry, I don't have information on that topic."

@app.route('/chat', methods=['POST'])
def chat():
    input_data = request.json
    message = input_data.get('message')

    # Use the model to generate responses
    response = generate_response(message)

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
