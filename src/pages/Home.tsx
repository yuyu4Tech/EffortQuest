import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/Calendar";
import { format } from "date-fns";

export default function Home() {
  const maxDay = 66;
  const todayKey = format(new Date(), "yyyy-MM-dd");

  const [day, setDay] = useState(1);
  const [habitLog, setHabitLog] = useState<{ [date: string]: boolean }>({});
  const [canProgress, setCanProgress] = useState(true);

  // 初期化（localStorage 読み込み）
  useEffect(() => {
    const savedDay = parseInt(localStorage.getItem("day") || "1");
    const savedLog = JSON.parse(localStorage.getItem("habitLog") || "{}");
    setDay(savedDay);
    setHabitLog(savedLog);
    setCanProgress(!savedLog[todayKey]);
  }, []);

  const handleProgress = () => {
    if (!canProgress || day >= maxDay) return;

    const updatedLog = { ...habitLog, [todayKey]: true };
    const updatedDay = day + 1;

    setHabitLog(updatedLog);
    setDay(updatedDay);
    setCanProgress(false);

    localStorage.setItem("habitLog", JSON.stringify(updatedLog));
    localStorage.setItem("day", updatedDay.toString());
  };

  const getStage = () => {
    if (day < 18) return "🟡 初期習慣化ゾーン";
    if (day < 66) return "🟢 自動化ブースト期間";
    return "🔵 習慣化済み！";
  };

  return (
    <main className="p-6 max-w-xl mx-auto text-center space-y-6">

      <Card>
        <CardContent className="py-6">
          <h2 className="text-xl font-semibold mb-4">あなたの習慣進捗</h2>
          <p className="mb-2">現在: <strong>{day}</strong> 日目</p>
          <Progress value={(day / maxDay) * 100} className="h-4" />
          <p className="mt-2">{getStage()}</p>
        </CardContent>
      </Card>

      <Button onClick={handleProgress} disabled={!canProgress}>
        +1日 続けた！
      </Button>

      {!canProgress && (
        <div className="text-xs text-gray-500">今日は既にカウント済みです</div>
      )}

      <div className="text-sm text-gray-500">
        目標達成まであと {maxDay - day} 日です
      </div>

      <h2 className="text-lg font-semibold mt-10">📅 カレンダー</h2>
      <Calendar log={habitLog} />
    </main>
  );
}
