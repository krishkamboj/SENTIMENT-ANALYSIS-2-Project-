from flask import Flask, render_template, request, jsonify
import prediction

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

# API listening to POST requests and predicting sentiments
@app.route('/predict', methods=['POST'])
def predict():
    response = {}
    review = request.json.get('customer_review')
    
    if not review:
        response = {
            'status': 'error',
            'message': 'Empty Review'
        }
    else:
        sentiment, path = prediction.predict(review)
        response = {
            'status': 'success',
            'message': 'Got it',
            'sentiment': sentiment,
            'path': path
        }
    return jsonify(response)

# Creating an API to save the review when the user clicks the Save button
@app.route('/save', methods=['POST'])
def save():
    data = request.json
    date = data.get('date')
    product = data.get('product')
    review = data.get('review')
    sentiment = data.get('sentiment')

    data_entry = f"{date},{product},{review},{sentiment}\n"

    with open('reviews.txt', 'a') as file:
        file.write(data_entry)

    return jsonify({
        'status': 'success',
        'message': 'Data Logged'
    })

if __name__ == "__main__":
    app.run(debug=True)
