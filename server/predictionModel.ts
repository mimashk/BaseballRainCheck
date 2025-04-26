import { CurrentWeather, ForecastHour, PredictionResult } from "@shared/schema";
import { historicalCancellationData } from "./data/historicalData";

// Simple prediction model based on weather conditions and historical data
export function predictCancellation(
  currentWeather: CurrentWeather,
  forecast: ForecastHour[]
): PredictionResult {
  // Base probability calculation
  let probability = calculateBaseProbability(currentWeather);
  
  // Adjust with forecast data
  probability = adjustWithForecast(probability, forecast);
  
  // Adjust with historical data
  const { historicalProbability, cancelled, played } = calculateHistoricalProbability(currentWeather);
  probability = (probability * 0.7) + (historicalProbability * 0.3);
  
  // Round to nearest percent
  probability = Math.round(probability);
  
  // Generate appropriate summary
  const summary = generateSummary(probability);
  
  // Generate reasons
  const reasons = generateReasons(currentWeather, forecast, probability);
  
  return {
    cancellationProbability: probability,
    predictionSummary: summary,
    reasons,
    historicalSimilarCancelled: cancelled,
    historicalSimilarPlayed: played
  };
}

function calculateBaseProbability(weather: CurrentWeather): number {
  let probability = 0;
  
  // Precipitation is the primary factor
  if (weather.precipitation >= 10) {
    probability += 70;
  } else if (weather.precipitation >= 7) {
    probability += 50;
  } else if (weather.precipitation >= 5) {
    probability += 30;
  } else if (weather.precipitation >= 3) {
    probability += 15;
  } else if (weather.precipitation >= 1) {
    probability += 5;
  }
  
  // Humidity is a secondary factor
  if (weather.humidity >= 90) {
    probability += 15;
  } else if (weather.humidity >= 80) {
    probability += 10;
  } else if (weather.humidity >= 70) {
    probability += 5;
  }
  
  // Wind speed is a tertiary factor
  if (weather.windSpeed >= 8) {
    probability += 15;
  } else if (weather.windSpeed >= 5) {
    probability += 10;
  } else if (weather.windSpeed >= 3) {
    probability += 5;
  }
  
  return Math.min(probability, 100);
}

function adjustWithForecast(baseProbability: number, forecast: ForecastHour[]): number {
  let adjustedProbability = baseProbability;
  
  // Check if precipitation is trending down
  const precipTrend = forecast.reduce((acc, hour, i) => {
    if (i === 0) return acc;
    return acc + (hour.precipitation < forecast[i-1].precipitation ? -1 : 1);
  }, 0);
  
  // If weather is improving, reduce probability
  if (precipTrend < 0) {
    adjustedProbability *= 0.8;
  }
  
  // If first two hours have heavy rain, increase probability
  if (forecast.slice(0, 2).every(h => h.precipitation > 5)) {
    adjustedProbability *= 1.2;
  }
  
  return Math.min(adjustedProbability, 100);
}

function calculateHistoricalProbability(weather: CurrentWeather): {
  historicalProbability: number;
  cancelled: number;
  played: number;
} {
  // Find similar weather conditions in historical data
  const similarConditions = historicalCancellationData.filter(data => {
    // Similar precipitation (within 3mm)
    const precipSimilar = Math.abs(data.precipitation - weather.precipitation) <= 3;
    // Similar temperature (within 5°C)
    const tempSimilar = Math.abs(data.temperature - weather.temperature) <= 5;
    
    return precipSimilar && tempSimilar;
  });
  
  if (similarConditions.length === 0) {
    return {
      historicalProbability: 50,
      cancelled: 0,
      played: 0
    };
  }
  
  const cancelled = similarConditions.filter(d => d.wasCancelled).length;
  const played = similarConditions.length - cancelled;
  const historicalProbability = (cancelled / similarConditions.length) * 100;
  
  return {
    historicalProbability,
    cancelled,
    played
  };
}

function generateSummary(probability: number): string {
  if (probability >= 75) {
    return "試合中止の可能性が高いです";
  } else if (probability >= 50) {
    return "試合中止の可能性があります";
  } else if (probability >= 25) {
    return "試合実施の可能性がありますが、天候に注意";
  } else {
    return "試合実施の可能性が高いです";
  }
}

function generateReasons(
  weather: CurrentWeather,
  forecast: ForecastHour[],
  probability: number
): string[] {
  const reasons: string[] = [];
  
  if (weather.precipitation >= 5) {
    reasons.push("降水量が基準値 (5mm/h) を超えています");
  }
  
  if (forecast.slice(0, 2).every(h => h.precipitation > 3)) {
    reasons.push("降水の継続が予想されています");
  }
  
  if (weather.humidity >= 80) {
    reasons.push("湿度が高く、グラウンドコンディションが悪化する可能性があります");
  }
  
  if (weather.windSpeed >= 5) {
    reasons.push("風速が高く、プレーに影響がある可能性があります");
  }
  
  // Add historical reasoning if probability is high enough
  if (probability >= 50) {
    const { cancelled, played } = calculateHistoricalProbability(weather);
    const total = cancelled + played;
    if (total > 0) {
      const percentage = Math.round((cancelled / total) * 100);
      reasons.push(`過去の類似条件では${percentage}%が中止となっています`);
    }
  }
  
  return reasons;
}
