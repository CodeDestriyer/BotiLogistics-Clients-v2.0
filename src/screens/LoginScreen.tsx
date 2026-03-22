import { useState } from 'react';
import { Truck, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const inputClass =
    'w-full px-4 py-3.5 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-blue-200/50 outline-none transition-all duration-200 focus:border-accent focus:ring-1 focus:ring-accent';

  const handleSendLink = async (e: React.FormEvent) => {
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
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy to-navy-dark flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm md:max-w-md animate-fade-in text-center">
          <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-emerald-500/30">
            <Mail size={40} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-3">Перевірте пошту</h2>
          <p className="text-blue-200/70 text-sm mb-2">
            Ми надіслали посилання для входу на
          </p>
          <p className="text-accent font-semibold mb-8">{email}</p>
          <p className="text-blue-200/50 text-xs mb-6">
            Натисніть на посилання в листі, щоб увійти в додаток. Якщо листа немає — перевірте папку «Спам».
          </p>
          <button
            type="button"
            onClick={() => { setSent(false); setEmail(''); }}
            className="inline-flex items-center gap-2 text-blue-200/60 text-sm hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Спробувати іншу пошту
          </button>
        </div>
      </div>
    );
  }

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

        <form onSubmit={handleSendLink} className="space-y-4">
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
                Надсилаємо...
              </>
            ) : (
              <>
                <Mail size={20} />
                Надіслати посилання для входу
              </>
            )}
          </button>

          <p className="text-center text-blue-200/40 text-xs mt-4">
            Введіть пошту — ми надішлемо вам посилання для входу. Без паролів!
          </p>
        </form>
      </div>
    </div>
  );
}
