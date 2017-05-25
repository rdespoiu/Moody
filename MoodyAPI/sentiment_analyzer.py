from nltk.sentiment.vader import SentimentIntensityAnalyzer

def getSentiment(data):
    # Initialize the sentiment intensity analyzer
    intensity = SentimentIntensityAnalyzer()

    # Scores map for word sentiments
    scores = {
        'compound':     0,
        'neg'     :     0,
        'neu'     :     0,
        'pos'     :     0
    }

    # For each word the input data, calculate its polarity scores
    for word in data:
        # Calculate polarity
        ss = intensity.polarity_scores(word)

        # Add polarity scores to the scores map
        for k in sorted(ss):
            scores[k] += float(ss[k])

    # Get length of data
    n = len(data)

    # For each score, add a new layer with total score and an average score
    for score in scores:
        scores[score] = {'total': scores[score], 'average': scores[score] / n}

    # Add length of the input data to the scores map
    scores['totalNumberOfWords'] = n

    # Return the scores map
    return scores
