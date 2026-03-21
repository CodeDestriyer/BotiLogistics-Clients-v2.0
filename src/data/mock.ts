import type { Flight, ChatMessage } from '../types';

export const flights: Flight[] = [
  { id: 1, city: 'Цюріх', date: '20 червня', direction: 'UA → EU', route: 'Київ → Цюріх', seats: 14, price: 80 },
  { id: 2, city: 'Женева', date: '25 червня', direction: 'UA → EU', route: 'Київ → Женева', seats: 8, price: 90 },
  { id: 3, city: 'Берлін', date: '28 червня', direction: 'UA → EU', route: 'Київ → Берлін', seats: 20, price: 70 },
  { id: 4, city: 'Цюріх', date: '02 липня', direction: 'EU → UA', route: 'Цюріх → Київ', seats: 6, price: 85 },
  { id: 5, city: 'Амстердам', date: '05 липня', direction: 'UA → EU', route: 'Київ → Амстердам', seats: 12, price: 95 },
];

export const chatMessages: ChatMessage[] = [
  { id: 1, sender: 'manager', text: 'Доброго дня! Ваша посилка PKG-0042 прибула до нас. Перевіряємо вміст.', time: '10:32' },
  { id: 2, sender: 'user', text: 'Дякую! Коли орієнтовно відправка?', time: '10:45' },
  { id: 3, sender: 'manager', text: 'Найближчого вівторка, 17 червня. Водій: Олексій, +380671234567', time: '11:02' },
  { id: 4, sender: 'user', text: 'Чудово, дякую!', time: '11:05' },
];

export const tariffsCities = [
  { city: 'Амстердам', price: 95 },
  { city: 'Роттердам', price: 90 },
  { city: 'Гаага', price: 90 },
  { city: 'Берлін', price: 70 },
  { city: 'Дюссельдорф', price: 75 },
  { city: 'Гамбург', price: 80 },
];

export const contentTypes = ['Одяг', 'Взуття', 'Документи', 'Електроніка', 'Косметика', 'Продукти', 'Інше'];
