from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load("engagement_model.pkl")

@app.route("/predict_next_action", methods=["POST"])
def predict_next_action():
    data = request.json
    features = [
        data['network_freq'],
        data['analyze_freq'],
        data['brand_freq'],
        data['session_duration']
    ]
    predicted_action = model.predict([features])[0]
    return jsonify({"next_action": predicted_action})

if __name__ == "__main__":
    app.run(debug=True)
