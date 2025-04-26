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
    <Card className="h-full">
      <CardHeader className="bg-[#3498db] p-4 text-white">
        <CardTitle className="text-xl font-bold flex items-center">
          <span className="material-icons mr-2">schedule</span>
          天気予報
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          {forecastHours.map((hour, index) => (
            <div key={index} className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center">
                <span className="material-icons text-[#3498db] mr-2">{hour.icon || "cloud"}</span>
                <span>{hour.time}</span>
              </div>
              <div className="flex items-center">
                <span>{formatTemperature(hour.temperature)}</span>
                <div className="ml-3 w-16 text-right">
                  <span>{formatPrecipitation(hour.precipitation)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ForecastSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="bg-[#3498db] p-4 text-white">
        <CardTitle className="text-xl font-bold flex items-center">
          <span className="material-icons mr-2">schedule</span>
          天気予報
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} className="flex items-center justify-between p-2 border-b">
              <Skeleton className="h-6 w-24" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
