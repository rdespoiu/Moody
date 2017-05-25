from flask import Flask, request
from flask_restful import Resource, Api
from sentiment_analyzer import getSentiment

# Instantiate app and api
app = Flask(__name__)
api = Api(app)

# Create endpoint for sentiment analysis
class SentimentAnalysis(Resource):
    def post(self):
        # Returns a JSON-like Python dictionary with sentiment analysis performed on input
        return getSentiment(request.form['data'].split(' '))

# Add SentimentAnalysis to root URL
api.add_resource(SentimentAnalysis, '/')

# Main method to run the API
if __name__ == '__main__':
    app.run(debug=True)
