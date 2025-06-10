import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ForecastHour } from "@/lib/types";
import { formatTemperature, formatPrecipitation } from "@/lib/utils";

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
    <div className="mb-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="bg-[#3498db] p-4 text-white">
          <CardTitle className="text-xl font-bold flex items-center">
            <span className="material-icons mr-2">schedule</span>
            天気予報
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {forecastHours.map((hour, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="material-icons text-[#3498db] mr-2">{hour.icon || "cloud"}</span>
                  <span className="font-medium">{hour.time}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-500">気温</div>
                    <div className="font-bold">{formatTemperature(hour.temperature)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">降水量</div>
                    <div className="font-bold">{formatPrecipitation(hour.precipitation)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ForecastSkeleton() {
  return (
    <div className="mb-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="bg-[#3498db] p-4 text-white">
          <CardTitle className="text-xl font-bold flex items-center">
            <span className="material-icons mr-2">schedule</span>
            天気予報
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Skeleton className="h-6 w-6 mr-2" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <Skeleton className="h-4 w-8 mb-1" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-12 mb-1" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
