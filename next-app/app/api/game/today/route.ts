import { NextResponse } from 'next/server';
import { GameInfo } from '@/types';

// Simple in-memory game status storage
let gameStatus: {
  status: 'scheduled' | 'cancelled' | 'in_progress' | 'completed';
  announcement?: {
    timestamp: string;
    message: string;
    source: string;
  };
} = {
  status: 'scheduled'
};

export async function GET() {
  try {
    const today = new Date();
    const gameTime = new Date(today);
    gameTime.setHours(18, 0, 0, 0); // 6:00 PM game time
    
    const gameInfo: GameInfo = {
      homeTeam: "阪神",
      awayTeam: "読売",
      startTime: gameTime.toISOString(),
      event: "甲子園球場",
      cancelPolicy: "雨天中止の場合があります",
      status: gameStatus.status,
      officialAnnouncement: gameStatus.announcement
    };
    
    return NextResponse.json(gameInfo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch game data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { status, announcement } = body;
    
    if (!['scheduled', 'cancelled', 'in_progress', 'completed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }
    
    gameStatus = {
      status,
      announcement: announcement ? {
        timestamp: new Date().toISOString(),
        message: announcement.message,
        source: announcement.source || 'Manual Update'
      } : undefined
    };
    
    return NextResponse.json({ success: true, gameStatus });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update game status' },
      { status: 500 }
    );
  }
}