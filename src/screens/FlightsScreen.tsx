import { useState } from 'react';
import { Bus, MapPin, Users } from 'lucide-react';
import { flights } from '../data/mock';
import type { Screen, Flight } from '../types';

interface Props {
  onNavigate: (screen: Screen) => void;
  onSelectFlight: (flight: Flight) => void;
}

export default function FlightsScreen({ onNavigate, onSelectFlight }: Props) {
  const [direction, setDirection] = useState<'all' | 'УК→ЄВ' | 'ЄВ→УК'>('all');
  const [city, setCity] = useState<string>('all');

  const filtered = flights.filter(f => {
    if (direction !== 'all' && f.direction !== direction) return false;
    if (city !== 'all' && f.city !== city) return false;
    return true;
  });

  const cities = [...new Set(flights.map(f => f.city))];

  return (
    <div className="animate-fade-in">
      <div className="bg-navy px-4 pt-6 pb-5 rounded-b-3xl">
        <h1 className="text-xl font-bold text-white mb-4">Поїздки</h1>
        {/* Filters */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
          {(['all', 'УК→ЄВ', 'ЄВ→УК'] as const).map(d => (
            <button
              key={d}
              onClick={() => setDirection(d)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                direction === d ? 'bg-accent text-white' : 'bg-white/10 text-blue-200/70'
              }`}
            >
              {d === 'all' ? 'Всі' : d}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCity('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              city === 'all' ? 'bg-white text-navy' : 'bg-white/10 text-blue-200/70'
            }`}
          >
            Всі міста
          </button>
          {cities.map(c => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                city === c ? 'bg-white text-navy' : 'bg-white/10 text-blue-200/70'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 -mt-3 pb-4 space-y-3">
        {filtered.map(flight => (
          <div key={flight.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Bus size={18} className="text-accent" />
                <span className="font-bold text-navy">{flight.city}</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">{flight.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <MapPin size={13} />
              <span>{flight.route}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs mb-3">
              <Users size={13} className="text-status-confirmed" />
              <span className="text-status-confirmed font-semibold">{flight.seats} місць</span>
              <span className="text-gray-300 mx-1">·</span>
              <span className="text-gray-500">{flight.direction}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-navy font-bold">від {flight.price}€</p>
              <button
                onClick={() => {
                  onSelectFlight(flight);
                  onNavigate('booking');
                }}
                className="px-5 py-2 bg-accent text-white text-sm font-semibold rounded-xl active:scale-95 transition-transform"
              >
                Обрати
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Bus size={40} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Поїздок за фільтрами не знайдено</p>
          </div>
        )}
      </div>
    </div>
  );
}
