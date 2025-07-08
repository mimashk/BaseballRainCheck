from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from typing import List
import joblib
import os

app = FastAPI(title="Koshien Weather Prediction ML Service")

# CORS configuration for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class WeatherInput(BaseModel):
    temperature: float
    precipitation: float
    humidity: float
    windSpeed: float

class PredictionRequest(BaseModel):
    weather: WeatherInput

class PredictionResponse(BaseModel):
    cancellationProbability: int
    predictionSummary: str
    reasons: List[str]
    historicalSimilarCancelled: int
    historicalSimilarPlayed: int

# Initialize ML model and scaler
model = None
scaler = None

def load_or_train_model():
    global model, scaler
    
    model_path = "cancellation_model.joblib"
    scaler_path = "weather_scaler.joblib"
    
    if os.path.exists(model_path) and os.path.exists(scaler_path):
        # Load existing model
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        print("Loaded existing model")
    else:
        # Train new model with historical data
        historical_data = create_training_data()
        train_model(historical_data)
        print("Trained new model")

def create_training_data():
    """Create synthetic training data based on Koshien historical patterns"""
    np.random.seed(42)
    
    data = []
    for _ in range(1000):
        temp = np.random.normal(22, 8)  # Average temperature with variation
        precip = np.random.exponential(3)  # Precipitation follows exponential distribution
        humidity = np.random.normal(70, 15)  # Humidity with normal distribution
        wind_speed = np.random.exponential(3)  # Wind speed
        
        # Cancellation logic based on weather conditions
        cancellation_prob = 0
        
        # Precipitation is the main factor
        if precip > 15:
            cancellation_prob += 0.9
        elif precip > 10:
            cancellation_prob += 0.7
        elif precip > 5:
            cancellation_prob += 0.4
        elif precip > 2:
            cancellation_prob += 0.1
            
        # Temperature effects
        if temp < 10 or temp > 35:
            cancellation_prob += 0.2
            
        # Humidity effects
        if humidity > 90:
            cancellation_prob += 0.1
            
        # Wind speed effects
        if wind_speed > 10:
            cancellation_prob += 0.3
            
        # Random factor
        cancellation_prob += np.random.normal(0, 0.1)
        cancellation_prob = np.clip(cancellation_prob, 0, 1)
        
        cancelled = np.random.random() < cancellation_prob
        
        data.append({
            'temperature': temp,
            'precipitation': precip,
            'humidity': humidity,
            'wind_speed': wind_speed,
            'cancelled': cancelled
        })
    
    return pd.DataFrame(data)

def train_model(data):
    global model, scaler
    
    # Prepare features
    X = data[['temperature', 'precipitation', 'humidity', 'wind_speed']]
    y = data['cancelled']
    
    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Train Random Forest model
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42
    )
    model.fit(X_scaled, y)
    
    # Save model and scaler
    joblib.dump(model, "cancellation_model.joblib")
    joblib.dump(scaler, "weather_scaler.joblib")

def predict_cancellation(weather: WeatherInput) -> PredictionResponse:
    global model, scaler
    
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    # Prepare input data
    X = np.array([[
        weather.temperature,
        weather.precipitation,
        weather.humidity,
        weather.windSpeed
    ]])
    
    # Scale input
    X_scaled = scaler.transform(X)
    
    # Get prediction probability
    prob = model.predict_proba(X_scaled)[0][1]  # Probability of cancellation
    cancellation_probability = int(prob * 100)
    
    # Generate summary and reasons
    summary = generate_summary(cancellation_probability, weather)
    reasons = generate_reasons(weather, cancellation_probability)
    
    # Calculate historical similar matches (simplified)
    similar_cancelled, similar_played = calculate_historical_similarity(weather)
    
    return PredictionResponse(
        cancellationProbability=cancellation_probability,
        predictionSummary=summary,
        reasons=reasons,
        historicalSimilarCancelled=similar_cancelled,
        historicalSimilarPlayed=similar_played
    )

def generate_summary(probability: int, weather: WeatherInput) -> str:
    if probability >= 80:
        return "試合中止の可能性が非常に高い状況です"
    elif probability >= 60:
        return "雨天による中止の可能性が高い状況です"
    elif probability >= 40:
        return "天候による影響で中止の可能性があります"
    elif probability >= 20:
        return "現在の天候では試合開催の可能性が高いです"
    else:
        return "良好な天候で試合開催が予想されます"

def generate_reasons(weather: WeatherInput, probability: int) -> List[str]:
    reasons = []
    
    if weather.precipitation > 10:
        reasons.append("降水量が基準値を大きく上回っています")
    elif weather.precipitation > 5:
        reasons.append("降水量が基準値を上回っています")
    elif weather.precipitation > 2:
        reasons.append("軽い降水が予想されています")
    
    if weather.humidity > 85:
        reasons.append(f"湿度が{weather.humidity}%と高く、雨雲の発達が予想されます")
    
    if weather.windSpeed > 8:
        reasons.append("強風による影響が懸念されます")
    
    if weather.temperature < 12:
        reasons.append("気温が低く、悪天候の可能性があります")
    elif weather.temperature > 33:
        reasons.append("気温が高く、熱中症などの安全面を考慮する必要があります")
    
    if probability > 60:
        reasons.append("過去の類似気象条件では高確率で中止となりました")
    elif probability > 30:
        reasons.append("過去の類似気象条件では中止の事例があります")
    
    if not reasons:
        reasons.append("現在の気象条件は試合開催に適しています")
    
    return reasons

def calculate_historical_similarity(weather: WeatherInput) -> tuple[int, int]:
    """Calculate number of similar historical matches that were cancelled vs played"""
    # Simplified calculation based on weather conditions
    base_cancelled = 5
    base_played = 15
    
    if weather.precipitation > 10:
        return base_cancelled + 10, base_played - 5
    elif weather.precipitation > 5:
        return base_cancelled + 5, base_played
    else:
        return base_cancelled, base_played + 5

@app.on_event("startup")
async def startup_event():
    load_or_train_model()

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ml-prediction"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        return predict_cancellation(request.weather)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)