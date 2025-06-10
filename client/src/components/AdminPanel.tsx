import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Settings } from "lucide-react";

export function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState("");
  const [source, setSource] = useState("阪神タイガース公式");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateStatusMutation = useMutation({
    mutationFn: async (data: {
      status: string;
      announcement?: {
        timestamp: string;
        message: string;
        source: string;
      };
    }) => {
      const response = await fetch("/api/game/status", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to update status");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/game/today'] });
      toast({
        title: "更新完了",
        description: "試合状況が更新されました。",
      });
      setStatus("");
      setMessage("");
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "試合状況の更新に失敗しました。",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!status) return;

    const announcement = message.trim() ? {
      timestamp: new Date().toISOString(),
      message: message.trim(),
      source,
    } : undefined;

    updateStatusMutation.mutate({ status, announcement });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50"
      >
        <Settings className="h-4 w-4 mr-2" />
        管理パネル
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex justify-between items-center">
          試合状況管理
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            ×
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="status">試合状況</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="状況を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">開催予定</SelectItem>
              <SelectItem value="cancelled">試合中止</SelectItem>
              <SelectItem value="in_progress">試合中</SelectItem>
              <SelectItem value="completed">試合終了</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message">公式発表メッセージ（任意）</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="例: 雨天のため本日の試合は中止となりました"
            className="min-h-[60px]"
          />
        </div>

        <div>
          <Label htmlFor="source">発表元</Label>
          <Input
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="阪神タイガース公式"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!status || updateStatusMutation.isPending}
          className="w-full"
        >
          {updateStatusMutation.isPending ? "更新中..." : "状況を更新"}
        </Button>
      </CardContent>
    </Card>
  );
}