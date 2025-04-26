import { InsertWeatherData, CurrentWeather, ForecastHour } from "@shared/schema";

// In a real implementation, this would use an actual weather API
// For demonstration purposes, we're creating a simulated API
export async function fetchCurrentWeather(): Promise<CurrentWeather> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate weather data with some randomness
  const timestamp = new Date().toISOString();
  const baseTemp = 22 + Math.random() * 5;
  const basePrecip = 5 + Math.random() * 7;
  const baseHumidity = 80 + Math.random() * 10;
  const baseWindSpeed = 3 + Math.random() * 4;
  
  // Determine weather condition based on precipitation
  let weatherCondition = "晴れ";
  if (basePrecip > 8) {
    weatherCondition = "雨";
  } else if (basePrecip > 3) {
    weatherCondition = "小雨";
  } else if (basePrecip > 0.5) {
    weatherCondition = "曇り";
  }
  
  return {
    timestamp,
    temperature: Math.round(baseTemp * 10) / 10,
    precipitation: Math.round(basePrecip * 10) / 10,
    humidity: Math.round(baseHumidity),
    windSpeed: Math.round(baseWindSpeed * 10) / 10,
    weatherCondition
  };
}

export async function fetchHourlyForecast(): Promise<ForecastHour[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const forecast: ForecastHour[] = [];
  const now = new Date();
  const currentHour = now.getHours();
  
  // Generate next 4 hours forecast
  for (let i = 1; i <= 4; i++) {
    const forecastHour = (currentHour + i) % 24;
    const time = `${forecastHour}:00`;
    
    // Generate conditions with some randomness but trending improvement
    const tempVariation = Math.random() * 2 - 1; // -1 to +1
    const precipVariation = -1 * i + Math.random() * 3; // generally decreasing
    
    const temperature = Math.round((22 - i * 0.5 + tempVariation) * 10) / 10;
    const precipitation = Math.max(0, Math.round((8 + precipVariation) * 10) / 10);
    
    let weatherCondition = "晴れ";
    if (precipitation > 8) {
      weatherCondition = "雨";
    } else if (precipitation > 3) {
      weatherCondition = "小雨";
    } else if (precipitation > 0.5) {
      weatherCondition = "曇り";
    }
    
    forecast.push({
      time,
      temperature,
      precipitation,
      weatherCondition
    });
  }
  
  return forecast;
}

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
