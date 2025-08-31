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
  tags?: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
