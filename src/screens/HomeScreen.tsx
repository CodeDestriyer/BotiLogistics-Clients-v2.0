import { Plane, Package, ChevronRight, User } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import type { Screen } from '../types';

interface Props {
  onNavigate: (screen: Screen) => void;
}

export default function HomeScreen({ onNavigate }: Props) {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-navy px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-blue-200/60 text-xs">Доброго дня</p>
            <h1 className="text-xl font-bold text-white">Привіт, Олена! 👋</h1>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center"
          >
            <User size={20} className="text-white" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('flights')}
            className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-4 text-left active:scale-[0.97] transition-transform"
          >
            <Plane size={28} className="text-accent mb-2" />
            <p className="text-white font-semibold text-sm">Забронювати рейс</p>
          </button>
          <button
            onClick={() => onNavigate('parcels')}
            className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-4 text-left active:scale-[0.97] transition-transform"
          >
            <Package size={28} className="text-accent mb-2" />
            <p className="text-white font-semibold text-sm">Відправити посилку</p>
          </button>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4 pb-4">
        {/* Active Orders */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-navy">Активні замовлення</h2>
            <button onClick={() => onNavigate('orders')} className="text-accent text-xs font-semibold flex items-center gap-0.5">
              Всі <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Plane size={18} className="text-navy" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Цюріх · 15 червня</p>
                  <p className="text-xs text-gray-400">1 місце</p>
                </div>
              </div>
              <StatusBadge status="confirmed" />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Package size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">УК→ЄВ · ТТН 59001234</p>
                  <p className="text-xs text-gray-400">3.5 кг</p>
                </div>
              </div>
              <StatusBadge status="transit" />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Package size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">ЄВ→УК · Кур'єр</p>
                  <p className="text-xs text-gray-400">Очікує забору</p>
                </div>
              </div>
              <StatusBadge status="pending" />
            </div>
          </div>
        </div>

        {/* Tariffs Banner */}
        <div
          className="bg-gradient-to-r from-navy to-navy-light rounded-2xl p-5 cursor-pointer active:scale-[0.98] transition-transform"
          onClick={() => onNavigate('tariffs')}
        >
          <p className="text-white font-bold text-base mb-1">Тарифи та ціни</p>
          <p className="text-blue-200/70 text-xs mb-0.5">Перевезення пасажирів від 70€</p>
          <p className="text-blue-200/70 text-xs mb-3">Посилки УК→ЄВ від 5€/кг</p>
          <span className="inline-flex items-center gap-1 text-accent text-sm font-semibold">
            Детальніше <ChevronRight size={16} />
          </span>
        </div>
      </div>
    </div>
  );
}
