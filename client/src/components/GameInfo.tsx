import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GameInfo as GameInfoType } from "@/lib/types";
import { formatMatchup } from "@/lib/utils";
import { useQuery as useQueryPrediction } from "@tanstack/react-query";
import { PredictionResult } from "@/lib/types";

export function GameInfo() {
  const { data: gameInfo, isLoading } = useQuery<GameInfoType>({
    queryKey: ["/api/game/today"],
  });
  
  const { data: prediction } = useQueryPrediction<PredictionResult>({
    queryKey: ["/api/prediction"],
  });
  
  if (isLoading) {
    return <GameInfoSkeleton />;
  }
  
  if (!gameInfo) {
    return (
      <Card className="h-full">
        <CardHeader className="bg-[#FFDB00] p-4 text-[#1A1A1A]">
          <CardTitle className="text-xl font-bold flex items-center">
            <span className="material-icons mr-2">event</span>
            試合情報
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-center py-6">
            <p className="text-gray-500">本日の試合情報がありません</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const { homeTeam, awayTeam, startTime, event, cancelPolicy } = gameInfo;
  
  return (
    <Card className="h-full">
      <CardHeader className="bg-[#FFDB00] p-4 text-[#1A1A1A]">
        <CardTitle className="text-xl font-bold flex items-center">
          <span className="material-icons mr-2">event</span>
          試合情報
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="mb-4 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="text-sm text-gray-500">対戦カード</div>
            <div className="font-bold text-lg">{formatMatchup(homeTeam, awayTeam)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">開始時間</div>
            <div className="font-bold">{startTime}</div>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="font-bold text-[#1A1A1A] mb-2 flex items-center">
            <span className="material-icons mr-1">stadium</span>
            甲子園球場情報
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-500">イベント</div>
              <div>{event || "特になし"}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-500">中止の場合</div>
              <div>{cancelPolicy || "公式サイトをご確認ください"}</div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-[#1A1A1A] mb-2 flex items-center">
            <span className="material-icons mr-1">history</span>
            過去の類似条件
          </h3>
          <div className="text-sm text-gray-700">
            <p className="mb-2">過去1年間の類似条件での試合状況:</p>
            <div className="bg-gray-50 p-3 rounded flex items-center justify-between">
              <div>
                <span className="font-medium">中止:</span> 
                <span>{prediction?.historicalSimilarCancelled || 0}試合</span>
              </div>
              <div>
                <span className="font-medium">決行:</span> 
                <span>{prediction?.historicalSimilarPlayed || 0}試合</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function GameInfoSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="bg-[#FFDB00] p-4 text-[#1A1A1A]">
        <CardTitle className="text-xl font-bold flex items-center">
          <span className="material-icons mr-2">event</span>
          試合情報
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between">
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <Skeleton className="h-6 w-40 mb-3" />
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-5 w-28" />
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>
        </div>
        
        <div>
          <Skeleton className="h-6 w-40 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <div className="bg-gray-50 p-3 rounded">
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
