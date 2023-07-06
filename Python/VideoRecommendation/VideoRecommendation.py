import sys
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load the videos array from the first argument passed by Node.js
videos = json.loads(sys.argv[1])

# Load the new course titles from the second argument passed by Node.js
title = json.loads(sys.argv[2])

vectorizer = TfidfVectorizer(stop_words='english')
corpus = [course['headerTitle'] + ' ' + course['description'] for course in videos]
X = vectorizer.fit_transform(corpus)

# Convert the course titles into feature vectors and compute their similarities to the existing videos
new_course_vectors = vectorizer.transform(title)
similarities = cosine_similarity(new_course_vectors, X)

# Sort the videos based on their similarity to the new course titles
most_similar_indices = similarities.argsort()[0][::-1]
sorted_videos = [videos[i] for i in most_similar_indices]

# Print the sorted videos
print(json.dumps(sorted_videos))
