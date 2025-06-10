import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameInfo } from "@/lib/types";
import { formatTime, formatJapaneseDate } from "@/lib/weather";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";

interface GameStatusDisplayProps {
  gameInfo: GameInfo;
}

export function GameStatusDisplay({ gameInfo }: GameStatusDisplayProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'in_progress':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'cancelled':
        return '試合中止';
      case 'in_progress':
        return '試合中';
      case 'completed':
        return '試合終了';
      default:
        return '開催予定';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'cancelled':
        return 'destructive';
      case 'in_progress':
        return 'default';
      case 'completed':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getAlertType = (status: string) => {
    switch (status) {
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon(gameInfo.status || 'scheduled')}
          試合状況
          <Badge variant={getStatusColor(gameInfo.status || 'scheduled') as any}>
            {getStatusText(gameInfo.status || 'scheduled')}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">対戦カード</p>
              <p className="font-semibold text-lg">
                {gameInfo.homeTeam} vs {gameInfo.awayTeam}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">試合開始時刻</p>
              <p className="font-semibold">
                {formatTime(gameInfo.startTime)}
              </p>
            </div>
          </div>

          {gameInfo.event && (
            <div>
              <p className="text-sm text-gray-600">イベント</p>
              <p>{gameInfo.event}</p>
            </div>
          )}

          {gameInfo.officialAnnouncement && (
            <Alert variant={getAlertType(gameInfo.status || 'scheduled') as any}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p className="font-medium">{gameInfo.officialAnnouncement.message}</p>
                  <p className="text-xs text-gray-600">
                    発表時刻: {formatTime(gameInfo.officialAnnouncement.timestamp)} | 
                    出典: {gameInfo.officialAnnouncement.source}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {gameInfo.status === 'cancelled' && gameInfo.cancelPolicy && (
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>払い戻し・振替について:</strong> {gameInfo.cancelPolicy}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}