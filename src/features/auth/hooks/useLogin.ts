// hooks/useLogin.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { UserLoginT } from '../types';
import { getItem, setItem } from '../../../lib/asyncStorage';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../../types';

const defaultValues: UserLoginT = {
  email: '',
  password: '',
};

const useLogin = () => {
  const [inputs, setInputs] = useState<UserLoginT>(defaultValues);
  const navigation = useNavigation<ScreenNavigationProp>();

  const { mutate: login, isPending } = useMutation({
    mutationFn: async (credentials: UserLoginT) => {
      const { email, password } = credentials;

      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Invalid email format');
      }

      const users = (await getItem('users')) || [];
      const existingUser = users.find(u => u.email === email);

      if (!existingUser) {
        throw new Error(
          'No user found with this email. Please try to Register first',
        );
      }

      if (existingUser.password !== password) {
        throw new Error('Incorrect password');
      }

      // store active session
      await setItem('currentUser', existingUser);

      return existingUser;
    },
    onSuccess: () => {
      setInputs(defaultValues);
      navigation.reset({
        routes: [{ name: 'Main' }],
      });
    },
    onError: error => {
      if (error instanceof Error) {
        Alert.alert('Login Failed', error.message);
      } else {
        Alert.alert('Login Failed', 'Something went wrong');
      }
    },
  });

  const handleSubmit = () => login(inputs);

  const handleInputChange = <K extends keyof UserLoginT>(
    key: K,
    value: UserLoginT[K],
  ) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  return {
    inputs,
    isLoading: isPending,
    handleSubmit,
    handleInputChange,
  };
};

export default useLogin;
