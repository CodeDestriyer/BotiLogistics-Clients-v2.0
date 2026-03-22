import { useState } from 'react';
import { Truck, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  onLogin: () => void;
  onNavigate: (screen: 'login' | 'verify') => void;
  screen: 'login' | 'verify';
}

export default function LoginScreen({ onLogin, onNavigate, screen }: Props) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputClass =
    'w-full px-4 py-3.5 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-blue-200/50 outline-none transition-all duration-200 focus:border-accent focus:ring-1 focus:ring-accent';

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Введіть електронну пошту');
      return;
    }

    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
      },
    });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    onNavigate('verify');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const code = otp.trim();
    if (!code) {
      setError('Введіть код з листа');
      return;
    }
    if (code.length !== 6) {
      setError('Код має містити 6 цифр');
      return;
    }

    setLoading(true);
    const { error: authError } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code,
      type: 'email',
    });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    onLogin();
  };

  const handleGoogleLogin = async () => {
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (authError) {
      setError(authError.message);
    }
  };

  const handleOtpChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    setOtp(digits);
    setError('');
  };

  // Step 2: OTP code verification
  if (screen === 'verify') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy to-navy-dark flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm md:max-w-md animate-fade-in">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
              <Mail size={40} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Перевірте пошту</h2>
            <p className="text-blue-200/70 text-sm text-center">
              Ми надіслали 6-значний код на
            </p>
            <p className="text-accent font-semibold mt-1">{email}</p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="000000"
                value={otp}
                onChange={(e) => handleOtpChange(e.target.value)}
                className={`${inputClass} text-center text-2xl tracking-[0.5em] font-mono`}
                autoComplete="one-time-code"
                autoFocus
                maxLength={6}
              />
              {error && (
                <p className="text-red-400 text-xs mt-2 pl-1">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-3.5 bg-accent text-white font-bold rounded-xl text-base shadow-lg shadow-accent/30 active:scale-[0.97] transition-all duration-150 disabled:opacity-60 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Перевіряємо...
                </>
              ) : (
                'Підтвердити'
              )}
            </button>

            <p className="text-center text-blue-200/40 text-xs mt-2">
              Якщо листа немає — перевірте папку «Спам»
            </p>

            <button
              type="button"
              onClick={() => {
                setOtp('');
                setError('');
                onNavigate('login');
              }}
              className="w-full inline-flex items-center justify-center gap-2 text-blue-200/60 text-sm hover:text-white transition-colors pt-2"
            >
              <ArrowLeft size={16} />
              Змінити пошту
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Step 1: Email input + Google
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

        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Електронна пошта"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className={inputClass}
              autoComplete="email"
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-xs mt-2 pl-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-accent text-white font-bold rounded-xl text-base shadow-lg shadow-accent/30 active:scale-[0.97] transition-all duration-150 disabled:opacity-60 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Надсилаємо код...
              </>
            ) : (
              'Продовжити'
            )}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-blue-200/40 text-xs">або</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3.5 bg-white text-gray-700 font-semibold rounded-xl text-base shadow-lg active:scale-[0.97] transition-all duration-150 flex items-center justify-center gap-3"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Увійти через Google
        </button>

        <p className="text-center text-blue-200/40 text-xs mt-6">
          Введіть пошту — ми надішлемо вам код для входу
        </p>
      </div>
    </div>
  );
}
