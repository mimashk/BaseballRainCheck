import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const handleRefreshWeather = useCallback(async () => {
    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["/api/weather/current"] }),
        queryClient.invalidateQueries({ queryKey: ["/api/weather/forecast"] }),
        queryClient.invalidateQueries({ queryKey: ["/api/prediction"] })
      ]);
      
      toast({
        title: "更新完了",
        description: "天気データと予測が更新されました。",
      });
    } catch (error) {
      toast({
        title: "更新エラー",
        description: "データの更新に失敗しました。",
        variant: "destructive",
      });
    }
  }, [queryClient, toast]);
  
  return (
    <header className="bg-[#FFDB00] shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-[#1A1A1A] text-xl md:text-2xl font-bold flex items-center">
          <span className="material-icons mr-2">sports_baseball</span>
          甲子園 雨天中止予測
        </h1>
        <div className="flex items-center">
          <Button 
            onClick={handleRefreshWeather}
            className="bg-[#1A1A1A] text-white px-3 py-1.5 rounded-md text-sm flex items-center hover:bg-gray-800"
          >
            <span className="material-icons text-sm mr-1">refresh</span>
            更新
          </Button>
        </div>
      </div>
    </header>
  );
}
