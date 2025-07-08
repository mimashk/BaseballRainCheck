export type CurrentWeather = {
  timestamp: string;
  temperature: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  weatherCondition: string;
  icon?: string;
}

export type ForecastHour = {
  time: string;
  temperature: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  weatherCondition: string;
  icon?: string;
}

export type GameInfo = {
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  event?: string;
  cancelPolicy?: string;
  status?: 'scheduled' | 'cancelled' | 'in_progress' | 'completed';
  officialAnnouncement?: {
    timestamp: string;
    message: string;
    source: string;
  };
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