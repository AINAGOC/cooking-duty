import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from './firebase';
import TodayCard from './components/TodayCard';
import Dashboard from './components/Dashboard';
import LunchStatus from './components/LunchStatus';
import HolidayToggle from './components/HolidayToggle';
import ExceptionRules from './components/ExceptionRules';

const DB_PATH = 'cooking-duty/state';

export default function App() {
  const [holidayDates, setHolidayDates] = useState(new Set());
  const [lunchPreparedMap, setLunchPreparedMap] = useState({});
  const [overrides, setOverridesMap] = useState({});
  const [weekOffset, setWeekOffset] = useState(0);
  const [synced, setSynced] = useState(false);

  // Firebase → ローカルstateにリアルタイム同期
  useEffect(() => {
    const unsub = onValue(ref(db, DB_PATH), (snapshot) => {
      const data = snapshot.val() || {};
      setHolidayDates(new Set(data.holidayDates || []));
      setLunchPreparedMap(data.lunchPrepared || {});
      setOverridesMap(data.overrides || {});
      setSynced(true);
    });
    return () => unsub();
  }, []);

  const todayKey = new Date().toISOString().slice(0, 10);
  const lunchPrepared = !!lunchPreparedMap[todayKey];

  // パス単位でupdateして同時編集の競合を防ぐ
  const toggleHoliday = (dateKey) => {
    if (!synced) return;
    setHolidayDates((prev) => {
      const next = new Set(prev);
      if (next.has(dateKey)) next.delete(dateKey);
      else next.add(dateKey);
      update(ref(db, DB_PATH), { holidayDates: [...next] });
      return next;
    });
  };

  const setLunchPrepared = (val) => {
    if (!synced) return;
    setLunchPreparedMap((prev) => {
      const next = { ...prev, [todayKey]: val };
      update(ref(db, `${DB_PATH}/lunchPrepared`), { [todayKey]: val });
      return next;
    });
  };

  const setOverride = (dateKey, meal, personKey) => {
    if (!synced) return;
    setOverridesMap((prev) => {
      const day = { ...(prev[dateKey] || {}) };
      if (personKey === null) {
        delete day[meal];
      } else {
        day[meal] = personKey;
      }
      const next = { ...prev };
      if (Object.keys(day).length === 0) {
        delete next[dateKey];
        update(ref(db, `${DB_PATH}/overrides`), { [dateKey]: null });
      } else {
        next[dateKey] = day;
        update(ref(db, `${DB_PATH}/overrides/${dateKey}`), { [meal]: personKey });
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen pb-8">
      <header className="bg-white/80 backdrop-blur sticky top-0 z-10 border-b border-wood-100">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-2">
          <span className="text-2xl">🍳</span>
          <h1 className="text-base font-bold text-gray-800">料理分担管理</h1>
          <span className={`ml-auto text-[10px] ${synced ? 'text-green-500' : 'text-gray-400'}`}>
            {synced ? '● 接続済み' : '○ 接続中...'}
          </span>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-4 space-y-4">
        <TodayCard holidayDates={holidayDates} overrides={overrides} setOverride={setOverride} />
        <HolidayToggle holidayDates={holidayDates} toggleHoliday={toggleHoliday} />
        <LunchStatus
          lunchPrepared={lunchPrepared}
          setLunchPrepared={setLunchPrepared}
          holidayDates={holidayDates}
        />
        <Dashboard
          holidayDates={holidayDates}
          weekOffset={weekOffset}
          setWeekOffset={setWeekOffset}
          overrides={overrides}
          setOverride={setOverride}
        />
        <ExceptionRules />
      </main>
    </div>
  );
}
