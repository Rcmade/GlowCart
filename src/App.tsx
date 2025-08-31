import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import QueryProvider from './providers/QueryProvider';
import { ThemeProvider } from './providers/theme/ThemeProvider';

export default function App() {
  return (
    <>
      <QueryProvider>
        <ThemeProvider>
          <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </QueryProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
