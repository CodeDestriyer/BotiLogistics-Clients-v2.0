import { Package, ArrowRight } from 'lucide-react';
import type { Screen } from '../types';

interface Props {
  onNavigate: (screen: Screen) => void;
}

export default function ParcelsScreen({ onNavigate }: Props) {
  return (
    <div className="animate-fade-in">
      <div className="bg-navy px-4 pt-6 pb-5 rounded-b-3xl md:rounded-none md:px-10 md:pt-8 md:pb-6">
        <div className="md:max-w-5xl md:mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-2">Посилки</h1>
          <p className="text-blue-200/60 text-xs md:text-sm">Оберіть напрямок відправки</p>
        </div>
      </div>

      <div className="px-4 -mt-3 space-y-3 pb-4 md:px-10 md:mt-6 md:max-w-5xl md:mx-auto md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
        <button
          onClick={() => onNavigate('parcel-ua-eu')}
          className="w-full bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform text-left"
        >
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
            <Package size={24} className="text-accent" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-navy text-base">УК → ЄВ</p>
            <p className="text-xs text-gray-400 mt-0.5">Реєстрація ТТН Нової Пошти</p>
          </div>
          <ArrowRight size={18} className="text-gray-300" />
        </button>

        <button
          onClick={() => onNavigate('parcel-eu-ua')}
          className="w-full bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform text-left"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
            <Package size={24} className="text-navy" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-navy text-base">ЄВ → УК</p>
            <p className="text-xs text-gray-400 mt-0.5">Виклик кур'єра по Європі</p>
          </div>
          <ArrowRight size={18} className="text-gray-300" />
        </button>
      </div>
    </div>
  );
}
