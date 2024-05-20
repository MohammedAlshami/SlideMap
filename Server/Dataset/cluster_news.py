import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import AgglomerativeClustering
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import string
import numpy as np
from tqdm import tqdm
import openpyxl

nltk.download('stopwords')
nltk.download('punkt')

def preprocess_text(text):
    """Clean and preprocess text for analysis."""
    # Convert any non-string input to string
    text = str(text)
    text = text.lower()  # Lowercase
    text = text.translate(str.maketrans('', '', string.punctuation))  # Remove punctuation
    tokens = nltk.word_tokenize(text)  # Tokenization
    stemmer = PorterStemmer()
    # Remove stopwords and stemming
    tokens = [stemmer.stem(word) for word in tokens if word not in stopwords.words('english')]
    return " ".join(tokens)


def process_news_data(filepath):
    df = pd.read_excel(filepath)

    df['combined_text'] = df['Snippet'] + " " + df['Title']  # Combine text for better context
    
    # Preprocess text with progress bar
    tqdm.pandas(desc="Processing Text")
    df['processed_text'] = df['combined_text'].progress_apply(preprocess_text)
    
    # TF-IDF Vectorization
    print("Vectorizing...")
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(df['processed_text'])
    
    # Cosine Similarity Matrix
    print("Calculating Cosine Similarity...")
    cos_sim = cosine_similarity(tfidf_matrix)
    
    # Clustering
    print("Clustering...")
    cluster = AgglomerativeClustering(n_clusters=None, linkage='ward', distance_threshold=1.5)
    df['incident_source'] = cluster.fit_predict(cos_sim)

    # Save to new Excel file
    output_path = filepath.replace('.xlsx', '_processed.xlsx')
    df.to_excel(output_path, index=False)
    
    return df
# Example usage
df_result = process_news_data(r"C:\Users\USER\Desktop\FYP\SlideMap\Server\Dataset\Files\Enhanced_Dataset.xlsx")
