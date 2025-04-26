import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { HistoricalDataEntry } from "@/lib/types";
import { formatDate, formatMatchup, formatPrecipitation, formatTemperature } from "@/lib/utils";

export function HistoricalData() {
  const [offset, setOffset] = useState(0);
  const limit = 10;
  
  const { data: historicalData, isLoading, isFetching } = useQuery<HistoricalDataEntry[]>({
    queryKey: ["/api/history", { limit, offset }],
  });
  
  const loadMore = () => {
    if (historicalData && historicalData.length >= limit) {
      setOffset(offset + limit);
    }
  };
  
  if (isLoading) {
    return <HistoricalDataSkeleton />;
  }
  
  if (!historicalData || historicalData.length === 0) {
    return (
      <section className="mb-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-800 text-white">
            <h2 className="text-xl font-bold flex items-center">
              <span className="material-icons mr-2">insights</span>
              過去の雨天中止データ
            </h2>
          </div>
          
          <div className="p-6 text-center">
            <p className="text-gray-500">過去データがありません</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="mb-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-800 text-white">
          <h2 className="text-xl font-bold flex items-center">
            <span className="material-icons mr-2">insights</span>
            過去の雨天中止データ
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="py-3 px-4 text-left font-medium">日付</th>
                <th className="py-3 px-4 text-left font-medium">対戦</th>
                <th className="py-3 px-4 text-left font-medium">降水量</th>
                <th className="py-3 px-4 text-left font-medium">気温</th>
                <th className="py-3 px-4 text-left font-medium">結果</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {historicalData.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{formatDate(item.date)}</td>
                  <td className="py-2 px-4">{formatMatchup(item.homeTeam, item.awayTeam)}</td>
                  <td className="py-2 px-4">{formatPrecipitation(item.precipitation)}</td>
                  <td className="py-2 px-4">{formatTemperature(item.temperature)}</td>
                  <td className="py-2 px-4">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.wasCancelled 
                          ? "bg-red-100 text-red-800" 
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.wasCancelled ? "中止" : "実施"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-gray-50 text-sm text-gray-700 flex justify-center">
          <Button
            onClick={loadMore}
            disabled={isFetching || historicalData.length < limit}
            variant="ghost"
            className="text-blue-600 flex items-center"
          >
            過去のデータをもっと見る
            <span className="material-icons text-sm ml-1">arrow_downward</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

function HistoricalDataSkeleton() {
  return (
    <section className="mb-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-800 text-white">
          <h2 className="text-xl font-bold flex items-center">
            <span className="material-icons mr-2">insights</span>
            過去の雨天中止データ
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="py-3 px-4 text-left font-medium">日付</th>
                <th className="py-3 px-4 text-left font-medium">対戦</th>
                <th className="py-3 px-4 text-left font-medium">降水量</th>
                <th className="py-3 px-4 text-left font-medium">気温</th>
                <th className="py-3 px-4 text-left font-medium">結果</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="border-b">
                  <td className="py-2 px-4"><Skeleton className="h-5 w-24" /></td>
                  <td className="py-2 px-4"><Skeleton className="h-5 w-28" /></td>
                  <td className="py-2 px-4"><Skeleton className="h-5 w-16" /></td>
                  <td className="py-2 px-4"><Skeleton className="h-5 w-16" /></td>
                  <td className="py-2 px-4"><Skeleton className="h-5 w-12" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-gray-50 text-sm text-gray-700 flex justify-center">
          <Skeleton className="h-8 w-40" />
        </div>
      </div>
    </section>
  );
}
