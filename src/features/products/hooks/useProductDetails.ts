import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api';
import { Product } from '../types';

export default function useProductDetails(id?: string | number) {
  const numericId =
    id == null ? undefined : typeof id === 'string' ? Number(id) : id;

  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery<Product>({
    queryKey: ['product', numericId],

    queryFn: async () => {
      if (numericId === undefined) throw new Error('Missing product id');
      return fetchProductById(numericId);
    },
    enabled: !!numericId,
  });

  return {
    product: product ?? null,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
}
