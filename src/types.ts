/**
 * Core Data Models for Travel Market 2026
 */

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  PARTNER = 'PARTNER'
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  createdAt: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  climate: string;
  security: string;
  language: string;
  currency: string;
  images: string[];
  location: {
    lat: number;
    lng: number;
  };
  mainAirport: string;
  nearbyStadiums: string[];
  upcomingEvents: string[];
}

export interface Hotel {
  id: string;
  cityId: string;
  name: string;
  stars: number;
  pricePerNight: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  images: string[];
  amenities: string[];
  description: string;
  availability: boolean;
  rating: number;
  policies: string;
}

export interface Restaurant {
  id: string;
  cityId: string;
  name: string;
  foodType: string;
  averagePrice: number;
  schedule: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  images: string[];
  rating: number;
  menu: string[];
}

export interface Booking {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'hotel' | 'restaurant' | 'tour' | 'transport' | 'package';
  startDate: string;
  endDate?: string;
  totalPrice: number;
  status: 'pending' | 'paid' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'city' | 'hotel' | 'restaurant' | 'tour';
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'city' | 'hotel' | 'restaurant' | 'tour';
  createdAt: string;
}
