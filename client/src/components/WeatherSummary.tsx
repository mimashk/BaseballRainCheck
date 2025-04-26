import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { CurrentWeather } from "@/lib/types";
import { formatTemperature, formatPrecipitation, formatHumidity, formatWindSpeed, formatDateString } from "@/lib/utils";

export function WeatherSummary() {
  const { data: weather, isLoading } = useQuery<CurrentWeather>({
    queryKey: ["/api/weather/current"],
  });
  
  if (isLoading) {
    return <WeatherSummarySkeleton />;
  }
  
  // Fallback in case API fails
  if (!weather) {
    return (
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-red-500">天気データの取得に失敗しました。更新ボタンを押して再試行してください。</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <section className="mb-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#3498db] to-[#85C1E9] p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">現在の天気</h2>
              <p className="text-sm opacity-90">{formatDateString(weather.timestamp)}</p>
            </div>
            <div className="text-5xl flex flex-col items-center">
              <span className="material-icons text-5xl">{weather.icon || "cloud"}</span>
              <span className="font-bold text-2xl mt-1">{formatTemperature(weather.temperature)}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
              <span className="text-sm text-gray-500">降水量</span>
              <div className="flex items-end">
                <span className="material-icons text-[#2471A3] mr-1">water_drop</span>
                <span className="text-lg font-medium">{formatPrecipitation(weather.precipitation)}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
              <span className="text-sm text-gray-500">湿度</span>
              <div className="flex items-end">
                <span className="material-icons text-[#3498db] mr-1">opacity</span>
                <span className="text-lg font-medium">{formatHumidity(weather.humidity)}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
              <span className="text-sm text-gray-500">風速</span>
              <div className="flex items-end">
                <span className="material-icons text-gray-600 mr-1">air</span>
                <span className="text-lg font-medium">{formatWindSpeed(weather.windSpeed)}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
              <span className="text-sm text-gray-500">天気</span>
              <div className="flex items-end">
                <span className="material-icons text-[#BDC3C7] mr-1">{weather.icon || "cloud"}</span>
                <span className="text-lg font-medium">{weather.weatherCondition}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WeatherSummarySkeleton() {
  return (
    <section className="mb-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#3498db] to-[#85C1E9] p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-7 w-32 bg-white/20" />
              <Skeleton className="h-4 w-40 mt-2 bg-white/20" />
            </div>
            <div className="flex flex-col items-center">
              <Skeleton className="h-14 w-14 rounded-full bg-white/20" />
              <Skeleton className="h-6 w-16 mt-2 bg-white/20" />
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-lg">
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
