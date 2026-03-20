import { useState } from 'react';
import { Plane, Package, ExternalLink } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function OrdersScreen() {
  const [tab, setTab] = useState<'flights' | 'parcels'>('flights');

  return (
    <div className="animate-fade-in">
      <div className="bg-navy px-4 pt-6 pb-5 rounded-b-3xl">
        <h1 className="text-xl font-bold text-white mb-4">Мої замовлення</h1>
        <div className="flex gap-2">
          {(['flights', 'parcels'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
                tab === t ? 'bg-white text-navy' : 'bg-white/10 text-blue-200/70'
              }`}
            >
              {t === 'flights' ? 'Рейси' : 'Посилки'}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 -mt-3 pb-4 space-y-3">
        {tab === 'flights' ? (
          <>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Plane size={18} className="text-accent" />
                  <span className="font-bold text-navy text-sm">Цюріх</span>
                </div>
                <span className="text-xs text-gray-400">15.06.2025</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Місце A2 · 1 місце</p>
              <StatusBadge status="confirmed" />
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Plane size={18} className="text-navy" />
                  <span className="font-bold text-navy text-sm">Женева</span>
                </div>
                <span className="text-xs text-gray-400">01.05.2025</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Місце B1 · 2 місця</p>
              <StatusBadge status="done" />
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Plane size={18} className="text-navy" />
                  <span className="font-bold text-navy text-sm">Берлін</span>
                </div>
                <span className="text-xs text-gray-400">12.03.2025</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Місце C3 · 1 місце</p>
              <StatusBadge status="done" />
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Package size={18} className="text-accent" />
                  <span className="font-bold text-navy text-sm">УК→ЄВ</span>
                </div>
                <span className="text-xs text-gray-400">10.06.2025</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">ТТН: 59001234567</p>
              <div className="flex items-center justify-between">
                <StatusBadge status="transit" />
                <a
                  href="https://novaposhta.ua/tracking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-xs font-semibold flex items-center gap-1"
                >
                  Відстежити <ExternalLink size={12} />
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Package size={18} className="text-navy" />
                  <span className="font-bold text-navy text-sm">ЄВ→УК</span>
                </div>
                <span className="text-xs text-gray-400">25.05.2025</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Кур'єр · Київ</p>
              <StatusBadge status="done" />
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Package size={18} className="text-accent" />
                  <span className="font-bold text-navy text-sm">УК→ЄВ</span>
                </div>
                <span className="text-xs text-gray-400">02.04.2025</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">ТТН: 59009876543</p>
              <StatusBadge status="done" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
