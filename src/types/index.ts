export type Screen = 'login' | 'register' | 'home' | 'flights' | 'parcels' | 'orders' | 'chat' | 'tariffs' | 'profile' | 'booking' | 'parcel-ua-eu' | 'parcel-eu-ua';

export type Tab = 'home' | 'flights' | 'parcels' | 'orders' | 'chat';

export type OrderStatus = 'processing' | 'pending' | 'confirmed' | 'transit' | 'done' | 'cancelled';

export interface Flight {
  id: number;
  city: string;
  date: string;
  direction: 'УК→ЄВ' | 'ЄВ→УК';
  route: string;
  seats: number;
  price: number;
}

export interface ChatMessage {
  id: number;
  sender: 'manager' | 'user';
  text: string;
  time: string;
}
