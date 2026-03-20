import { Info } from 'lucide-react';

const RULES = [
  {
    title: '用事でスキップするとき',
    detail: '担当者がスキップする場合、相手が代わりに作るか、外食にする',
  },
  {
    title: '外食は割り勘',
    detail: '2人で外食する場合は、曜日の担当に関係なく割り勘',
  },
  {
    title: '基本調味料・米・油',
    detail: '共通費で購入（品質維持を優先）。個別食材は担当者が自費で購入',
  },
];

export default function ExceptionRules() {
  return (
    <div className="bg-wood-50 rounded-2xl border border-wood-100 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Info size={16} className="text-wood-400" />
        <h3 className="text-sm font-medium text-wood-400">ルール・メモ</h3>
      </div>
      <ul className="space-y-2">
        {RULES.map((rule) => (
          <li key={rule.title}>
            <p className="text-sm font-medium text-gray-700">{rule.title}</p>
            <p className="text-xs text-gray-400">{rule.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
