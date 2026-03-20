import { Home, Plane, Package, ClipboardList, MessageCircle } from 'lucide-react';
import type { Tab } from '../types';

interface TabBarProps {
  active: Tab;
  onTab: (tab: Tab) => void;
  chatBadge: number;
}

const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Головна', icon: Home },
  { id: 'flights', label: 'Рейси', icon: Plane },
  { id: 'parcels', label: 'Посилки', icon: Package },
  { id: 'orders', label: 'Замовлення', icon: ClipboardList },
  { id: 'chat', label: 'Чат', icon: MessageCircle },
];

export default function TabBar({ active, onTab, chatBadge }: TabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
      <div className="max-w-[480px] mx-auto flex justify-around items-center h-16">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-colors relative ${
                isActive ? 'text-accent' : 'text-gray-400'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
              {id === 'chat' && chatBadge > 0 && (
                <span className="absolute top-0.5 right-1/2 translate-x-4 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {chatBadge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
