from flask import Flask, request, jsonify
import json
import math
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load("engagement_model.pkl")

# Load horse attributes used for the odds and personality endpoint
with open("horse_data.json", "r", encoding="utf-8") as f:
    HORSE_DATA = json.load(f)


def calculate_horse_odds(data):
    """Return list of horses with odds based on simple weighted score."""
    # compute a weighted score for each horse
    weights = []
    for h in data:
        score = 0.4 * h["speed"] + 0.3 * h["endurance"] + 0.3 * h["experience"]
        weights.append(score)

    total = sum(weights)
    odds = []
    for h, w in zip(data, weights):
        prob = w / total if total else 0.0
        # convert probability to fractional odds for display
        fractional = (1 - prob) / prob if prob else 0.0
        odds.append({
            "name": h["name"],
            "odds": round(fractional, 2),
            "personality": h["personality"],
            "probability": round(prob, 3),
        })
    return odds

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


@app.route("/horse_odds", methods=["GET"])
def horse_odds():
    """Endpoint returning odds and personalities for horses."""
    odds = calculate_horse_odds(HORSE_DATA)
    return jsonify(odds)

if __name__ == "__main__":
    app.run(debug=True)
