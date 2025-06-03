import { create } from 'zustand';
import { router } from 'expo-router';
import { BookingStatus } from '../types';

interface Car {
  id: string;
  title: string;
  price: number;
  priceDisplay: string;
  rating: number;
  distance: string;
  distanceValue: number;
  image: string;
  description: string;
}

interface Message {
  id: string;
  carId: string;
  title: string;
  price: string;
  priceValue: number;
  lastMessage: string;
  unreadCount: number;
  image: string;
  status: BookingStatus;
  description: string;
  buyerId: string;
  sellerId: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  type: 'individual' | 'company';
  role: 'buyer' | 'seller';
  city: string;
  rating: number;
  reviewsCount: number;
  balance: number;
}

interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  messageId: string;
}

interface Store {
  cars: Car[];
  favorites: Car[];
  messages: Message[];
  user: User;
  sortType: 'distance' | 'priceAsc' | 'priceDesc' | null;
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: string) => void;
  getCarById: (id: string) => Car | undefined;
  getMessages: () => Message[];
  updateUserName: (newName: string) => void;
  updateBalance: (amount: number) => void;
  logout: () => void;
  setSortType: (type: 'distance' | 'priceAsc' | 'priceDesc' | null) => void;
  getSortedCars: () => Car[];
  updateMessageStatus: (messageId: string, newStatus: BookingStatus) => void;
  createBooking: (carId: string) => void;
  processBooking: (messageId: string) => void;
  getMessagesByRole: () => Message[];
  updateUserRole: (role: 'buyer' | 'seller') => void;
  login: (email: string, password: string, role: 'buyer' | 'seller') => void;
  chatMessages: Record<string, ChatMessage[]>;
  sendMessage: (messageId: string, text: string) => void;
}

