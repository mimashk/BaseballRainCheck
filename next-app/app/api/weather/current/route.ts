import { NextResponse } from 'next/server';
import { CurrentWeather } from '@/types';

export async function GET() {
  try {
    // Simulate weather API call with realistic data
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const now = new Date();
    const currentHour = now.getHours();
    
    // Simulate varying weather conditions throughout the day
    const baseTemp = 22 + Math.sin((currentHour - 6) * Math.PI / 12) * 8;
    const basePrecip = Math.max(0, 8 - currentHour * 0.5 + Math.random() * 5);
    const baseHumidity = 70 + Math.random() * 20;
    const baseWindSpeed = 2 + Math.random() * 4;
    
    let weatherCondition = "晴れ";
    if (basePrecip > 8) {
      weatherCondition = "雨";
    } else if (basePrecip > 3) {
      weatherCondition = "小雨";
    } else if (basePrecip > 0.5) {
      weatherCondition = "曇り";
    }
    
    const currentWeather: CurrentWeather = {
      timestamp: now.toISOString(),
      temperature: Math.round(baseTemp * 10) / 10,
      precipitation: Math.round(basePrecip * 10) / 10,
      humidity: Math.round(baseHumidity),
      windSpeed: Math.round(baseWindSpeed * 10) / 10,
      weatherCondition
    };

    return NextResponse.json(currentWeather);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}