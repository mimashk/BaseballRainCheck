'use client'

import { useQuery } from '@tanstack/react-query'
import { PredictionResult as PredictionResultType } from '@/types'

export function PredictionResult() {
  const { data: prediction, isLoading } = useQuery<PredictionResultType>({
    queryKey: ['/api/prediction'],
    refetchInterval: 300000, // Refetch every 5 minutes
  })

  if (isLoading) {
    return <PredictionResultSkeleton />
  }

  if (!prediction) {
    return (
      <section className="bg-white rounded-lg card-shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">中止確率予測</h2>
        <p className="text-center text-gray-500">予測データを取得できませんでした</p>
      </section>
    )
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-red-600'
    if (probability >= 60) return 'text-orange-600'
    if (probability >= 40) return 'text-yellow-600'
    if (probability >= 20) return 'text-blue-600'
    return 'text-green-600'
  }

  const getProbabilityBgColor = (probability: number) => {
    if (probability >= 80) return 'bg-red-100 border-red-300'
    if (probability >= 60) return 'bg-orange-100 border-orange-300'
    if (probability >= 40) return 'bg-yellow-100 border-yellow-300'
    if (probability >= 20) return 'bg-blue-100 border-blue-300'
    return 'bg-green-100 border-green-300'
  }

  const getPredictionIcon = (probability: number) => {
    if (probability >= 80) return 'cancel'
    if (probability >= 60) return 'warning'
    if (probability >= 40) return 'help'
    if (probability >= 20) return 'check_circle'
    return 'check_circle'
  }

  return (
    <section className="bg-white rounded-lg card-shadow p-6 hover-scale">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="material-icons mr-2 text-primary">
          analytics
        </span>
        AI予測結果
      </h2>
      
      <div className={`rounded-lg p-6 border-2 ${getProbabilityBgColor(prediction.cancellationProbability)} mb-6`}>
        <div className="text-center">
          <span className={`material-icons text-4xl block mb-3 ${getProbabilityColor(prediction.cancellationProbability)}`}>
            {getPredictionIcon(prediction.cancellationProbability)}
          </span>
          
          <div className={`text-5xl font-bold mb-2 ${getProbabilityColor(prediction.cancellationProbability)}`}>
            {prediction.cancellationProbability}%
          </div>
          
          <div className="text-lg font-semibold text-gray-700 mb-3">
            中止確率
          </div>
          
          <div className="text-gray-600">
            {prediction.predictionSummary}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span className="material-icons mr-2 text-orange-500">info</span>
            予測理由
          </h3>
          <ul className="space-y-2">
            {prediction.reasons.map((reason, index) => (
              <li key={index} className="flex items-start">
                <span className="material-icons text-sm text-gray-400 mr-2 mt-0.5">
                  arrow_forward
                </span>
                <span className="text-gray-700">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            過去の類似条件での実績
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-red-50 p-3 rounded-lg text-center">
              <div className="text-red-600 font-bold text-xl">
                {prediction.historicalSimilarCancelled}
              </div>
              <div className="text-gray-600">中止</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-green-600 font-bold text-xl">
                {prediction.historicalSimilarPlayed}
              </div>
              <div className="text-gray-600">開催</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PredictionResultSkeleton() {
  return (
    <section className="bg-white rounded-lg card-shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="material-icons mr-2 text-primary">
          analytics
        </span>
        AI予測結果
      </h2>
      
      <div className="rounded-lg p-6 border-2 bg-gray-50 border-gray-200 mb-6">
        <div className="text-center">
          <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse"></div>
          <div className="h-12 w-24 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
          <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-3 animate-pulse"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-3 animate-pulse"></div>
          <ul className="space-y-2">
            {[1, 2, 3].map((idx) => (
              <li key={idx} className="flex items-start">
                <div className="h-4 w-4 bg-gray-200 rounded mr-2 mt-0.5 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse"></div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-t pt-4">
          <div className="h-6 w-48 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-1 animate-pulse"></div>
              <div className="h-4 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-1 animate-pulse"></div>
              <div className="h-4 w-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}