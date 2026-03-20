import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

export default function RegisterScreen({ onComplete, onBack }: Props) {
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });

  const update = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.password) return;
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-navy-dark px-6 py-8">
      <div className="w-full max-w-sm mx-auto animate-fade-in">
        <button onClick={onBack} className="text-blue-200/60 flex items-center gap-1 mb-6">
          <ArrowLeft size={18} /> Назад
        </button>
        <h1 className="text-2xl font-extrabold text-white mb-1">Реєстрація</h1>
        <p className="text-blue-200/60 text-sm mb-8">Створіть акаунт для доступу до сервісу</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="ПІБ *"
            value={form.name}
            onChange={e => update('name', e.target.value)}
            className="w-full px-4 py-3.5 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-blue-200/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
          />
          <input
            type="tel"
            placeholder="Телефон *"
            value={form.phone}
            onChange={e => update('phone', e.target.value)}
            className="w-full px-4 py-3.5 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-blue-200/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => update('email', e.target.value)}
            className="w-full px-4 py-3.5 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-blue-200/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
          />
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Пароль *"
              value={form.password}
              onChange={e => update('password', e.target.value)}
              className="w-full px-4 py-3.5 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-blue-200/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200/50"
            >
              {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-accent text-white font-bold rounded-xl text-base active:scale-[0.97] transition-transform shadow-lg shadow-accent/30"
          >
            Зареєструватись
          </button>
        </form>
      </div>
    </div>
  );
}
