from flask import Flask, jsonify, request
from flask_cors import CORS
import questionGeneration

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/getQuestions", methods = ['POST'])
def generate_questions():
    return jsonify(questionGeneration.execute_gen_questions(request.json['text']))

@app.route("/getSummary", methods = ['POST'])
def generate_summary():
    return jsonify(questionGeneration.execute_gen_summary(request.json['text']))

if __name__ == "__main__":
    app.run()