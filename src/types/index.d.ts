import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  discountPercentage?: number;
  stock?: number;
  brand?: string;
  thumbnail?: string;
  images?: string[];

  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;

  reviews?: {
    rating?: number;
    comment?: string;
    date?: string;
    reviewerName?: string;
    reviewerEmail?: string;
  }[];
}

export type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
