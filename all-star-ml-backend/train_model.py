import pandas as pd
import xgboost as xgb
import joblib

df = pd.read_csv("user_data.csv")

X = df[['network_freq', 'analyze_freq', 'brand_freq', 'session_duration']]
y = df['preferred_action']

model = xgb.XGBClassifier()
model.fit(X, y)

joblib.dump(model, "engagement_model.pkl")
