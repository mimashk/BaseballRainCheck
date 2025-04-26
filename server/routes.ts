import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fetchCurrentWeather, fetchHourlyForecast, getWeatherIcon } from "./weatherAPI";
import { predictCancellation } from "./predictionModel";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for weather data
  app.get("/api/weather/current", async (req, res) => {
    try {
      const weatherData = await fetchCurrentWeather();
      res.json({
        ...weatherData,
        icon: getWeatherIcon(weatherData.weatherCondition)
      });
    } catch (error) {
      console.error("Error fetching current weather:", error);
      res.status(500).json({ 
        message: "天気データの取得に失敗しました。" 
      });
    }
  });

  app.get("/api/weather/forecast", async (req, res) => {
    try {
      const forecast = await fetchHourlyForecast();
      res.json(forecast.map(hour => ({
        ...hour,
        icon: getWeatherIcon(hour.weatherCondition)
      })));
    } catch (error) {
      console.error("Error fetching weather forecast:", error);
      res.status(500).json({ 
        message: "天気予報の取得に失敗しました。" 
      });
    }
  });

  // API route for game information
  app.get("/api/game/today", async (req, res) => {
    try {
      const game = await storage.getTodayGame();
      if (!game) {
        return res.status(404).json({ message: "本日の試合情報がありません。" });
      }
      res.json(game);
    } catch (error) {
      console.error("Error fetching game info:", error);
      res.status(500).json({ 
        message: "試合情報の取得に失敗しました。" 
      });
    }
  });

  // API route for cancellation prediction
  app.get("/api/prediction", async (req, res) => {
    try {
      const currentWeather = await fetchCurrentWeather();
      const forecast = await fetchHourlyForecast();
      const prediction = predictCancellation(currentWeather, forecast);
      res.json(prediction);
    } catch (error) {
      console.error("Error generating prediction:", error);
      res.status(500).json({ 
        message: "予測の生成に失敗しました。" 
      });
    }
  });

  // API route for historical data
  app.get("/api/history", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const history = await storage.getCancellationHistory(limit, offset);
      res.json(history);
    } catch (error) {
      console.error("Error fetching historical data:", error);
      res.status(500).json({ 
        message: "過去データの取得に失敗しました。" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
