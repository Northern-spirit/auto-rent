import { create } from 'zustand';
import { router } from 'expo-router';
import { BookingStatus } from '../types';

type CarType = 'Седан' | 'Купе' | 'Хатчбек' | 'Пикап' | 'Универсал' | 'Внедорожник' | 'Кабриолет';

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
  type: CarType;
  age: number;
  acceleration: number;
  horsepower: number;
  year: number;
  mileage: number;
  ownerName: string;
  reviewsCount: number;
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

interface Review {
  id: string;
  carId: string;
  userPhoto: string;
  userName: string;
  userType: string;
  rating: number;
  carRating: number;
  comment: string;
  timestamp: string;
}

interface Store {
  cars: Car[];
  favorites: Car[];
  messages: Message[];
  user: User;
  sortType: 'priceAsc' | 'priceDesc' | 'distance' | 'rating' | null;
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: string) => void;
  getCarById: (id: string) => Car | undefined;
  getMessages: () => Message[];
  updateUserName: (newName: string) => void;
  updateBalance: (amount: number) => void;
  logout: () => void;
  setSortType: (type: Store['sortType']) => void;
  getSortedCars: () => Car[];
  updateMessageStatus: (messageId: string, newStatus: BookingStatus) => void;
  createBooking: (carId: string) => void;
  processBooking: (messageId: string) => void;
  getMessagesByRole: () => Message[];
  updateUserRole: (role: 'buyer' | 'seller') => void;
  login: (email: string, password: string, role: 'buyer' | 'seller') => void;
  chatMessages: Record<string, ChatMessage[]>;
  sendMessage: (messageId: string, text: string) => void;
  filters: {
    carTypes: CarType[];
    priceRange: {
      min: number;
      max: number;
    };
    distance: number;
  };
  setFilters: (filters: Partial<Store['filters']>) => void;
  resetFilters: () => void;
  addCar: (carData: Partial<Car>) => void;
  reviews: Review[];
  getReviewsByCarId: (carId: string) => Review[];
  getAverageRatingByCarId: (carId: string) => string;
  updateCarRating: (carId: string) => void;
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
      type: 'Внедорожник',
      age: 3,
      acceleration: 6.1,
      horsepower: 340,
      year: 2021,
      mileage: 45000,
      ownerName: 'Александр Петров',
      reviewsCount: 12
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
      type: 'Седан',
      age: 5,
      acceleration: 7.8,
      horsepower: 184,
      year: 2019,
      mileage: 78000,
      ownerName: 'Мария Сидорова',
      reviewsCount: 8
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
      type: 'Купе',
      age: 2,
      acceleration: 6.3,
      horsepower: 252,
      year: 2022,
      mileage: 32000,
      ownerName: 'Дмитрий Козлов',
      reviewsCount: 15
    },
    {
      id: '4',
      title: 'Ferrari 250 GTO',
      price: 1000000,
      priceDisplay: '1000000 ₽/сутки',
      rating: 3,
      distance: '10 км',
      distanceValue: 10,
      image: 'https://avatars.mds.yandex.net/get-verba/1030388/2a000001609484b1d12dbb9071b3b1af0943/cattouchret',
      description: 'Красивый автомобиль, который можно использовать для фотосессий',
      type: 'Внедорожник',
      age: 7,
      acceleration: 9.2,
      horsepower: 110,
      year: 2017,
      mileage: 120000,
      ownerName: 'Елена Волкова',
      reviewsCount: 6
    },
    {
      id: '5',
      title: 'Rolls-Royce Boat Tail',
      price: 30000,
      priceDisplay: '30000 ₽/сутки',
      rating: 2,
      distance: '15 км',
      distanceValue: 15,
      image: 'https://avatars.mds.yandex.net/get-verba/787013/2a0000018e9e9af4b958fe20fee73ac6b3ab/cattouchret',
      description: 'Кабриолет F-класса, задний привод. Автомат.',
      type: 'Кабриолет',
      age: 1,
      acceleration: 5.9,
      horsepower: 571,
      year: 2023,
      mileage: 1000,
      ownerName: 'Алексей Иванов',
      reviewsCount: 2
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
      type: 'Внедорожник',
      age: 2,
      acceleration: 3.7,
      horsepower: 750,
      year: 2021,
      mileage: 3000,
      ownerName: 'Екатерина Петрова',
      reviewsCount: 10
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
      type: 'Внедорожник',
      age: 1,
      acceleration: 2.4,
      horsepower: 1500,
      year: 2022,
      mileage: 1000,
      ownerName: 'Сергей Кузнецов',
      reviewsCount: 4
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
      type: 'Седан',
      age: 1,
      acceleration: 2.7,
      horsepower: 850,
      year: 2023,
      mileage: 500,
      ownerName: 'Ольга Иванова',
      reviewsCount: 2
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
      type: 'Внедорожник',
      age: 1,
      acceleration: 2.8,
      horsepower: 1600,
      year: 2023,
      mileage: 1000,
      ownerName: 'Ирина Петрова',
      reviewsCount: 3
    },
    {
      id: '10',
      title: 'Maybach Exelero',
      price: 70000,
      priceDisplay: '70000 ₽/сутки',
      rating: 2,
      distance: '40 км',
      distanceValue: 40,
      image: 'https://avatars.mds.yandex.net/get-verba/787013/2a0000016095f2a1a5b600f86a2908ad8eab/cattouchret',
      description: 'Автомобиль бизнес класса',
      type: 'Седан',
      age: 1,
      acceleration: 4.2,
      horsepower: 612,
      year: 2022,
      mileage: 5000,
      ownerName: 'Анна Кузнецова',
      reviewsCount: 1
    },
  ],
  favorites: [
    {
      id: '1',
      title: 'BMW X5',
      price: 5000,
      priceDisplay: '5000 ₽/сутки',
      rating: 4.8,
      distance: '2.5 км от вас',
      distanceValue: 2.5,
      image: 'https://cdn.apiweb.rolf.ru/storage/thumbnails/large/models/14-bmw/4921-x5_new/c65f831967794f342c1ab1d8464c7d58.png',
      description: 'Отличный автомобиль в идеальном состоянии',
      type: 'Внедорожник',
      age: 3,
      acceleration: 6.1,
      horsepower: 340,
      year: 2021,
      mileage: 45000,
      ownerName: 'Александр Петров',
      reviewsCount: 12
    },
    {
      id: '2',
      title: 'Mercedes-Benz C-Class',
      price: 4500,
      priceDisplay: '4500 ₽/сутки',
      rating: 4.9,
      distance: '3.1 км от вас',
      distanceValue: 3.1,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Mercedes-Benz_W206_IMG_6380.jpg/1280px-Mercedes-Benz_W206_IMG_6380.jpg',
      description: 'Комфортный седан для поездок по городу',
      type: 'Седан',
      age: 5,
      acceleration: 7.8,
      horsepower: 184,
      year: 2019,
      mileage: 78000,
      ownerName: 'Мария Сидорова',
      reviewsCount: 8
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
    balance: 350000000,
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
    const { cars, filters, sortType } = get();
    let filteredCars = [...cars];

    // Применяем фильтры только если они активны
    const hasActiveFilters = 
        filters.carTypes.length > 0 || 
        filters.priceRange.min > 3000 || 
        filters.priceRange.max < 10000 || 
        filters.distance < 10;

    if (hasActiveFilters) {
        if (filters.carTypes.length > 0) {
            filteredCars = filteredCars.filter(car => 
                filters.carTypes.includes(car.type as CarType)
            );
        }

        if (filters.priceRange.min > 3000 || filters.priceRange.max < 10000) {
            filteredCars = filteredCars.filter(car => 
                car.price >= filters.priceRange.min && 
                car.price <= filters.priceRange.max
            );
        }

        if (filters.distance < 10) {
            filteredCars = filteredCars.filter(car => 
                car.distanceValue <= filters.distance
            );
        }
    }

    // Применяем сортировку
    if (sortType) {
        switch (sortType) {
            case 'priceAsc':
                filteredCars.sort((a, b) => a.price - b.price);
                break;
            case 'priceDesc':
                filteredCars.sort((a, b) => b.price - a.price);
                break;
            case 'distance':
                filteredCars.sort((a, b) => a.distanceValue - b.distanceValue);
                break;
            case 'rating':
                filteredCars.sort((a, b) => b.rating - a.rating);
                break;
        }
    }

    return filteredCars;
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
        balance: 150000000,
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
  filters: {
    carTypes: [],
    priceRange: {
      min: 3000,
      max: 10000
    },
    distance: 10
  },
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  resetFilters: () => set((state) => ({
    filters: {
      carTypes: [],
      priceRange: { min: 3000, max: 10000 },
      distance: 10
    }
  })),
  addCar: (carData: Partial<Car>) => {
    const { user } = get();
    const newCar: Car = {
      id: Date.now().toString(),
      title: carData.title || '',
      price: carData.price || 0,
      priceDisplay: `${carData.price || 0} ₽/день`,
      rating: Math.random() * 2 + 3, // Рейтинг от 3 до 5
      distance: `${Math.floor(Math.random() * 10) + 1} км`,
      distanceValue: Math.floor(Math.random() * 10) + 1,
      image: carData.image || 'https://avatars.mds.yandex.net/get-verba/787013/2a00000190ba929fe36ec6c6fb366b130924/cattouchret',
      description: carData.description || 'Описание автомобиля',
      type: 'Седан', // Дефолтный тип
      // Новые поля с дефолтными значениями
      age: carData.age || 3,
      acceleration: carData.acceleration || 7.0,
      horsepower: carData.horsepower || 150,
      year: carData.year || 2021,
      mileage: carData.mileage || 50000,
      ownerName: user.name || 'Владелец',
      reviewsCount: Math.floor(Math.random() * 20) + 1,
      sellerId: user.id,
    };

    set((state) => ({
      cars: [newCar, ...state.cars] // Добавляем новое объявление в начало списка
    }));
  },
  reviews: [
    {
      id: '1',
      carId: '1',
      userPhoto: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXhSzkvMUoGwMYqTFzxIDrFeYzKWt-a8-zwuQbOLNqD09pm8lSZzuwgArk4U4OTPlaXpPXcLno82nowcd0ZRJYuw',
      userName: 'Александр Петров',
      userType: 'Юр лицо',
      rating: 5,
      carRating: 5,
      comment: 'Тачка просто улет! Обязательно возьму еще раз покататься! Очень доволен качеством автомобиля и сервисом.',
      timestamp: '16:45 20.11.2024'
    },
    {
      id: '2',
      carId: '1',
      userPhoto: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXhSzkvMUoGwMYqTFzxIDrFeYzKWt-a8-zwuQbOLNqD09pm8lSZzuwgArk4U4OTPlaXpPXcLno82nowcd0ZRJYuw',
      userName: 'Мария Сидорова',
      userType: 'Физ лицо',
      rating: 4,
      carRating: 4,
      comment: 'Хороший автомобиль, но есть небольшие недочеты. В целом довольна арендой.',
      timestamp: '14:30 19.11.2024'
    },
    {
      id: '3',
      carId: '1',
      userPhoto: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXhSzkvMUoGwMYqTFzxIDrFeYzKWt-a8-zwuQbOLNqD09pm8lSZzuwgArk4U4OTPlaXpPXcLno82nowcd0ZRJYuw',
      userName: 'Дмитрий Козлов',
      userType: 'Физ лицо',
      rating: 2,
      carRating: 3,
      comment: 'Не очень доволен. Машина была грязная, кондиционер не работал. Не рекомендую.',
      timestamp: '12:15 18.11.2024'
    },
    {
      id: '4',
      carId: '1',
      userPhoto: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXhSzkvMUoGwMYqTFzxIDrFeYzKWt-a8-zwuQbOLNqD09pm8lSZzuwgArk4U4OTPlaXpPXcLno82nowcd0ZRJYuw',
      userName: 'Елена Волкова',
      userType: 'Юр лицо',
      rating: 5,
      carRating: 5,
      comment: 'Отличный автомобиль! Все работает идеально, владелец очень вежливый. Обязательно обращусь еще раз.',
      timestamp: '10:20 17.11.2024'
    },
    {
      id: '5',
      carId: '1',
      userPhoto: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXhSzkvMUoGwMYqTFzxIDrFeYzKWt-a8-zwuQbOLNqD09pm8lSZzuwgArk4U4OTPlaXpPXcLno82nowcd0ZRJYuw',
      userName: 'Иван Смирнов',
      userType: 'Физ лицо',
      rating: 4,
      carRating: 4,
      comment: 'Неплохой автомобиль для городских поездок.',
      timestamp: '09:15 16.11.2024'
    },
    {
      id: '6',
      carId: '1',
      userPhoto: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXhSzkvMUoGwMYqTFzxIDrFeYzKWt-a8-zwuQbOLNqD09pm8lSZzuwgArk4U4OTPlaXpPXcLno82nowcd0ZRJYuw',
      userName: 'Анна Козлова',
      userType: 'Юр лицо',
      rating: 5,
      carRating: 5,
      comment: 'Отличная машина! Все работает как часы.',
      timestamp: '08:30 15.11.2024'
    },
    {
      id: '7',
      carId: '1',
      userPhoto: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXhSzkvMUoGwMYqTFzxIDrFeYzKWt-a8-zwuQbOLNqD09pm8lSZzuwgArk4U4OTPlaXpPXcLno82nowcd0ZRJYuw',
      userName: 'Петр Иванов',
      userType: 'Физ лицо',
      rating: 3,
      carRating: 4,
      comment: 'Нормальная машина, но могло быть и лучше.',
      timestamp: '07:45 14.11.2024'
    },
    {
      id: '8',
      carId: '1',
      userPhoto: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXhSzkvMUoGwMYqTFzxIDrFeYzKWt-a8-zwuQbOLNqD09pm8lSZzuwgArk4U4OTPlaXpPXcLno82nowcd0ZRJYuw',
      userName: 'Светлана Петрова',
      userType: 'Физ лицо',
      rating: 5,
      carRating: 5,
      comment: 'Превосходный автомобиль! Очень довольна.',
      timestamp: '06:20 13.11.2024'
    },
    {
      id: '9',
      carId: '1',
      userPhoto: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXhSzkvMUoGwMYqTFzxIDrFeYzKWt-a8-zwuQbOLNqD09pm8lSZzuwgArk4U4OTPlaXpPXcLno82nowcd0ZRJYuw',
      userName: 'Михаил Сидоров',
      userType: 'Юр лицо',
      rating: 4,
      carRating: 4,
      comment: 'Хороший автомобиль для бизнес-поездок.',
      timestamp: '05:10 12.11.2024'
    },
    {
      id: '10',
      carId: '1',
      userPhoto: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXhSzkvMUoGwMYqTFzxIDrFeYzKWt-a8-zwuQbOLNqD09pm8lSZzuwgArk4U4OTPlaXpPXcLno82nowcd0ZRJYuw',
      userName: 'Ольга Козлова',
      userType: 'Физ лицо',
      rating: 5,
      carRating: 5,
      comment: 'Лучший автомобиль из всех, что я арендовала!',
      timestamp: '04:30 11.11.2024'
    },
    {
      id: '11',
      carId: '1',
      userPhoto: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXhSzkvMUoGwMYqTFzxIDrFeYzKWt-a8-zwuQbOLNqD09pm8lSZzuwgArk4U4OTPlaXpPXcLno82nowcd0ZRJYuw',
      userName: 'Денис Волков',
      userType: 'Физ лицо',
      rating: 4,
      carRating: 4,
      comment: 'Солидный автомобиль, рекомендую.',
      timestamp: '03:15 10.11.2024'
    },
    {
      id: '12',
      carId: '1',
      userPhoto: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXhSzkvMUoGwMYqTFzxIDrFeYzKWt-a8-zwuQbOLNqD09pm8lSZzuwgArk4U4OTPlaXpPXcLno82nowcd0ZRJYuw',
      userName: 'Татьяна Смирнова',
      userType: 'Юр лицо',
      rating: 5,
      carRating: 5,
      comment: 'Идеальный автомобиль для наших нужд!',
      timestamp: '02:45 09.11.2024'
    }
  ],
  getReviewsByCarId: (carId: string) => {
    return get().reviews.filter(review => review.carId === carId);
  },
  getAverageRatingByCarId: (carId: string) => {
    const carReviews = get().reviews.filter(review => review.carId === carId);
    if (carReviews.length === 0) return '0.0';
    const totalRating = carReviews.reduce((sum, review) => sum + review.carRating, 0);
    return (totalRating / carReviews.length).toFixed(1);
  },
  updateCarRating: (carId: string) => {
    const averageRating = get().getAverageRatingByCarId(carId);
    set((state) => ({
      cars: state.cars.map(car => 
        car.id === carId 
          ? { ...car, rating: parseFloat(averageRating) }
          : car
      )
    }));
  },
})); 