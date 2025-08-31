import { useQuery } from '@tanstack/react-query';
import { categoryList } from '../content/categoryContent';

const useCategory = () => {
  return useQuery({
    queryKey: ['category'],
    // TODO, fetch category from the real api
    queryFn: () => categoryList,
  });
};

export default useCategory;
