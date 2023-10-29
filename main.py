from flask import Flask, jsonify, request
from flask_cors import CORS
from collections import Counter

app = Flask(__name__)

CORS(app)

import json
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from gensim import corpora, models

nltk.download('vader_lexicon')

def analyze_sentiment(comment):
    sia = SentimentIntensityAnalyzer()
    sentiment_score = sia.polarity_scores(comment)['compound']
    if sentiment_score >= 0.05:
        return 'Positive'
    elif sentiment_score <= -0.05:
        return 'Negative'
    else:
        return 'Neutral'

def categorize_person(person_data):
    comments = person_data.get('comments', [])

    # Preprocess comments
    tokenized_comments = [comment.split() for comment in comments]

    # Create a dictionary and corpus
    dictionary = corpora.Dictionary(tokenized_comments)
    corpus = [dictionary.doc2bow(comment) for comment in tokenized_comments]

    # Train LDA model
    lda_model = models.LdaModel(corpus, num_topics=3, id2word=dictionary, passes=15)

    # Get topic distribution for each comment
    comment_topics = [lda_model[comment] for comment in corpus]

    # Summarize the topics
    topics = [max(comment, key=lambda x: x[1])[0] for comment in comment_topics]

    # You may want to map topics to categories based on your interpretation
    # For simplicity, let's assume 0 corresponds to 'Positive', 1 to 'Negative', and 2 to 'Neutral'
    category_mapping = {0: 'Positive', 1: 'Negative', 2: 'Neutral'}

    # Get the most frequent category
    most_frequent_category = max(set(topics), key=topics.count)

    # Extract relevant information from comments
    comments = person_data["comments"]

    # Convert comments to lowercase for case-insensitive matching
    lowercase_comments = ' '.join(comments).lower()

    # Define keywords and weights for each category
    category_keywords = {
        'Software Developer': {'developer': 3, 'software development': 2, 'coding': 2, 'innovation': 1},
        'Tester': {'testing': 3, 'bugs': 2, 'test cases': 2, 'quality assurance': 1},
        'Sales Executive': {'sales': 3, 'marketing': 2, 'business development': 2},
        'Digital Marketing': {'digital marketing': 3, 'seo': 2, 'online advertising': 2},
        'Data Analyst': {'data analysis': 3, 'analytics': 2, 'data': 2},
    }

    category = 'Unable to Analyze'
    max_weight = 0

    # Iterate through categories and calculate total weight
    for cat, keywords in category_keywords.items():
        weight = sum(weights * lowercase_comments.count(keyword) for keyword, weights in keywords.items())
        if weight > max_weight:
            max_weight = weight
            category = cat

    # Check "open_to_work" attribute and update category
    open_to_work = person_data["open_to_work"].lower()

    print(category, 'c')
    return category
    # return category_mapping.get(most_frequent_category, 'Other')

def get_overall_sentiment_counts(sentiments):
    positive_count = sentiments.count('Positive')
    negative_count = sentiments.count('Negative')
    neutral_count = sentiments.count('Neutral')

    return positive_count, neutral_count, negative_count

def get_overall_sentiment(sentiments):
    positive_count = sentiments.count('Positive')
    negative_count = sentiments.count('Negative')
    neutral_count = sentiments.count('Neutral')

    if positive_count > negative_count and positive_count > neutral_count:
        return 'Positive'
    elif negative_count > positive_count and negative_count > neutral_count:
        return 'Negative'
    else:
        return 'Neutral'

with open('dataset.json', 'r') as file:
    person_data = json.load(file)


# Add a new route to expose sentiment analysis results
@app.route('/sentiment-analysis', )
def get_sentiment_analysis():
    global person_data
    with open('dataset.json', 'r') as file:
        person_data = json.load(file)
    required_mail_id_data = request.args.get('email', 'none')
    print(required_mail_id_data, 'requril....')
    # filtered_data = next((data for data in person_data if isinstance(data, dict) and data.get('mail_id') == required_mail_id_data), None)
    filtered_data=None
    found=False
    for data_object in person_data:
        if isinstance(data_object, dict) and 'mail_id' in data_object:
            print(data_object['mail_id'], 'ffffff....')
            print(required_mail_id_data, 'rrrrrrr....')
            if data_object["mail_id"] == required_mail_id_data:
                found = True
                filtered_data = data_object
                break 
    if found:
        person_data = filtered_data

        # Run sentiment analysis for each comment
        sentiments = [analyze_sentiment(comment) for comment in filtered_data['comments']]

        # Determine overall sentiment counts
        positive_count, neutral_count, negative_count = get_overall_sentiment_counts(sentiments)

        # Determine overall sentiment
        overall_sentiment = get_overall_sentiment(sentiments)

        # Categorize the person
        category = categorize_person(person_data)

        # Display the results
        print('Overall Sentiment:', overall_sentiment)
        print('Positive Count:', positive_count)
        print('Neutral Count:', neutral_count)
        print('Negative Count:', negative_count)
        print('returning data...')
        return jsonify({
        'overallSentiment': overall_sentiment,
        'positiveCount': positive_count,
        'neutralCount': neutral_count,
        'negativeCount': negative_count,
        'category': category,
        'DOB': person_data['DOB'], 
        'mail_id': person_data['mail_id'],
        'description': person_data['description'],
        'user_id': person_data['user_id'],
        'location': person_data['location'],
        'skills': person_data['skills'], 
        'Certificates': person_data['Certificates'], 
        'name': person_data['name'],
        'connections': person_data['connections'],
        })
    else:
        return jsonify({
        'message': 'No Record Found',
        })
    
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)

