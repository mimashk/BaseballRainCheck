'use client'

import { useQuery } from '@tanstack/react-query'
import { CurrentWeather } from '@/types'
import { formatTemperature, formatPrecipitation, formatHumidity, formatWindSpeed } from '@/lib/utils'

export function WeatherSummary() {
  const { data: currentWeather, isLoading } = useQuery<CurrentWeather>({
    queryKey: ['/api/weather/current'],
    refetchInterval: 300000, // Refetch every 5 minutes
  })

  if (isLoading) {
    return <WeatherSummarySkeleton />
  }

  if (!currentWeather) {
    return (
      <section className="bg-white rounded-lg card-shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">現在の天気</h2>
        <p className="text-center text-gray-500">天気データを取得できませんでした</p>
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

  const getWeatherColor = (condition: string) => {
    switch (condition) {
      case "晴れ": return "text-yellow-500"
      case "曇り": return "text-gray-500"
      case "小雨": return "text-blue-400"
      case "雨": return "text-blue-600"
      default: return "text-gray-400"
    }
  }

  return (
    <section className="bg-white rounded-lg card-shadow p-6 hover-scale">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="material-icons mr-2 text-primary">
          thermostat
        </span>
        現在の天気
      </h2>
      
      <div className="text-center mb-6">
        <span className={`material-icons text-5xl mb-2 block ${getWeatherColor(currentWeather.weatherCondition)}`}>
          {getWeatherIcon(currentWeather.weatherCondition)}
        </span>
        <div className="text-2xl font-bold text-gray-800 mb-1">
          {currentWeather.weatherCondition}
        </div>
        <div className="text-sm text-gray-500">
          {new Date(currentWeather.timestamp).toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit'
          })} 更新
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">気温</div>
          <div className="text-lg font-bold text-gray-800">
            {formatTemperature(currentWeather.temperature)}
          </div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">降水量</div>
          <div className="text-lg font-bold text-gray-800">
            {formatPrecipitation(currentWeather.precipitation)}
          </div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">湿度</div>
          <div className="text-lg font-bold text-gray-800">
            {formatHumidity(currentWeather.humidity)}
          </div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">風速</div>
          <div className="text-lg font-bold text-gray-800">
            {formatWindSpeed(currentWeather.windSpeed)}
          </div>
        </div>
      </div>
    </section>
  )
}

function WeatherSummarySkeleton() {
  return (
    <section className="bg-white rounded-lg card-shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="material-icons mr-2 text-primary">
          thermostat
        </span>
        現在の天気
      </h2>
      
      <div className="text-center mb-6">
        <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-2 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-32 mx-auto mb-1 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((idx) => (
          <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="h-4 bg-gray-200 rounded w-12 mx-auto mb-1 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
          </div>
        ))}
      </div>
    </section>
  )
}