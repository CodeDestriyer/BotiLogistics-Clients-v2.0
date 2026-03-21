import { useState } from 'react';
import { ArrowLeft, Lock, LogOut, CreditCard } from 'lucide-react';
import type { Screen } from '../types';

interface Props {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export default function ProfileScreen({ onNavigate, onLogout }: Props) {
  const [changingPw, setChangingPw] = useState(false);
  const [pwForm, setPwForm] = useState({ old: '', new1: '', new2: '' });

  return (
    <div className="animate-fade-in">
      <div className="bg-navy px-4 pt-6 pb-8 rounded-b-3xl md:rounded-none md:px-10 md:pt-8 md:pb-8">
        <button onClick={() => onNavigate('home')} className="text-blue-200/60 flex items-center gap-1 mb-4 text-sm">
          <ArrowLeft size={16} /> Назад
        </button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-accent/30">
            ОК
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Олена Коваленко</h1>
            <p className="text-blue-200/60 text-sm">+380 67 999 8877</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 pb-6 space-y-3 md:max-w-2xl md:mx-auto md:mt-6">
        {/* Debts */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <CreditCard size={20} className="text-status-confirmed" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Мої борги</p>
              <p className="text-sm font-bold text-status-confirmed">Немає заборгованості</p>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <button
            onClick={() => setChangingPw(!changingPw)}
            className="flex items-center gap-3 w-full"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Lock size={20} className="text-navy" />
            </div>
            <span className="text-sm font-semibold text-navy">Змінити пароль</span>
          </button>
          {changingPw && (
            <div className="mt-3 space-y-2 animate-fade-in">
              <input
                type="password"
                placeholder="Поточний пароль"
                value={pwForm.old}
                onChange={e => setPwForm(prev => ({ ...prev, old: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-accent transition"
              />
              <input
                type="password"
                placeholder="Новий пароль"
                value={pwForm.new1}
                onChange={e => setPwForm(prev => ({ ...prev, new1: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-accent transition"
              />
              <input
                type="password"
                placeholder="Повторіть новий пароль"
                value={pwForm.new2}
                onChange={e => setPwForm(prev => ({ ...prev, new2: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-accent transition"
              />
              <button
                onClick={() => { setChangingPw(false); setPwForm({ old: '', new1: '', new2: '' }); }}
                className="w-full py-2.5 bg-navy text-white text-sm font-semibold rounded-xl active:scale-[0.97] transition-transform"
              >
                Зберегти
              </button>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 active:scale-[0.98] transition-transform"
        >
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
            <LogOut size={20} className="text-status-cancelled" />
          </div>
          <span className="text-sm font-semibold text-status-cancelled">Вийти з акаунту</span>
        </button>
      </div>
    </div>
  );
}
