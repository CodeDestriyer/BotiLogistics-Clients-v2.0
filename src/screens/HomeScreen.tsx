import { Bus, Package, User, MessageCircle, Tag } from 'lucide-react';
import type { Screen } from '../types';

interface Props {
  onNavigate: (screen: Screen) => void;
}

export default function HomeScreen({ onNavigate }: Props) {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-navy px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200/50 text-xs mb-0.5">Доброго дня</p>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Привіт, Олена! 👋</h1>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center border border-white/10"
          >
            <User size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* 4 Action Cards */}
      <div className="px-4 mt-5 space-y-3 pb-4">
        {/* Row 1 — Main actions (tall, prominent) */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('flights')}
            className="bg-white border-2 border-navy/80 rounded-2xl p-6 text-left active:scale-[0.97] transition-transform flex flex-col justify-between min-h-[200px]"
          >
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
              <Bus size={30} className="text-accent" />
            </div>
            <div className="mt-auto pt-4">
              <p className="text-navy font-extrabold text-base leading-tight">Забронювати поїздку</p>
              <p className="text-gray-400 text-xs mt-1.5">Пасажирські рейси</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('parcels')}
            className="bg-white border-2 border-navy/80 rounded-2xl p-6 text-left active:scale-[0.97] transition-transform flex flex-col justify-between min-h-[200px]"
          >
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
              <Package size={30} className="text-accent" />
            </div>
            <div className="mt-auto pt-4">
              <p className="text-navy font-extrabold text-base leading-tight">Відправити посилку</p>
              <p className="text-gray-400 text-xs mt-1.5">Доставка УК ↔ ЄВ</p>
            </div>
          </button>
        </div>

        {/* Row 2 — Secondary actions (low, wide rectangles) */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('chat')}
            className="bg-white border-2 border-navy/80 rounded-2xl px-4 py-4 active:scale-[0.97] transition-transform flex items-center gap-3"
          >
            <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
              <MessageCircle size={22} className="text-accent" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-navy font-bold text-xs leading-tight">Чат з менеджером</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 bg-status-confirmed rounded-full" />
                <span className="text-[10px] text-gray-400">Онлайн</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('tariffs')}
            className="bg-white border-2 border-navy/80 rounded-2xl px-4 py-4 active:scale-[0.97] transition-transform flex items-center gap-3"
          >
            <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
              <Tag size={22} className="text-accent" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-navy font-bold text-xs leading-tight">Тарифи та ціни</p>
              <p className="text-gray-400 text-[10px] mt-1">від 5€/кг</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
