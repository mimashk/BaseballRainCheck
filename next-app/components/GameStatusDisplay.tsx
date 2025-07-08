'use client'

import { GameInfo } from '@/types'

interface GameStatusDisplayProps {
  gameInfo: GameInfo;
}

export function GameStatusDisplay({ gameInfo }: GameStatusDisplayProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const getStatusDisplay = () => {
    switch (gameInfo.status) {
      case 'cancelled':
        return (
          <div className="text-center">
            <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
              <span className="material-icons text-red-600 text-3xl block mb-2">
                cancel
              </span>
              <h2 className="text-xl font-bold text-red-700 mb-2">
                試合中止が発表されました
              </h2>
              {gameInfo.officialAnnouncement && (
                <div className="text-sm text-red-600">
                  <p className="font-semibold">{gameInfo.officialAnnouncement.message}</p>
                  <p className="mt-1">
                    発表: {formatTime(gameInfo.officialAnnouncement.timestamp)} 
                    ({gameInfo.officialAnnouncement.source})
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'in_progress':
        return (
          <div className="text-center">
            <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
              <span className="material-icons text-green-600 text-3xl block mb-2">
                play_circle
              </span>
              <h2 className="text-xl font-bold text-green-700 mb-2">
                試合開催中
              </h2>
              {gameInfo.officialAnnouncement && (
                <div className="text-sm text-green-600">
                  <p className="font-semibold">{gameInfo.officialAnnouncement.message}</p>
                  <p className="mt-1">
                    更新: {formatTime(gameInfo.officialAnnouncement.timestamp)}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'completed':
        return (
          <div className="text-center">
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-4">
              <span className="material-icons text-blue-600 text-3xl block mb-2">
                check_circle
              </span>
              <h2 className="text-xl font-bold text-blue-700 mb-2">
                試合終了
              </h2>
            </div>
          </div>
        );

      default: // scheduled
        return (
          <div className="text-center">
            <span className="material-icons text-primary text-4xl block mb-3">
              sports_baseball
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              本日の試合予定
            </h2>
          </div>
        );
    }
  };

  if (gameInfo.status !== 'scheduled') {
    return getStatusDisplay();
  }

  return (
    <div>
      {getStatusDisplay()}
      
      <div className="text-center space-y-3">
        <div className="text-3xl font-bold text-gray-800">
          {gameInfo.homeTeam} vs {gameInfo.awayTeam}
        </div>
        
        <div className="flex items-center justify-center space-x-4 text-gray-600">
          <div className="flex items-center">
            <span className="material-icons mr-2">schedule</span>
            <span>{formatTime(gameInfo.startTime)}</span>
          </div>
          <div className="flex items-center">
            <span className="material-icons mr-2">event</span>
            <span>{formatDate(gameInfo.startTime)}</span>
          </div>
        </div>
        
        {gameInfo.event && (
          <div className="flex items-center justify-center text-gray-600">
            <span className="material-icons mr-2">place</span>
            <span>{gameInfo.event}</span>
          </div>
        )}
        
        {gameInfo.cancelPolicy && (
          <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 mt-4">
            <span className="material-icons text-sm mr-1">info</span>
            {gameInfo.cancelPolicy}
          </div>
        )}
      </div>
    </div>
  );
}