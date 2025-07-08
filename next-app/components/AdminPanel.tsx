'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export function AdminPanel() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [message, setMessage] = useState('')
  const queryClient = useQueryClient()

  const updateGameStatus = async (status: string, announcement?: { message: string; source: string }) => {
    setIsUpdating(true)
    try {
      const response = await fetch('/api/game/today', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          announcement
        }),
      })

      if (response.ok) {
        // Invalidate and refetch game data
        queryClient.invalidateQueries({ queryKey: ['/api/game/today'] })
        setMessage('ステータスを更新しました')
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error('Failed to update status')
      }
    } catch (error) {
      setMessage('更新に失敗しました')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <section className="bg-white rounded-lg card-shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="material-icons mr-2 text-primary">
          admin_panel_settings
        </span>
        管理者パネル
      </h2>
      
      {message && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg text-blue-700 text-sm">
          {message}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            試合ステータス更新
          </h3>
          
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => updateGameStatus('scheduled')}
              disabled={isUpdating}
              className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-icons text-sm mr-2">schedule</span>
              予定通り開催
            </button>
            
            <button
              onClick={() => updateGameStatus('cancelled', {
                message: '雨天のため本日の試合は中止となりました',
                source: 'Manual Update'
              })}
              disabled={isUpdating}
              className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-icons text-sm mr-2">cancel</span>
              雨天中止
            </button>
            
            <button
              onClick={() => updateGameStatus('in_progress', {
                message: '試合開始。現在進行中です',
                source: 'Manual Update'
              })}
              disabled={isUpdating}
              className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-icons text-sm mr-2">play_circle</span>
              試合開始
            </button>
            
            <button
              onClick={() => updateGameStatus('completed', {
                message: '試合終了しました',
                source: 'Manual Update'
              })}
              disabled={isUpdating}
              className="flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-icons text-sm mr-2">check_circle</span>
              試合終了
            </button>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="text-md font-semibold text-gray-700 mb-2">
            外部API連携
          </h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• 阪神タイガース公式API</p>
            <p>• NPB公式発表API</p>
            <p>• 気象庁雨雲監視API</p>
          </div>
          <button
            disabled={true}
            className="mt-2 w-full flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
          >
            <span className="material-icons text-sm mr-2">sync</span>
            自動監視 (開発中)
          </button>
        </div>
        
        <div className="border-t pt-4">
          <div className="text-xs text-gray-500">
            <p>最終更新: {new Date().toLocaleString('ja-JP')}</p>
            <p>ML Service: 接続中</p>
          </div>
        </div>
      </div>
    </section>
  )
}