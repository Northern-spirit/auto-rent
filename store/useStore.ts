import { create } from 'zustand';
import { router } from 'expo-router';

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
  lastMessage: string;
  unreadCount: number;
  image: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  type: 'individual' | 'company';
  city: string;
  rating: number;
  reviewsCount: number;
  balance: number;
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
      lastMessage: 'Здравствуйте, автомобиль еще доступен?',
      unreadCount: 2,
      image: 'https://cdn.apiweb.rolf.ru/storage/thumbnails/large/models/14-bmw/4921-x5_new/c65f831967794f342c1ab1d8464c7d58.png',
    },
    {
      id: '2',
      carId: '2',
      title: 'Mercedes-Benz C-Class',
      price: '4500 ₽/сутки',
      lastMessage: 'Добрый день, когда можно посмотреть?',
      unreadCount: 1,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Mercedes-Benz_W206_IMG_6380.jpg/1280px-Mercedes-Benz_W206_IMG_6380.jpg',
    },
  ],
  user: {
    id: '1',
    name: 'Иван Иванов',
    avatar: require('../assets/images/avatar.png'),
    type: 'individual',
    city: 'Москва',
    rating: 4.8,
    reviewsCount: 12,
    balance: 15000,
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
    }
  },
})); 