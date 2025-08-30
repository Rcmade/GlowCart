// hooks/useCurrentUser.ts
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getItem, removeItem } from '../../../lib/asyncStorage';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../../types';

const STORAGE_KEY = 'currentUser';

export function useCurrentUser() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const queryClient = useQueryClient();

  const {
    data: currentUser,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [STORAGE_KEY],
    queryFn: async () => {
      const user = await getItem(STORAGE_KEY);
      return user || null;
    },
  });

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      await removeItem(STORAGE_KEY);
    },
    onSuccess: () => {
      queryClient.setQueryData([STORAGE_KEY], null);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    currentUser,
    isLoading,
    logout,
    isLoggingOut,
  };
}
