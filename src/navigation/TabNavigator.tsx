import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import HomeScreen from '../screens/HomeScreen';
import OffersScreen from '../screens/OffersScreen';
import WishlistScreen from '../screens/WishlistScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type TabParamList = {
  Home: undefined;
  Offers: undefined;
  Wishlist: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Generic Icon renderer
type IconLib = 'Ionicons' | 'Octicons';
const createTabIcon =
  (iconName: string, from: IconLib = 'Ionicons') =>
  ({ size, color }: { size: number; color: string }) => {
    const Icon = from === 'Ionicons' ? Ionicons : Octicons;
    return <Icon name={iconName} size={size} color={color} />;
  };

export default function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#B84953',
          tabBarInactiveTintColor: '#636363',
          tabBarStyle: {
            height: 58 + insets.bottom,
          },
        }}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          // component={HomeScreen}
          component={HomeScreen}
          options={{ tabBarIcon: createTabIcon('home') }}
        />
        <Tab.Screen
          name="Offers"
          component={OffersScreen}
          options={{ tabBarIcon: createTabIcon('tag', 'Octicons') }}
        />
        <Tab.Screen
          name="Wishlist"
          component={WishlistScreen}
          options={{ tabBarIcon: createTabIcon('heart-outline') }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarIcon: createTabIcon('person-circle-outline') }}
        />
      </Tab.Navigator>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'FFEDE8',
//   },
// });
