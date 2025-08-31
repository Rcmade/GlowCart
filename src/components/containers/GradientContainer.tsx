import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../providers/theme/ThemeProvider';

const GradientContainer = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <LinearGradient
      colors={[theme.colors.gradientWarm1, theme.colors.gradientWarm2]}
      style={styles.container}
    >
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
