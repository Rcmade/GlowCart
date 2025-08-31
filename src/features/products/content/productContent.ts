import { SortOption } from '../hooks/useProductFilters';

export const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: 'price_asc', label: 'Price: Low → High' },
  { key: 'price_desc', label: 'Price: High → Low' },
  { key: 'rating_desc', label: 'Rating: High → Low' },
  { key: 'rating_asc', label: 'Rating: Low → High' },
  { key: 'newest', label: 'Newest' },
];

export const TAGS = [
  'beauty',
  'lipstick',
  'fragrances',
  'clothing',
  'dresses',
  'handbags',
  'watches',
  'eyewear',
  'footwear',
  'fashion accessories',
];
export const LIMITS = [10, 20, 50];
