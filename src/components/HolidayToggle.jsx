import { CalendarOff, Calendar } from 'lucide-react';

export default function HolidayToggle({ holidayDates, toggleHoliday }) {
  const today = new Date();
  const dateKey = today.toISOString().slice(0, 10);
  const isHoliday = holidayDates.has(dateKey);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-wood-100 p-4">
      <button
        onClick={() => toggleHoliday(dateKey)}
        className="flex items-center justify-between w-full cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          {isHoliday ? (
            <CalendarOff size={18} className="text-red-400" />
          ) : (
            <Calendar size={18} className="text-gray-400" />
          )}
          <span className="text-sm text-gray-700">
            今日を祝日扱いにする
          </span>
        </div>

        <div className={`relative w-12 h-7 rounded-full transition-colors ${
          isHoliday ? 'bg-red-400' : 'bg-gray-200'
        }`}>
          <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
            isHoliday ? 'translate-x-5' : ''
          }`} />
        </div>
      </button>

      {isHoliday && (
        <p className="text-xs text-red-400 mt-2">
          夕食が {'\u{1F64B}\u200D\u2642\uFE0F'} 翔太に切り替わります
        </p>
      )}
    </div>
  );
}