export const useStore = create<Store>((set, get) => ({
  cars: [
    {
      id: '1',
      title: 'BMW X5',
      price: 5000,
      priceDisplay: '5000 ₽/сутки',
      rating: 4.8,
      distance: '2.5 км',
      distanceValue: 2.5,
      image: 'https://cdn.apiweb.rolf.ru/storage/thumbnails/large/models/14-bmw/4921-x5_new/c65f831967794f342c1ab1d8464c7d58.png',
      description: 'Отличный автомобиль в идеальном состоянии',
    },
    {
      id: '2',
      title: 'Mercedes-Benz C-Class',
      price: 4500,
      priceDisplay: '4500 ₽/сутки',
      rating: 4.9,
      distance: '3.1 км',
      distanceValue: 3.1,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Mercedes-Benz_W206_IMG_6380.jpg/1280px-Mercedes-Benz_W206_IMG_6380.jpg',
      description: 'Комфортный седан для поездок по городу',
    },
    {
      id: '3',
      title: 'CMC Mercedes-Benz 300 SLR Coupé, 1955',
      price: 200000,
      priceDisplay: '200000 ₽/сутки',
      rating: 5,
      distance: '7 км',
      distanceValue: 7,
      image: 'https://www.cmc-modelcars.de/wp-content/uploads/2022/07/M-076-MB-Uhlenhaut-9110-120.jpg',
      description: 'Красивый автомобиль, который можно использовать для фотосессий',
    },
    {
      id: '4',
      title: 'Ferrari 250 GTO',
      price: 1000000,
      priceDisplay: '1000000 ₽/сутки',
      rating: 5,
      distance: '10 км',
      distanceValue: 10,
      image: 'https://avatars.mds.yandex.net/get-verba/1030388/2a000001609484b1d12dbb9071b3b1af0943/cattouchret',
      description: 'Красивый автомобиль, который можно использовать для фотосессий',
    },
    {
      id: '5',
      title: 'Rolls-Royce Boat Tail',
      price: 30000,
      priceDisplay: '30000 ₽/сутки',
      rating: 5,
      distance: '15 км',
      distanceValue: 15,
      image: 'https://avatars.mds.yandex.net/get-verba/787013/2a0000018e9e9af4b958fe20fee73ac6b3ab/cattouchret',
      description: 'Кабриолет F-класса, задний привод. Автомат.',
    },
    {
      id: '6',
      title: 'Pagani Zonda HP Barchetta',
      price: 19900,
      priceDisplay: '19900 ₽/сутки',
      rating: 5,
      distance: '2 км',
      distanceValue: 2,
      image: 'https://www.livecars.ru/l/news/2018/07/27/pagani_zonda_hp_barchetta/picture.jpg?1532704349',
      description: 'Люкс автомобиль, для властителя жизни',
    },    
    {
      id: '7',
      title: 'Bugatti La Voiture Noire',
      price: 300000,
      priceDisplay: '300000 ₽/сутки',
      rating: 5,
      distance: '10 км',
      distanceValue: 10,
      image: 'https://images.drive.ru/i/0/60b9bed2b014c32d0e544a8b.jpg',
      description: 'Люкс автомобиль, для комфорта',
    },   
    {
      id: '8',
      title: 'Rolls-Royce Sweptail',
      price: 27000,
      priceDisplay: '27000 ₽/сутки',
      rating: 5,
      distance: '18 км',
      distanceValue: 18,
      image: 'https://images.techinsider.ru/upload/img_cache/02e/02eda5b336dcf256fb6497515e5cd394_cropped_666x444.webp',
      description: 'Роскошный автомобиль люкс класса',
    },
    {
      id: '9',
      title: 'Bugatti Centodieci.',
      price: 39000,
      priceDisplay: '39000 ₽/сутки',
      rating: 5,
      distance: '18 км',
      distanceValue: 18,
      image: 'https://avatars.mds.yandex.net/get-verba/1604130/2a00000194642c1f37fb7bb5051ead3cfe35/cattouchret',
      description: 'Автомобиль премиум класса',
    },
    {
      id: '10',
      title: 'Maybach Exelero',
      price: 70000,
      priceDisplay: '70000 ₽/сутки',
      rating: 5,
      distance: '40 км',
      distanceValue: 40,
      image: 'https://avatars.mds.yandex.net/get-verba/787013/2a0000016095f2a1a5b600f86a2908ad8eab/cattouchret',
      description: 'Автомобиль бизнес класса',
    },
  ],
  favorites: [
    {
      id: '1',
      title: 'BMW X5',
      price: 5000,
      priceDisplay: '5000 ₽/сутки',
      rating: 4.8,
      distance: '2.5 км',
      distanceValue: 2.5,
      image: 'https://cdn.apiweb.rolf.ru/storage/thumbnails/large/models/14-bmw/4921-x5_new/c65f831967794f342c1ab1d8464c7d58.png',
      description: 'Отличный автомобиль в идеальном состоянии',
    },
    {
      id: '2',
      title: 'Mercedes-Benz C-Class',
      price: 4500,
      priceDisplay: '4500 ₽/сутки',
      rating: 4.9,
      distance: '3.1 км',
      distanceValue: 3.1,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Mercedes-Benz_W206_IMG_6380.jpg/1280px-Mercedes-Benz_W206_IMG_6380.jpg',
      description: 'Комфортный седан для поездок по городу',
    },
  ],
  messages: [
    {
      id: '1',
      carId: '1',
      title: 'BMW X5',
      price: '5000 ₽/сутки',
      priceValue: 5000,
      lastMessage: 'Здравствуйте, автомобиль еще доступен?',
      unreadCount: 2,
      image: 'https://cdn.apiweb.rolf.ru/storage/thumbnails/large/models/14-bmw/4921-x5_new/c65f831967794f342c1ab1d8464c7d58.png',
      status: 'на рассмотрении',
      description: 'Отличный автомобиль в идеальном состоянии',
      buyerId: '2',
      sellerId: '1',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      carId: '2',
      title: 'Mercedes-Benz C-Class',
      price: '4500 ₽/сутки',
      priceValue: 4500,
      lastMessage: 'Добрый день, когда можно посмотреть?',
      unreadCount: 1,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Mercedes-Benz_W206_IMG_6380.jpg/1280px-Mercedes-Benz_W206_IMG_6380.jpg',
      status: 'на рассмотрении',
      description: 'Комфортный седан для поездок по городу',
      buyerId: '2',
      sellerId: '1',
      createdAt: new Date().toISOString(),
    },
  ],
  user: {
    id: '1',
    name: 'Александр Грехов',
    avatar: require('../assets/images/avatar.png'),
    type: 'individual',
    role: 'buyer',
    city: 'Москва',
    rating: 4.8,
    reviewsCount: 12,
    balance: 35000,
  },
  sortType: null,
  addToFavorites: (car) => 
    set((state) => {
      if (state.favorites.some(fav => fav.id === car.id)) {
        return state;
      }
      return { 
        favorites: [...state.favorites, car] 
      };
    }),
  removeFromFavorites: (carId) =>
    set((state) => ({
      favorites: state.favorites.filter((car) => car.id !== carId)
    })),
  getCarById: (id) => get().cars.find((car) => car.id === id),
  getMessages: () => get().messages,
  updateUserName: (newName: string) =>
    set((state) => ({
      user: {
        ...state.user,
        name: newName,
      },
    })),
  updateBalance: (amount: number) =>
    set((state) => ({
      user: {
        ...state.user,
        balance: state.user.balance + amount,
      },
    })),
  logout: () => {
    set({
      user: null,
      favorites: [],
      messages: [],
    });
    router.replace('/welcome');
  },
  setSortType: (type) => set({ sortType: type }),
  getSortedCars: () => {
    const { cars, sortType } = get();
    const sortedCars = [...cars];
    
    switch (sortType) {
      case 'distance':
        return sortedCars.sort((a, b) => a.distanceValue - b.distanceValue);
      case 'priceAsc':
        return sortedCars.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return sortedCars.sort((a, b) => b.price - a.price);
      default:
        return sortedCars;
    }йцу
  },
  updateMessageStatus: (messageId, newStatus) => 
    set((state) => ({
      messages: state.messages.map(msg => 
        msg.id === messageId 
          ? { ...msg, status: newStatus }
          : msg
      )
    })),
  createBooking: (carId) => {
    const { user, cars } = get();
    const car = cars.find(c => c.id === carId);
    
    if (!car || user.role !== 'buyer') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      carId,
      title: car.title,
      price: car.priceDisplay,
      priceValue: car.price,
      lastMessage: 'Новая заявка на бронирование',
      unreadCount: 1,
      image: car.image,
      status: 'на рассмотрении',
      description: car.description,
      buyerId: user.id,
      sellerId: car.sellerId,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, newMessage]
    }));
  },
  processBooking: (messageId) => {
    const { user, messages } = get();
    const message = messages.find(m => m.id === messageId);
    
    if (!message) return;

    const statusFlow: Record<BookingStatus, BookingStatus> = {
      'на рассмотрении': 'ожидает оплаты',
      'ожидает оплаты': 'одобрено',
      'одобрено': 'выполняется',
      'выполняется': 'ожидает отзыв',
      'ожидает отзыв': 'завершен',
      'завершен': 'завершен'
    };

    const newStatus = statusFlow[message.status];
    if (newStatus) {
      get().updateMessageStatus(messageId, newStatus);
    }
  },
  getMessagesByRole: () => {
    const { user, messages } = get();
    return messages.filter(msg => 
      user.role === 'buyer' 
        ? msg.buyerId === user.id
        : msg.sellerId === user.id
    );
  },
  updateUserRole: (role: 'buyer' | 'seller') =>
    set((state) => ({
      user: {
        ...state.user,
        role,
      },
    })),
  login: (email: string, password: string, role: 'buyer' | 'seller') => {
    // Здесь в реальном приложении будет проверка email и password
    // Сейчас просто создаем пользователя с выбранной ролью
    set((state) => ({
      user: {
        id: '1',
        name: 'Иван Иванов',
        avatar: require('../assets/images/avatar.png'),
        type: 'individual',
        role: role,
        city: 'Москва',
        rating: 4.8,
        reviewsCount: 12,
        balance: 15000,
      }
    }));
  },
  chatMessages: {
    '1': [
      {
        id: '1',
        text: 'Здравствуйте, автомобиль еще доступен?',
        senderId: '2',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        messageId: '1'
      },
      {
        id: '2',
        text: 'Да, автомобиль доступен',
        senderId: '1',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        messageId: '1'
      }
    ],
    '2': [
      {
        id: '3',
        text: 'Добрый день, когда можно посмотреть?',
        senderId: '2',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        messageId: '2'
      }
    ]
  },
  sendMessage: (messageId: string, text: string) => {
    const { user, chatMessages } = get();
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      senderId: user.id,
      timestamp: new Date().toISOString(),
      messageId
    };

    set((state) => ({
      chatMessages: {
        ...state.chatMessages,
        [messageId]: [
          ...(state.chatMessages[messageId] || []),
          newMessage
        ]
      }
    }));

    set((state) => ({
      messages: state.messages.map(msg =>
        msg.id === messageId
          ? { ...msg, lastMessage: text }
          : msg
      )
    }));
  },
})); 