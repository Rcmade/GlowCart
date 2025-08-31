// src/hooks/useProductFilters.ts
import { useCallback, useMemo, useState } from 'react';

export type SortOption =
  | 'price_asc'
  | 'price_desc'
  | 'rating_asc'
  | 'rating_desc'
  | 'newest'
  | null;

export type ProductFilters = {
  search: string;
  category: string | null;
  tags: string[];
  limit: number;
  sort: SortOption;
};

export const useProductFilters = (initial?: Partial<ProductFilters>) => {
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: null,
    tags: [],
    limit: 20,
    sort: null,
    ...initial,
  });

  const setSearch = useCallback(
    (s: string) => setFilters(f => ({ ...f, search: s })),
    [],
  );
  const setCategory = useCallback(
    (c: string | null) => setFilters(f => ({ ...f, category: c })),
    [],
  );
  const setTags = useCallback(
    (tags: string[]) => setFilters(f => ({ ...f, tags })),
    [],
  );
  const setLimit = useCallback(
    (limit: number) => setFilters(f => ({ ...f, limit })),
    [],
  );
  const setSort = useCallback(
    (sort: SortOption) => setFilters(f => ({ ...f, sort })),
    [],
  );
  const resetFilters = useCallback(
    () =>
      setFilters({
        search: '',
        category: null,
        tags: [],
        limit: 20,
        sort: null,
      }),
    [],
  );

  const appliedCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.category) count++;
    if (filters.tags.length > 0) count++;
    if (filters.sort) count++;
    return count;
  }, [filters]);

  return {
    appliedCount,
    filters,
    setSearch,
    setCategory,
    setTags,
    setLimit,
    setSort,
    resetFilters,
  };
};
