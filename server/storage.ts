import { 
  weatherData, 
  games, 
  cancellationHistory, 
  type WeatherData, 
  type Game, 
  type CancellationHistory, 
  type InsertWeatherData, 
  type InsertGame, 
  type InsertCancellationHistory,
  type CurrentWeather,
  type ForecastHour,
  type GameInfo,
  type HistoricalDataEntry,
  type PredictionResult
} from "@shared/schema";
import { historicalCancellationData } from "./data/historicalData";

export interface IStorage {
  // Weather data methods
  getCurrentWeather(): Promise<CurrentWeather>;
  getHourlyForecast(): Promise<ForecastHour[]>;
  saveWeatherData(data: InsertWeatherData): Promise<WeatherData>;
  
  // Game information methods
  getTodayGame(): Promise<GameInfo | null>;
  saveGame(game: InsertGame): Promise<Game>;
  
  // Historical data methods
  getCancellationHistory(limit: number, offset: number): Promise<HistoricalDataEntry[]>;
  saveCancellationHistory(entry: InsertCancellationHistory): Promise<CancellationHistory>;
  
  // Prediction related methods
  getPrediction(): Promise<PredictionResult>;
}

export class MemStorage implements IStorage {
  private weatherData: Map<number, WeatherData>;
  private games: Map<number, Game>;
  private cancellationHistory: Map<number, CancellationHistory>;
  private weatherCurrentId: number;
  private gamesCurrentId: number;
  private cancellationHistoryCurrentId: number;

  constructor() {
    this.weatherData = new Map();
    this.games = new Map();
    this.cancellationHistory = new Map();
    this.weatherCurrentId = 1;
    this.gamesCurrentId = 1;
    this.cancellationHistoryCurrentId = 1;
    
    // Initialize with historical data
    this.initializeHistoricalData();
  }

  private initializeHistoricalData() {
    historicalCancellationData.forEach(entry => {
      const id = this.cancellationHistoryCurrentId++;
      const historicalEntry: CancellationHistory = {
        id,
        gameId: 0,
        date: new Date(entry.date),
        homeTeam: entry.homeTeam,
        awayTeam: entry.awayTeam,
        precipitation: entry.precipitation,
        temperature: entry.temperature,
        wasCancelled: entry.wasCancelled
      };
      this.cancellationHistory.set(id, historicalEntry);
    });
  }

  async getCurrentWeather(): Promise<CurrentWeather> {
    // In a real implementation, this would fetch from an actual weather API
    // For now, return some realistic data
    return {
      timestamp: new Date().toISOString(),
      temperature: 24,
      precipitation: 8.2,
      humidity: 85,
      windSpeed: 5.4,
      weatherCondition: "雨"
    };
  }

  async getHourlyForecast(): Promise<ForecastHour[]> {
    // Realistic hourly forecast data
    const now = new Date();
    const forecast: ForecastHour[] = [];
    
    for (let i = 1; i <= 4; i++) {
      const forecastTime = new Date(now.getTime() + i * 60 * 60 * 1000);
      const hour = forecastTime.getHours();
      const hourString = `${hour}:00`;
      
      // Precipitation decreases over time for demo purposes
      const precipitation = Math.max(0, 10 - i * 2);
      const weatherCondition = precipitation > 5 ? "雨" : "曇り";
      
      forecast.push({
        time: hourString,
        temperature: 24 - i,
        precipitation,
        weatherCondition
      });
    }
    
    return forecast;
  }

  async saveWeatherData(data: InsertWeatherData): Promise<WeatherData> {
    const id = this.weatherCurrentId++;
    const weatherDataEntry: WeatherData = { ...data, id };
    this.weatherData.set(id, weatherDataEntry);
    return weatherDataEntry;
  }

  async getTodayGame(): Promise<GameInfo | null> {
    // For demo, return a fixed game
    return {
      homeTeam: "阪神",
      awayTeam: "読売",
      startTime: "18:00",
      event: "ファンサービスデー",
      cancelPolicy: "払い戻し可能"
    };
  }

