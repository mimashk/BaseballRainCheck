'use client'

import { useQuery } from '@tanstack/react-query'
import { GameInfo as GameInfoType } from '@/types'
import { GameStatusDisplay } from './GameStatusDisplay'

export function GameInfo() {
  const { data: gameInfo, isLoading } = useQuery<GameInfoType>({
    queryKey: ['/api/game/today'],
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  if (isLoading) {
    return <GameInfoSkeleton />
  }

  if (!gameInfo) {
    return (
      <section className="bg-white rounded-lg card-shadow p-6">
        <p className="text-center text-gray-500">試合情報を取得できませんでした</p>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-lg card-shadow p-6 hover-scale">
      <GameStatusDisplay gameInfo={gameInfo} />
    </section>
  )
}

function GameInfoSkeleton() {
  return (
    <section className="bg-white rounded-lg card-shadow p-6">
      <div className="text-center space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
      </div>
    </section>
  )
}