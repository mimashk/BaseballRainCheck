import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ForecastHour } from "@/lib/types";
import { formatTemperature, formatPrecipitation, formatHumidity, formatWindSpeed } from "@/lib/utils";

export function ForecastSection() {
  const { data: forecastHours, isLoading } = useQuery<ForecastHour[]>({
    queryKey: ["/api/weather/forecast"],
  });
  
  if (isLoading) {
    return <ForecastSkeleton />;
  }
  
  if (!forecastHours || forecastHours.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader className="bg-[#3498db] p-4 text-white">
          <CardTitle className="text-xl font-bold flex items-center">
            <span className="material-icons mr-2">schedule</span>
            天気予報
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-center py-6">
            <p className="text-gray-500">天気予報データがありません</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <section className="mb-8">
      <Card className="rounded-xl">
        <CardHeader className="bg-[#3498db] p-4 text-white rounded-t-xl">
          <CardTitle className="text-xl font-bold flex items-center">
            <span className="material-icons mr-2">schedule</span>
            天気予報
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="space-y-3">
            {forecastHours.map((hour, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <span className="material-icons text-[#3498db] mr-3">{hour.icon || "cloud"}</span>
                  <span className="font-medium text-lg">{hour.time}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="text-center">
                    <div className="text-gray-500">気温</div>
                    <div className="font-bold">{formatTemperature(hour.temperature)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-500">降水量</div>
                    <div className="font-bold">{formatPrecipitation(hour.precipitation)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-500">湿度</div>
                    <div className="font-bold">{formatHumidity(hour.humidity)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-500">風速</div>
                    <div className="font-bold">{formatWindSpeed(hour.windSpeed)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function ForecastSkeleton() {
  return (
    <section className="mb-8">
      <Card className="rounded-xl">
        <CardHeader className="bg-[#3498db] p-4 text-white rounded-t-xl">
          <CardTitle className="text-xl font-bold flex items-center">
            <span className="material-icons mr-2">schedule</span>
            天気予報
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="space-y-3">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <Skeleton className="h-6 w-6 mr-3" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="text-center">
                    <Skeleton className="h-4 w-8 mb-1 mx-auto" />
                    <Skeleton className="h-5 w-12 mx-auto" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-4 w-12 mb-1 mx-auto" />
                    <Skeleton className="h-5 w-16 mx-auto" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-4 w-8 mb-1 mx-auto" />
                    <Skeleton className="h-5 w-12 mx-auto" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-4 w-8 mb-1 mx-auto" />
                    <Skeleton className="h-5 w-12 mx-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
