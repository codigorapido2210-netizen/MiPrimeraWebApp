import { create } from 'zustand';
import { User, City } from './types';

interface TravelStore {
  user: User | null;
  selectedCity: City | null;
  searchQuery: string;
  setUser: (user: User | null) => void;
  setSelectedCity: (city: City | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useTravelStore = create<TravelStore>((set) => ({
  user: null,
  selectedCity: null,
  searchQuery: '',
  setUser: (user) => set({ user }),
  setSelectedCity: (selectedCity) => set({ selectedCity }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
