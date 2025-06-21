import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";

interface CalendarProps {
  log: { [date: string]: boolean };
}

export const Calendar = ({ log }: CalendarProps) => {
  const today = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  const startWeekDay = getDay(startOfMonth(today)); // 日曜 = 0
  const blankDays = new Array(startWeekDay).fill(null);

  return (
    <div className="max-w-xs mx-auto">
      <div className="grid grid-cols-7 gap-1 text-sm text-center font-semibold text-gray-500 mb-2">
        {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-sm text-center">
        {blankDays.map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {days.map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const isDone = log[key];
          return (
            <div
              key={key}
              className={`border rounded h-12 flex flex-col items-center justify-center ${
                isDone ? "bg-purple-300 text-white" : "bg-gray-100"
              }`}
            >
              <span>{format(day, "d")}</span>
              {isDone && <span className="text-xs">✅</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};