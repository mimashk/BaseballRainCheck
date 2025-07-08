'use client'

import { useQuery } from '@tanstack/react-query'
import { ForecastHour } from '@/types'
import { formatTemperature, formatPrecipitation, formatHumidity, formatWindSpeed } from '@/lib/utils'

export function ForecastSection() {
  const { data: forecastHours, isLoading } = useQuery<ForecastHour[]>({
    queryKey: ['/api/weather/forecast'],
    refetchInterval: 300000, // Refetch every 5 minutes
  })

  if (isLoading) {
    return <ForecastSkeleton />
  }

  if (!forecastHours || forecastHours.length === 0) {
    return (
      <section className="bg-white rounded-lg card-shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">天気予報</h2>
        <p className="text-center text-gray-500">天気予報データを取得できませんでした</p>
      </section>
    )
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "晴れ": return "wb_sunny"
      case "曇り": return "wb_cloudy"
      case "小雨": return "grain"
      case "雨": return "umbrella"
      default: return "cloud"
    }
  }

  return (
    <section className="bg-white rounded-lg card-shadow p-6 hover-scale">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="material-icons mr-2 text-primary">
          schedule
        </span>
        天気予報
      </h2>
      
      <div className="space-y-3">
        {forecastHours.map((hour, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-3">
              <span className="material-icons text-primary mr-3">
                {getWeatherIcon(hour.weatherCondition)}
              </span>
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
    </section>
  )
}

function ForecastSkeleton() {
  return (
    <section className="bg-white rounded-lg card-shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="material-icons mr-2 text-primary">
          schedule
        </span>
        天気予報
      </h2>
      
      <div className="space-y-3">
        {[1, 2, 3, 4].map((idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="h-6 w-6 bg-gray-200 rounded mr-3 animate-pulse"></div>
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="text-center">
                <div className="h-4 w-8 bg-gray-200 rounded mb-1 mx-auto animate-pulse"></div>
                <div className="h-5 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="h-4 w-12 bg-gray-200 rounded mb-1 mx-auto animate-pulse"></div>
                <div className="h-5 w-16 bg-gray-200 rounded mx-auto animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="h-4 w-8 bg-gray-200 rounded mb-1 mx-auto animate-pulse"></div>
                <div className="h-5 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="h-4 w-8 bg-gray-200 rounded mb-1 mx-auto animate-pulse"></div>
                <div className="h-5 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}