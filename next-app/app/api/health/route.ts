import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'koshien-weather-nextjs',
    timestamp: new Date().toISOString()
  });
}