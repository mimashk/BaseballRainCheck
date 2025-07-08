'use client'

import { Header } from '@/components/Header'
import { GameInfo } from '@/components/GameInfo'
import { WeatherSummary } from '@/components/WeatherSummary'
import { ForecastSection } from '@/components/ForecastSection'
import { PredictionResult } from '@/components/PredictionResult'
import { HistoricalData } from '@/components/HistoricalData'
import { AdminPanel } from '@/components/AdminPanel'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <GameInfo />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <WeatherSummary />
          <ForecastSection />
        </div>
        
        <PredictionResult />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <HistoricalData />
          </div>
          <div>
            <AdminPanel />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}