from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Expanded example dataset
training_data = [
    ("Can you send me the contract?", "request"),
    ("Please schedule the meeting.", "task"),
    ("We're unhappy with the service.", "complaint"),
    ("How much does this cost?", "inquiry"),
    ("Thanks for your help!", "gratitude"),
    ("When will this be delivered?", "follow-up"),
    ("Here's the report you asked for.", "response"),
]

X_texts, y_labels = zip(*training_data)
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(X_texts)

classifier = LogisticRegression()
classifier.fit(X, y_labels)

def classify_intent(text: str) -> str:
    try:
        vec = vectorizer.transform([text])
        pred = classifier.predict(vec)
        return pred[0]
    except:
        return "unknown"
