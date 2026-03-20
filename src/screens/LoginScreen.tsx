import { useState } from 'react';
import { Eye, EyeOff, Truck } from 'lucide-react';

interface Props {
  onLogin: () => void;
  onRegister: () => void;
}

export default function LoginScreen({ onLogin, onRegister }: Props) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-navy-dark flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-accent/30">
            <Truck size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">EscoExpress</h1>
          <p className="text-blue-200/70 text-sm mt-1">Логістика без кордонів</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="tel"
              placeholder="Телефон"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-blue-200/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
            />
          </div>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
            Увійти
          </button>
        </form>

        <p className="text-center mt-6 text-blue-200/60 text-sm">
          Немає акаунту?{' '}
          <button onClick={onRegister} className="text-accent font-semibold underline underline-offset-2">
            Зареєструватись
          </button>
        </p>
      </div>
    </div>
  );
}
