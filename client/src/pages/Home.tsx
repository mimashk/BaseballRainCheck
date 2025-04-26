import { Header } from "@/components/Header";
import { WeatherSummary } from "@/components/WeatherSummary";
import { PredictionResult } from "@/components/PredictionResult";
import { ForecastSection } from "@/components/ForecastSection";
import { GameInfo } from "@/components/GameInfo";
import { HistoricalData } from "@/components/HistoricalData";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <WeatherSummary />
        <PredictionResult />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ForecastSection />
          <GameInfo />
        </div>
        
        <HistoricalData />
      </main>
      
      <Footer />
    </div>
  );
}
