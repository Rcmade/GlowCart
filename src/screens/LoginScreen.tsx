import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputWithIcon from '../components/inputs/InputWithIcon';
import PasswordInput from '../components/inputs/PasswordInput';
import AuthLayout from '../components/layouts/AuthLayout';
import useLogin from '../features/auth/hooks/useLogin';
import { useTheme } from '../providers/theme/ThemeProvider';
import { ThemeType } from '../providers/theme/themes';

export default function LoginScreen() {
  const { handleInputChange, handleSubmit, inputs, isLoading } = useLogin();

  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <>
      <AuthLayout
        navigate="Register"
        title="Hello Again!"
        subTitle={<>Welcome back you've{'\n'}been missed.</>}
      >
        {/* Email */}
        <InputWithIcon
          icon="mail"
          placeholder="Enter your email Id"
          value={inputs.email}
          onChangeText={text => handleInputChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {/* Password */}
        <PasswordInput
          placeholder="Password"
          value={inputs.password}
          onChangeText={text => handleInputChange('password', text)}
        />

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password</Text>
        </TouchableOpacity>
        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </Text>
        </TouchableOpacity>
        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or Continue With</Text>
          <View style={styles.line} />
        </View>
        {/* Social Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/images/google.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/images/apple.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/images/facebook.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </AuthLayout>
    </>
  );
}
const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.backgroundWarm },

    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: 30,
    },
    forgotPasswordText: {
      color: theme.colors.primaryLight,
      fontSize: 18,
      textDecorationLine: 'underline',
    },
    loginButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      borderRadius: 12,
      marginBottom: 30,
    },
    loginButtonDisabled: {
      opacity: 0.8,
    },
    loginButtonText: {
      color: theme.colors.backgroundLight,
      fontSize: 24,
      fontWeight: '500',
      textAlign: 'center',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 25,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.secondaryGray,
    },
    orText: {
      marginHorizontal: 10,
      color: theme.colors.secondaryGray,
      fontSize: 16,
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      marginBottom: 40,
    },
    socialButton: {
      width: 55,
      height: 55,
      borderRadius: 12,
      backgroundColor: theme.colors.backgroundLight,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
    },
    socialIcon: {
      width: 28,
      height: 28,
      resizeMode: 'contain',
    },
  });
