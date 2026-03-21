import { useState, useEffect, useRef } from 'react';
import { Truck } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

const DEMO_PHONE = '+380951111111';
const DEMO_PASSWORD = 'mypassword1';
const TYPE_SPEED = 70;       // ms per character
const PAUSE_BETWEEN = 400;   // pause between fields
const BUTTON_DELAY = 500;    // pause before button press
const BUTTON_HOLD = 600;     // how long button stays "pressed"

export default function LoginScreen({ onLogin }: Props) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Reset state for each mount
    setPhone('');
    setPassword('');
    setPhoneFocused(false);
    setPasswordFocused(false);
    setButtonPressed(false);

    const timers: ReturnType<typeof setTimeout>[] = [];
    const addTimer = (fn: () => void, delay: number) => {
      const t = setTimeout(fn, delay);
      timers.push(t);
      return t;
    };

    let elapsed = 300; // initial delay

    // Focus phone field
    addTimer(() => setPhoneFocused(true), elapsed);
    elapsed += 200;

    // Type phone number
    for (let i = 0; i < DEMO_PHONE.length; i++) {
      const chars = DEMO_PHONE.slice(0, i + 1);
      addTimer(() => setPhone(chars), elapsed);
      elapsed += TYPE_SPEED;
    }

    // Unfocus phone, pause, focus password
    elapsed += PAUSE_BETWEEN;
    addTimer(() => {
      setPhoneFocused(false);
      setPasswordFocused(true);
    }, elapsed);
    elapsed += 200;

    // Type password
    for (let i = 0; i < DEMO_PASSWORD.length; i++) {
      const chars = DEMO_PASSWORD.slice(0, i + 1);
      addTimer(() => setPassword(chars), elapsed);
      elapsed += TYPE_SPEED;
    }

    // Unfocus password
    elapsed += PAUSE_BETWEEN;
    addTimer(() => setPasswordFocused(false), elapsed);

    // Press button
    elapsed += BUTTON_DELAY;
    addTimer(() => setButtonPressed(true), elapsed);

    // Release button and navigate
    elapsed += BUTTON_HOLD;
    addTimer(() => {
      setButtonPressed(false);
      onLogin();
    }, elapsed);

    timerRef.current = timers;
    return () => timers.forEach(clearTimeout);
  }, [onLogin]);

  const inputBase =
    'w-full px-4 py-3.5 bg-white/10 backdrop-blur border rounded-xl text-white placeholder-blue-200/50 outline-none transition-all duration-200';
  const focusRing = 'border-accent ring-1 ring-accent';
  const noFocus = 'border-white/20';

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-navy-dark flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm md:max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-accent/30">
            <Truck size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">BOTILOGISTICS <em className="font-normal text-white/70">beta</em></h1>
          <p className="text-blue-200/70 text-sm mt-1">Логістика без кордонів</p>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="tel"
              placeholder="Телефон"
              value={phone}
              readOnly
              className={`${inputBase} ${phoneFocused ? focusRing : noFocus}`}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Пароль"
              value={password}
              readOnly
              className={`${inputBase} ${passwordFocused ? focusRing : noFocus}`}
            />
          </div>
          <button
            type="button"
            className={`w-full py-3.5 bg-accent text-white font-bold rounded-xl text-base shadow-lg shadow-accent/30 transition-all duration-150 ${
              buttonPressed ? 'scale-[0.95] brightness-90 shadow-accent/50' : 'scale-100'
            }`}
          >
            Увійти
          </button>
        </div>
      </div>
    </div>
  );
}
