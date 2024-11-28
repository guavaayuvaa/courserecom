from flask import Flask, request, jsonify
from flask_cors import CORS


import pandas as pd
import neattext.functions as nfx
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


def readData():
    df = pd.read_csv("courses-cleaned.csv")
    df.drop(columns=["Unnamed: 0"], inplace=True)
    return df

def getCleanTitle(df):
    df['tags'] = df['title'].apply(nfx.remove_special_characters)
    df['tags'] = df['tags'].apply(lambda x: x.lower())
    df['title'] = df['title'].apply(lambda x: x.lower())
    return df

def getVector(df):
    cv = CountVectorizer(stop_words='english')
    vectors = cv.fit_transform(df['tags']).toarray()
    return vectors

def getSimilaritymat(vectors):
    similarity = cosine_similarity(vectors)
    return similarity

def recommend(df, title_name, similarity_mat, no_of_records=10):
    try:
        course_index = pd.Series(df.index, index=df['title'])
        index = course_index[title_name]
        scores = list(enumerate(similarity_mat[index]))
        sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)
        selected_course_index = [i[0] for i in sorted_scores[1:no_of_records+1]]
        selected_course_score = [i[1] for i in sorted_scores[1:no_of_records+1]]
        rec_df = df.iloc[selected_course_index]
        rec_df['similarity_score'] = selected_course_score
        final_rec_courses = rec_df[['title', 'is_paid', 'price', 'course_cover_image', 'headline',
                                    'instructor', 'ratings', 'similarity_score']]
        final_rec_courses = final_rec_courses[final_rec_courses.similarity_score > 0.5]
        return final_rec_courses
    except KeyError:
        return pd.DataFrame()

def searchterm(term, df):
    result_df = df[df['tags'].str.contains(term, na=False)]
    return result_df.sort_values(by='ratings', ascending=False)

@app.route('/')
def index():
    return "Welcome !"  


@app.route('/courses', methods=['GET'])
def get_top_courses():
    df_50 = pd.read_csv("top-50_cleaned.csv")
    df_50.drop(columns=['Unnamed: 0'], inplace=True)
    df_50 = df_50.sample(7)
    df_50['title'] = df_50['title'].apply(lambda x: x.lower())
    df_50['title'] = df_50['title'].apply(nfx.remove_special_characters)

    courses = df_50.to_dict(orient='records')
    return jsonify({"success": True, "data": courses})

@app.route('/recommend', methods=['POST'])
def recommend_courses():
    try:
        data = request.json
        title_name = data.get("course", "").lower()

        df = readData()
        df = getCleanTitle(df)
        vectors = getVector(df)
        similarity_mat = getSimilaritymat(vectors)
        rec_df = recommend(df, title_name, similarity_mat)

        if not rec_df.empty:
            courses = rec_df.to_dict(orient='records')
            return jsonify({"success": True, "data": courses})
        else:
            return jsonify({"success": False, "message": "No recommendations found."})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

@app.route('/search', methods=['POST'])
def search_courses():
    try:
        data = request.json
        search_term = data.get("term", "").lower()

        df = readData()
        df = getCleanTitle(df)
        result_df = searchterm(search_term, df)

        if not result_df.empty:
            courses = result_df.to_dict(orient='records')
            return jsonify({"success": True, "data": courses})
        else:
            return jsonify({"success": False, "message": "No courses found."})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)

