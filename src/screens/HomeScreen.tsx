import { Bus, Package, ChevronRight, User, MessageCircle, Send, Tag } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { chatMessages as initialMessages } from '../data/mock';
import type { Screen, ChatMessage } from '../types';

interface Props {
  onNavigate: (screen: Screen) => void;
}

export default function HomeScreen({ onNavigate }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: text.trim(), time }]);
    setText('');
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-navy px-5 pt-8 pb-10 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-200/50 text-xs mb-0.5">Доброго дня</p>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Привіт, Олена! 👋</h1>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center border border-white/10"
          >
            <User size={24} className="text-white" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate('flights')}
            className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-5 text-left active:scale-[0.97] transition-transform"
          >
            <Bus size={30} className="text-accent mb-3" />
            <p className="text-white font-semibold text-sm">Забронювати поїздку</p>
          </button>
          <button
            onClick={() => onNavigate('parcels')}
            className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-5 text-left active:scale-[0.97] transition-transform"
          >
            <Package size={30} className="text-accent mb-3" />
            <p className="text-white font-semibold text-sm">Відправити посилку</p>
          </button>
        </div>
      </div>

      <div className="px-4 -mt-5 space-y-4 pb-4">
        {/* Chat with Manager */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <MessageCircle size={16} className="text-accent" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-navy leading-tight">Чат з менеджером</h2>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-status-confirmed rounded-full" />
                  <span className="text-[10px] text-gray-400">Онлайн</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('chat')}
              className="text-accent text-xs font-semibold flex items-center gap-0.5"
            >
              Всі <ChevronRight size={14} />
            </button>
          </div>

          <div className="px-4 py-2 max-h-44 overflow-y-auto space-y-2">
            {messages.slice(-3).map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                  msg.sender === 'user'
                    ? 'bg-accent text-white rounded-br-md'
                    : 'bg-gray-50 text-gray-800 rounded-bl-md'
                }`}>
                  {msg.sender === 'manager' && (
                    <p className="text-[10px] font-semibold text-accent mb-0.5">Менеджер</p>
                  )}
                  <p className="text-xs leading-relaxed">{msg.text}</p>
                  <p className={`text-[9px] mt-0.5 text-right ${msg.sender === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="px-4 pb-3 pt-1">
            <div className="flex gap-2">
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Написати повідомлення..."
                className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-accent transition"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white active:scale-90 transition-transform shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tariffs Banner */}
        <div
          className="bg-gradient-to-r from-navy to-navy-light rounded-2xl p-6 cursor-pointer active:scale-[0.98] transition-transform"
          onClick={() => onNavigate('tariffs')}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={18} className="text-accent" />
                <p className="text-white font-bold text-lg">Тарифи та ціни</p>
              </div>
              <p className="text-blue-200/70 text-sm mb-1">Перевезення пасажирів від 70€</p>
              <p className="text-blue-200/70 text-sm mb-4">Посилки УК→ЄВ від 5€/кг</p>
              <span className="inline-flex items-center gap-1 bg-accent/20 text-accent text-sm font-semibold px-4 py-2 rounded-xl">
                Детальніше <ChevronRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
