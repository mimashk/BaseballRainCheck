import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const weatherData = pgTable("weather_data", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull(),
  temperature: real("temperature").notNull(),
  precipitation: real("precipitation").notNull(),
  humidity: real("humidity").notNull(),
  windSpeed: real("wind_speed").notNull(),
  weatherCondition: text("weather_condition").notNull(),
});

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  startTime: text("start_time").notNull(),
  eventInfo: text("event_info"),
  cancelPolicy: text("cancel_policy"),
});

export const cancellationHistory = pgTable("cancellation_history", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").notNull(),
  date: timestamp("date").notNull(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  precipitation: real("precipitation").notNull(),
  temperature: real("temperature").notNull(),
  wasCancelled: boolean("was_cancelled").notNull(),
});

export const insertWeatherDataSchema = createInsertSchema(weatherData).omit({
  id: true,
});

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
});

export const insertCancellationHistorySchema = createInsertSchema(cancellationHistory).omit({
  id: true,
});

export type InsertWeatherData = z.infer<typeof insertWeatherDataSchema>;
export type WeatherData = typeof weatherData.$inferSelect;

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

export type InsertCancellationHistory = z.infer<typeof insertCancellationHistorySchema>;
export type CancellationHistory = typeof cancellationHistory.$inferSelect;

// Frontend types
export type CurrentWeather = {
  timestamp: string;
  temperature: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  weatherCondition: string;
}

export type ForecastHour = {
  time: string;
  temperature: number;
  precipitation: number;
  weatherCondition: string;
}

export type GameInfo = {
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  event?: string;
  cancelPolicy?: string;
}

export type HistoricalDataEntry = {
  date: string;
  homeTeam: string;
  awayTeam: string;
  precipitation: number;
  temperature: number;
  wasCancelled: boolean;
}

export type PredictionResult = {
  cancellationProbability: number;
  predictionSummary: string;
  reasons: string[];
  historicalSimilarCancelled: number;
  historicalSimilarPlayed: number;
}
