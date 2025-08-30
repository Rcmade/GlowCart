import { useState } from 'react';
import { Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { UserRegisterT } from '../types';
import { getItem, setItem } from '../../../lib/asyncStorage';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../../types';

const defaultValues: UserRegisterT = {
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
};

const useRegister = () => {
  const [inputs, setInputs] = useState<UserRegisterT>(defaultValues);
  const navigation = useNavigation<ScreenNavigationProp>();

  const { mutate: register, isPending } = useMutation({

    mutationFn: async (newUser: UserRegisterT) => {
      const { confirmPassword, email, name, password } = newUser;

      if (!name || !password || !email || !confirmPassword) {
        throw new Error('Please fill in all fields');
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Invalid email format');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const users = (await getItem('users')) || [];

      const alreadyExists = users.some(u => u.email === newUser.email);
      if (alreadyExists) {
        throw new Error('User already registered with this email');
      }

      const updatedUsers = [...users, newUser];
      await setItem('users', updatedUsers);
      await setItem('currentUser', newUser);

      return newUser;
    },
    onSuccess: data => {
      Alert.alert('Success', `Welcome ${data.name}!`, [
        {
          text: 'OK',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }],
            }),
        },
      ]);
      setInputs(defaultValues);
    },
    onError: error => {
      if (error instanceof Error) {
        Alert.alert('Registration Failed', error.message);
      } else {
        Alert.alert('Registration Failed', 'Something went wrong');
      }
    },
  });

  const handleSubmit = () => register(inputs);

  const handleInputChange = <K extends keyof UserRegisterT>(
    key: K,
    value: UserRegisterT[K],
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

export default useRegister;
