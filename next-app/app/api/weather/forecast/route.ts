import { NextResponse } from 'next/server';
import { ForecastHour } from '@/types';

export async function GET() {
  try {
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
        humidity: Math.round((75 + i * 3 + Math.random() * 5)),
        windSpeed: Math.round((3.2 + i * 0.8 + Math.random() * 1) * 10) / 10,
        weatherCondition
      });
    }
    
    return NextResponse.json(forecast);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch forecast data' },
      { status: 500 }
    );
  }
}