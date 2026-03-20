import { Utensils } from 'lucide-react';
import { getDuty, DAYS } from '../scheduleRules';

export default function TodayCard({ holidayDates }) {
  const today = new Date();
  const dateKey = today.toISOString().slice(0, 10);
  const isHoliday = holidayDates.has(dateKey);
  const duty = getDuty(today, isHoliday);

  const formatted = `${today.getMonth() + 1}/${today.getDate()}（${DAYS[today.getDay()]}）`;

  return (
    <div className="bg-gradient-to-br from-leaf-400 to-leaf-500 rounded-2xl shadow-md p-5 text-white">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-leaf-100 text-xs">TODAY</p>
          <p className="text-xl font-bold">{formatted}</p>
        </div>
        <Utensils size={28} className="text-leaf-100" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <MealBlock label="朝食" person={duty.breakfast} />
        <MealBlock label="昼食" person={duty.lunch} />
        <MealBlock label="夕食" person={duty.dinner} />
      </div>
    </div>
  );
}

function MealBlock({ label, person }) {
  return (
    <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
      <p className="text-[10px] text-leaf-100 uppercase tracking-wider">{label}</p>
      <p className="text-3xl mt-1">{person.emoji}</p>
      <p className="text-xs mt-1 font-medium">{person.name}</p>
    </div>
  );
}
