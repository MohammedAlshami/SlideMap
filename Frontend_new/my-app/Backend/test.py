from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/ask', methods=['GET', 'POST'])
def receive_message():
    # Corrected the syntax to create a dictionary with key-value pairs
    return jsonify({"content": "response"}), 200

if __name__ == '__main__':
    app.run(debug=True)
  