  async saveGame(game: InsertGame): Promise<Game> {
    const id = this.gamesCurrentId++;
    const gameEntry: Game = { ...game, id };
    this.games.set(id, gameEntry);
    return gameEntry;
  }

  async getCancellationHistory(limit: number = 10, offset: number = 0): Promise<HistoricalDataEntry[]> {
    const history = Array.from(this.cancellationHistory.values())
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(offset, offset + limit)
      .map(entry => ({
        date: entry.date.toISOString().split('T')[0],
        homeTeam: entry.homeTeam,
        awayTeam: entry.awayTeam,
        precipitation: entry.precipitation,
        temperature: entry.temperature,
        wasCancelled: entry.wasCancelled
      }));
    
    return history;
  }

  async saveCancellationHistory(entry: InsertCancellationHistory): Promise<CancellationHistory> {
    const id = this.cancellationHistoryCurrentId++;
    const historyEntry: CancellationHistory = { ...entry, id };
    this.cancellationHistory.set(id, historyEntry);
    return historyEntry;
  }

  async getPrediction(): Promise<PredictionResult> {
    const currentWeather = await this.getCurrentWeather();
    
    // Simple prediction algorithm based on precipitation
    const probability = this.calculateProbability(currentWeather);
    
    let summary = "試合実施の可能性が高いです";
    if (probability > 75) {
      summary = "試合中止の可能性が高いです";
    } else if (probability > 50) {
      summary = "試合中止の可能性があります";
    } else if (probability > 25) {
      summary = "試合実施の可能性がありますが、天候に注意";
    }
    
    const reasons = this.generateReasons(currentWeather, probability);
    
    // Count similar historical conditions
    const similarConditions = Array.from(this.cancellationHistory.values()).filter(
      entry => Math.abs(entry.precipitation - currentWeather.precipitation) < 3
    );
    
    const historicalSimilarCancelled = similarConditions.filter(entry => entry.wasCancelled).length;
    const historicalSimilarPlayed = similarConditions.filter(entry => !entry.wasCancelled).length;
    
    return {
      cancellationProbability: probability,
      predictionSummary: summary,
      reasons,
      historicalSimilarCancelled,
      historicalSimilarPlayed
    };
  }
  
  private calculateProbability(weather: CurrentWeather): number {
    // Simple algorithm - in real app would be more sophisticated
    let probability = 0;
    
    // Precipitation factor (major impact)
    if (weather.precipitation > 10) {
      probability += 60;
    } else if (weather.precipitation > 5) {
      probability += 40;
    } else if (weather.precipitation > 2) {
      probability += 20;
    }
    
    // Humidity factor
    if (weather.humidity > 90) {
      probability += 15;
    } else if (weather.humidity > 80) {
      probability += 10;
    }
    
    // Wind factor
    if (weather.windSpeed > 7) {
      probability += 15;
    } else if (weather.windSpeed > 4) {
      probability += 5;
    }
    
    return Math.min(Math.round(probability), 100);
  }
  
  private generateReasons(weather: CurrentWeather, probability: number): string[] {
    const reasons: string[] = [];
    
    if (weather.precipitation > 5) {
      reasons.push("降水量が基準値 (5mm/h) を超えています");
    }
    
    if (weather.precipitation > 2) {
      reasons.push("降水の継続が予想されています");
    }
    
    if (weather.humidity > 80) {
      reasons.push("湿度が高く、グラウンドコンディションが悪化する可能性があります");
    }
    
    if (weather.windSpeed > 5) {
      reasons.push("風速が高く、プレーに影響がある可能性があります");
    }
    
    if (probability > 50) {
      reasons.push(`過去の類似条件では${probability}%が中止となっています`);
    }
    
    return reasons;
  }
}

export const storage = new MemStorage();
