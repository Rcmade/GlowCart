import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCurrentUser } from '../../auth/hooks/useCurrentUser';
import { getWishlistByEmail, toggleWishlistItem } from '../api';

export default function useWishlist() {
  const { currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const email = currentUser?.email ?? '';

  const {
    data: wishlist = [],
    isLoading,
    isError,
    error,
  } = useQuery<number[]>({
    queryKey: ['wishlist', email],
    queryFn: () => {
      if (!email) throw new Error('No user email provided');
      return getWishlistByEmail(email);
    },
    enabled: !!email,
  });

  const { mutate: toggle } = useMutation({
    mutationFn: (productId: number) => {
      if (!email) throw new Error('No user email');
      return toggleWishlistItem(email, productId);
    },
    onSuccess: updated => {
      queryClient.setQueryData(['wishlist', email], updated);
      queryClient.invalidateQueries({ queryKey: ['wishlistProducts'] });
    },
  });

  return {
    wishlist,
    isLoading,
    isError,
    error,
    toggle,
  };
}
