import { apiRequest } from "@/lib/queryClient";
import { CurrentWeather, ForecastHour, GameInfo, HistoricalDataEntry, PredictionResult } from "./types";

// Fetch current weather data
export async function fetchCurrentWeather(): Promise<CurrentWeather> {
  const response = await apiRequest("GET", "/api/weather/current");
  return response.json();
}

// Fetch hourly forecast
export async function fetchHourlyForecast(): Promise<ForecastHour[]> {
  const response = await apiRequest("GET", "/api/weather/forecast");
  return response.json();
}

// Fetch today's game information
export async function fetchTodayGame(): Promise<GameInfo> {
  const response = await apiRequest("GET", "/api/game/today");
  return response.json();
}

// Fetch cancellation prediction
export async function fetchPrediction(): Promise<PredictionResult> {
  const response = await apiRequest("GET", "/api/prediction");
  return response.json();
}

// Fetch historical data
export async function fetchHistoricalData(limit: number = 10, offset: number = 0): Promise<HistoricalDataEntry[]> {
  const response = await apiRequest("GET", `/api/history?limit=${limit}&offset=${offset}`);
  return response.json();
}

// Format date to Japanese format
export function formatJapaneseDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
  
  return `${year}年${month}月${day}日 (${dayOfWeek})`;
}

// Format time
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  
  return `${hours}:${minutes}`;
}

// Get weather icon
export function getWeatherIcon(condition: string): string {
  switch (condition) {
    case "晴れ":
      return "wb_sunny";
    case "曇り":
      return "cloud";
    case "小雨":
      return "grain";
    case "雨":
      return "water_drop";
    default:
      return "cloud";
  }
}
