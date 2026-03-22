import { useState } from 'react';
import { Truck } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [isRegister, setIsRegister] = useState(false);

  // Login fields
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Register fields
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');

  const inputClass =
    'w-full px-4 py-3.5 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-blue-200/50 outline-none transition-all duration-200 focus:border-accent focus:ring-1 focus:ring-accent';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Косметична функція — просто переключаємо на логін
    setIsRegister(false);
    setPhone(regPhone);
    setRegName('');
    setRegPhone('');
    setRegEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-navy-dark flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm md:max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-accent/30">
            <Truck size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="text-white">BOTI</span>
            <span className="text-emerald-400">LOGISTICS</span>
          </h1>
          <p className="text-blue-200/70 text-sm mt-1">Логістика без кордонів</p>
        </div>

        {!isRegister ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="tel"
              placeholder="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
            <button
              type="submit"
              className="w-full py-3.5 bg-accent text-white font-bold rounded-xl text-base shadow-lg shadow-accent/30 active:scale-[0.97] transition-all duration-150"
            >
              Увійти
            </button>
            <p className="text-center text-blue-200/60 text-sm mt-2">
              Немає акаунту?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-accent font-semibold hover:underline"
              >
                Зареєструватися
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Ім'я та прізвище"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              className={inputClass}
            />
            <input
              type="tel"
              placeholder="Телефон"
              value={regPhone}
              onChange={(e) => setRegPhone(e.target.value)}
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Електронна пошта"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              className={inputClass}
            />
            <button
              type="submit"
              className="w-full py-3.5 bg-accent text-white font-bold rounded-xl text-base shadow-lg shadow-accent/30 active:scale-[0.97] transition-all duration-150"
            >
              Зареєструватися
            </button>
            <p className="text-center text-blue-200/60 text-sm mt-2">
              Вже є акаунт?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-accent font-semibold hover:underline"
              >
                Увійти
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
