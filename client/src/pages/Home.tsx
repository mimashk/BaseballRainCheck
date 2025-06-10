import { Header } from "@/components/Header";
import { WeatherSummary } from "@/components/WeatherSummary";
import { PredictionResult } from "@/components/PredictionResult";
import { ForecastSection } from "@/components/ForecastSection";
import { GameInfo } from "@/components/GameInfo";
import { GameStatusDisplay } from "@/components/GameStatusDisplay";
import { AdminPanel } from "@/components/AdminPanel";
import { HistoricalData } from "@/components/HistoricalData";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { GameInfo as GameInfoType } from "@/lib/types";

export default function Home() {
  const { data: gameInfo } = useQuery<GameInfoType>({
    queryKey: ['/api/game/today'],
    refetchInterval: 30000, // Refetch every 30 seconds to check for status updates
  });

  // Show different layout based on game status
  const showPrediction = !gameInfo?.status || gameInfo.status === 'scheduled';
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        {gameInfo && <GameStatusDisplay gameInfo={gameInfo} />}
        
        <WeatherSummary />
        
        {showPrediction && <PredictionResult />}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ForecastSection />
          {!gameInfo && <GameInfo />}
        </div>
        
        <HistoricalData />
      </main>
      
      <Footer />
    </div>
  );
}
