import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <LinearGradient colors={['#cdb7af', '#C9A7A2']} style={styles.container}>
      {children}
    </LinearGradient>
  );
};

export default GradientContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
