import { NextResponse } from 'next/server';
import { HistoricalDataEntry } from '@/types';

// Mock historical data
const historicalData: HistoricalDataEntry[] = [
  {
    date: "2023-06-12",
    homeTeam: "阪神",
    awayTeam: "広島",
    precipitation: 15.2,
    temperature: 19.5,
    wasCancelled: true
  },
  {
    date: "2023-06-10",
    homeTeam: "阪神",
    awayTeam: "中日",
    precipitation: 8.1,
    temperature: 21.0,
    wasCancelled: true
  },
  {
    date: "2023-06-08",
    homeTeam: "阪神",
    awayTeam: "DeNA",
    precipitation: 2.3,
    temperature: 24.5,
    wasCancelled: false
  },
  {
    date: "2023-06-05",
    homeTeam: "阪神",
    awayTeam: "ヤクルト",
    precipitation: 0.0,
    temperature: 26.8,
    wasCancelled: false
  },
  {
    date: "2023-06-03",
    homeTeam: "阪神",
    awayTeam: "読売",
    precipitation: 12.7,
    temperature: 20.2,
    wasCancelled: true
  },
  {
    date: "2023-06-01",
    homeTeam: "阪神",
    awayTeam: "広島",
    precipitation: 0.5,
    temperature: 25.1,
    wasCancelled: false
  },
  {
    date: "2023-05-29",
    homeTeam: "阪神",
    awayTeam: "中日",
    precipitation: 6.8,
    temperature: 22.3,
    wasCancelled: false
  },
  {
    date: "2023-05-27",
    homeTeam: "阪神",
    awayTeam: "DeNA",
    precipitation: 18.9,
    temperature: 18.7,
    wasCancelled: true
  },
  {
    date: "2023-05-24",
    homeTeam: "阪神",
    awayTeam: "ヤクルト",
    precipitation: 1.2,
    temperature: 23.9,
    wasCancelled: false
  },
  {
    date: "2023-05-22",
    homeTeam: "阪神",
    awayTeam: "読売",
    precipitation: 9.4,
    temperature: 21.6,
    wasCancelled: true
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const paginatedData = historicalData.slice(offset, offset + limit);
    
    return NextResponse.json(paginatedData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch historical data' },
      { status: 500 }
    );
  }
}