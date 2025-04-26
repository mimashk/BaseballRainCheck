import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PredictionResult as PredictionResultType } from "@/lib/types";
import { getPredictionGradient } from "@/lib/predictor";

export function PredictionResult() {
  const { data: prediction, isLoading } = useQuery<PredictionResultType>({
    queryKey: ["/api/prediction"],
  });
  
  if (isLoading) {
    return <PredictionResultSkeleton />;
  }
  
  if (!prediction) {
    return (
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-red-500">予測データの取得に失敗しました。更新ボタンを押して再試行してください。</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const { cancellationProbability, predictionSummary, reasons, historicalSimilarCancelled, historicalSimilarPlayed } = prediction;
  
  return (
    <section className="mb-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-[#1A1A1A] p-4 text-white">
          <h2 className="text-xl font-bold flex items-center">
            <span className="material-icons mr-2">analytics</span>
            試合中止予測
          </h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">低確率</span>
                <span className="text-sm">高確率</span>
              </div>
              <div className="prediction-meter mb-4 w-full h-5 bg-[#e0e0e0] rounded-full overflow-hidden">
                <div 
                  className={`prediction-fill h-full rounded-full ${getPredictionGradient(cancellationProbability)}`}
                  style={{ width: `${cancellationProbability}%` }}
                />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#1A1A1A]">{cancellationProbability}%</p>
                <p className="text-lg mt-1">{predictionSummary}</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg w-full max-w-md">
              <h3 className="font-bold text-[#1A5276] mb-2 flex items-center">
                <span className="material-icons mr-1">info</span>
                予測根拠
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                {reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PredictionResultSkeleton() {
  return (
    <section className="mb-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-[#1A1A1A] p-4 text-white">
          <h2 className="text-xl font-bold flex items-center">
            <span className="material-icons mr-2">analytics</span>
            試合中止予測
          </h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">低確率</span>
                <span className="text-sm">高確率</span>
              </div>
              <Skeleton className="h-5 w-full rounded-full mb-4" />
              <div className="text-center">
                <Skeleton className="h-10 w-24 mx-auto mb-2" />
                <Skeleton className="h-6 w-48 mx-auto" />
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg w-full max-w-md">
              <h3 className="font-bold text-[#1A5276] mb-2 flex items-center">
                <span className="material-icons mr-1">info</span>
                予測根拠
              </h3>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
