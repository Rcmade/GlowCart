import { useQuery } from '@tanstack/react-query';
import { getItem } from '../../../lib/asyncStorage';
import { fetchProductById } from '../../products/api';
import { Product } from '../../products/types';

async function fetchWishlistProducts(): Promise<Product[]> {
  const user = await getItem('currentUser');
  if (!user) return [];

  const wishlist = await getItem('wishlists');
  const userWishlist = wishlist?.[user?.email];
  if (!userWishlist) return [];

  const products: Product[] = [];
  for (const id of userWishlist) {
    const product = await fetchProductById(id);
    products.push(product);
  }
  return products;
}

export default function useWishlistProducts() {
  const {
    data: products,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ['wishlistProducts'],
    queryFn: fetchWishlistProducts,
  });

  return {
    products: products ?? [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
}
