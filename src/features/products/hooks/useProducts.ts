import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { fetchProducts, FetchProductsParams } from '../api';
import { Product } from '../types';
import { ProductFilters } from './useProductFilters';

type UseProductsOptions = {
  filters: ProductFilters;
  enabled?: boolean;
  // debounce ms for search queries
  searchDebounceMs?: number;
};

export function useProducts({
  filters,
  enabled = true,
  searchDebounceMs = 300,
}: UseProductsOptions) {
  const debouncedSearch = useDebouncedValue(filters.search, searchDebounceMs);

  // Build base params (these are sent to the server)
  const buildServerParams = (pageParam: number): FetchProductsParams => ({
    limit: filters.limit,
    skip: pageParam,
    search: debouncedSearch || undefined,
    category: filters.category || undefined,
  });

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [
      'products',
      {
        search: debouncedSearch,
        category: filters.category,
        limit: filters.limit,
      },
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const params = buildServerParams(pageParam);
      const res = await fetchProducts(params);
      return res;
    },

    initialPageParam: 0,
    enabled: enabled,
    getNextPageParam: lastPage => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
  });

  // Flatten pages into array
  const allServerProducts: Product[] = data
    ? (data.pages || []).flatMap(p => p.products)
    : [];

  const applyClientFiltersAndSort = (items: Product[]): Product[] => {
    let out = [...items];

    if (filters.tags?.length) {
      out = out.filter(p => {
        if (!p.tags || p.tags.length === 0) return false;
        return filters.tags.some(t => p.tags!.includes(t));
      });
    }

    // Sorting
    switch (filters.sort) {
      case 'price_asc':
        out.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        out.sort((a, b) => b.price - a.price);
        break;
      case 'rating_asc':
        out.sort((a, b) => a.rating?.rate - b.rating?.rate);
        break;
      case 'rating_desc':
        out.sort((a, b) => b.rating?.rate - a.rating?.rate);
        break;
      case 'newest':
        out.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return out;
  };

  const filteredProducts = applyClientFiltersAndSort(allServerProducts);

  return {
    products: filteredProducts,
    rawPages: data?.pages ?? [],
    total: data?.pages?.[0]?.total ?? 0,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
}
