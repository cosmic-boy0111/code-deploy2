import sys
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load the blogs array from the first argument passed by Node.js
blogs = json.loads(sys.argv[1])

# Load the new course titles from the second argument passed by Node.js
titles = json.loads(sys.argv[2])

vectorizer = TfidfVectorizer(stop_words='english')
corpus = [course['headerTitle'] + ' ' + course['description'] for course in blogs]
X = vectorizer.fit_transform(corpus)

# Convert the course titles into feature vectors and compute their similarities to the existing blogs
new_course_vectors = vectorizer.transform(titles)
similarities = cosine_similarity(new_course_vectors, X)

# Sort the blogs based on their similarity to the new course titles
most_similar_indices = similarities.argsort()[0][::-1]
sorted_blogs = [blogs[i] for i in most_similar_indices]

# Print the sorted blogs
print(json.dumps(sorted_blogs))
