'use client'

import { useQuery } from '@tanstack/react-query'
import { HistoricalDataEntry } from '@/types'
import { formatPrecipitation, formatTemperature, formatDateString } from '@/lib/utils'

export function HistoricalData() {
  const { data: historicalData, isLoading } = useQuery<HistoricalDataEntry[]>({
    queryKey: ['/api/history'],
    staleTime: 600000, // 10 minutes
  })

  if (isLoading) {
    return <HistoricalDataSkeleton />
  }

  if (!historicalData || historicalData.length === 0) {
    return (
      <section className="bg-white rounded-lg card-shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">過去の試合実績</h2>
        <p className="text-center text-gray-500">履歴データを取得できませんでした</p>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-lg card-shadow p-6 hover-scale">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="material-icons mr-2 text-primary">
          history
        </span>
        過去の試合実績
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-2 font-semibold text-gray-600">日付</th>
              <th className="text-left p-2 font-semibold text-gray-600">対戦</th>
              <th className="text-center p-2 font-semibold text-gray-600">気温</th>
              <th className="text-center p-2 font-semibold text-gray-600">降水量</th>
              <th className="text-center p-2 font-semibold text-gray-600">結果</th>
            </tr>
          </thead>
          <tbody>
            {historicalData.map((entry, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-2 text-gray-700">
                  {formatDateString(entry.date)}
                </td>
                <td className="p-2 text-gray-700">
                  {entry.homeTeam} vs {entry.awayTeam}
                </td>
                <td className="p-2 text-center text-gray-700">
                  {formatTemperature(entry.temperature)}
                </td>
                <td className="p-2 text-center text-gray-700">
                  {formatPrecipitation(entry.precipitation)}
                </td>
                <td className="p-2 text-center">
                  {entry.wasCancelled ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <span className="material-icons text-xs mr-1">cancel</span>
                      中止
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <span className="material-icons text-xs mr-1">check_circle</span>
                      開催
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">
              {historicalData.filter(d => d.wasCancelled).length}
            </div>
            <div className="text-sm text-gray-600">中止</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {historicalData.filter(d => !d.wasCancelled).length}
            </div>
            <div className="text-sm text-gray-600">開催</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HistoricalDataSkeleton() {
  return (
    <section className="bg-white rounded-lg card-shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="material-icons mr-2 text-primary">
          history
        </span>
        過去の試合実績
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-2 font-semibold text-gray-600">日付</th>
              <th className="text-left p-2 font-semibold text-gray-600">対戦</th>
              <th className="text-center p-2 font-semibold text-gray-600">気温</th>
              <th className="text-center p-2 font-semibold text-gray-600">降水量</th>
              <th className="text-center p-2 font-semibold text-gray-600">結果</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((idx) => (
              <tr key={idx} className="border-b border-gray-100">
                <td className="p-2"><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                <td className="p-2"><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                <td className="p-2"><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                <td className="p-2"><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                <td className="p-2"><div className="h-6 bg-gray-200 rounded-full animate-pulse"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}