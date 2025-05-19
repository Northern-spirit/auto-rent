import { create } from 'zustand';

interface Car {
  id: string;
  title: string;
  price: string;
  rating: number;
  distance: string;
  image: string;
  description: string;
}

interface Store {
  favorites: Car[];
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: string) => void;
}

export const useStore = create<Store>((set) => ({
  favorites: [
    {
      id: '1',
      title: 'BMW X5',
      price: '5000 ₽/сутки',
      rating: 4.8,
      distance: '2.5 км',
      image: 'https://example.com/car1.jpg',
      description: 'Отличный автомобиль в идеальном состоянии',
    },
    {
      id: '2',
      title: 'Mercedes-Benz C-Class',
      price: '4500 ₽/сутки',
      rating: 4.9,
      distance: '3.1 км',
      image: 'https://example.com/car2.jpg',
      description: 'Комфортный седан для поездок по городу',
    },
  ],
  addToFavorites: (car) => 
    set((state) => ({ 
      favorites: [...state.favorites, car] 
    })),
  removeFromFavorites: (carId) =>
    set((state) => ({
      favorites: state.favorites.filter((car) => car.id !== carId)
    })),
})); 