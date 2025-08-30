import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import QueryProvider from './providers/QueryProvider';

export default function App() {
  return (
    <>
      <QueryProvider>
        <GestureHandlerRootView style={styles.container}>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </QueryProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
