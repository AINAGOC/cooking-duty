import { AlertTriangle, CheckCircle } from 'lucide-react';
import { getPrevNightDuty } from '../scheduleRules';

export default function LunchStatus({ lunchPrepared, setLunchPrepared, holidayDates }) {
  const today = new Date();
  const dow = today.getDay();
  const isWeekend = dow === 0 || dow === 6;
  const dateKey = today.toISOString().slice(0, 10);
  const isHoliday = holidayDates.has(dateKey);

  if (isWeekend || isHoliday) {
    return null;
  }

  const prevDuty = getPrevNightDuty(today, false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-wood-100 p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-3">今日の昼食チェック</h3>

      <button
        onClick={() => setLunchPrepared(!lunchPrepared)}
        className="flex items-center gap-3 cursor-pointer select-none w-full"
      >
        <div className={`relative w-12 h-7 rounded-full transition-colors ${
          lunchPrepared ? 'bg-leaf-400' : 'bg-gray-200'
        }`}>
          <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
            lunchPrepared ? 'translate-x-5' : ''
          }`} />
        </div>
        <span className="text-sm text-gray-700">
          昨夜、昼食分を作れた？
        </span>
      </button>

      <div className="mt-3">
        {lunchPrepared ? (
          <div className="flex items-center gap-2 text-leaf-500 bg-leaf-50 rounded-xl px-3 py-2">
            <CheckCircle size={18} />
            <span className="text-sm">
              {prevDuty.emoji} {prevDuty.name}が準備済み
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 rounded-xl px-3 py-2">
            <AlertTriangle size={18} />
            <span className="text-sm">
              昼食は {prevDuty.emoji} {prevDuty.name}の負担（自費購入）
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
