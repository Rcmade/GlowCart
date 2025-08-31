import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../features/auth/types';

export interface StorageSchema {
  user: User;
  users: User[];
  token: string;
  theme: 'light' | 'dark';
  currentUser: User | null;
  wishlists: Record<string, number[]>;
}
type StorageKey = keyof StorageSchema;

export async function setItem<K extends StorageKey>(
  key: K,
  value: StorageSchema[K],
): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getItem<K extends StorageKey>(
  key: K,
): Promise<StorageSchema[K] | null> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as StorageSchema[K]) : null;
}

export async function removeItem<K extends StorageKey>(key: K): Promise<void> {
  await AsyncStorage.removeItem(key);
}
