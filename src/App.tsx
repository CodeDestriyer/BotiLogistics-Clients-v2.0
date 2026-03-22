import { useState, useEffect, useCallback } from 'react';
import type { Screen, Tab, Flight } from './types';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import TabBar from './components/TabBar';
import Skeleton from './components/Skeleton';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import FlightsScreen from './screens/FlightsScreen';
import BookingScreen from './screens/BookingScreen';
import ParcelsScreen from './screens/ParcelsScreen';
import ParcelUaEuScreen from './screens/ParcelUaEuScreen';
import ParcelEuUaScreen from './screens/ParcelEuUaScreen';
import OrdersScreen from './screens/OrdersScreen';
import ChatScreen from './screens/ChatScreen';
import TariffsScreen from './screens/TariffsScreen';
import ProfileScreen from './screens/ProfileScreen';

const tabScreens: Tab[] = ['home', 'flights', 'parcels', 'orders', 'chat'];

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [screen, setScreen] = useState<Screen>('login');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [loading, setLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [chatBadge, setChatBadge] = useState(1);

  // Listen for auth state changes (magic link callback, session restore)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s) {
        setScreen('home');
        setActiveTab('home');
      }
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s) {
        setScreen('home');
        setActiveTab('home');
      } else {
        setScreen('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigate = useCallback((s: Screen) => {
    if (tabScreens.includes(s as Tab)) {
      setActiveTab(s as Tab);
      setLoading(true);
      setScreen(s);
    } else {
      setScreen(s);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      const t = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(t);
    }
  }, [loading]);

  const handleLogin = () => {
    // Magic link handles auth via onAuthStateChange listener
    // This is kept for manual navigation after successful OTP
    setLoading(true);
    setScreen('home');
    setActiveTab('home');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setScreen('login');
  };

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setScreen(tab);
    setLoading(true);
  };

  const clearChatBadge = useCallback(() => setChatBadge(0), []);

  const showTabBar = screen !== 'login' && screen !== 'verify';

  const renderScreen = () => {
    if (loading && tabScreens.includes(screen as Tab)) return <Skeleton />;
    switch (screen) {
      case 'login':
      case 'verify':
        return <LoginScreen onLogin={handleLogin} onNavigate={(s) => setScreen(s)} screen={screen as 'login' | 'verify'} />;
      case 'home': return <HomeScreen onNavigate={navigate} />;
      case 'flights': return <FlightsScreen onNavigate={navigate} onSelectFlight={setSelectedFlight} />;
      case 'booking': return selectedFlight ? <BookingScreen flight={selectedFlight} onNavigate={navigate} /> : null;
      case 'parcels': return <ParcelsScreen onNavigate={navigate} />;
      case 'parcel-ua-eu': return <ParcelUaEuScreen onNavigate={navigate} />;
      case 'parcel-eu-ua': return <ParcelEuUaScreen onNavigate={navigate} />;
      case 'orders': return <OrdersScreen />;
      case 'chat': return <ChatScreen onClearBadge={clearChatBadge} />;
      case 'tariffs': return <TariffsScreen onNavigate={navigate} />;
      case 'profile': return <ProfileScreen onNavigate={navigate} onLogout={handleLogout} />;
      default: return null;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy to-navy-dark flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`mx-auto min-h-screen relative ${showTabBar ? 'max-w-[480px] md:max-w-none md:ml-56 bg-slate-100' : 'max-w-none'}`}>
      <div className={showTabBar ? 'pb-16 md:pb-0' : ''}>
        {renderScreen()}
      </div>
      {showTabBar && <TabBar active={activeTab} onTab={handleTabChange} chatBadge={chatBadge} />}
    </div>
  );
}

export default App;
