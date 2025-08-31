import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import InputWithIcon from '../components/inputs/InputWithIcon';
import PasswordInput from '../components/inputs/PasswordInput';
import AuthLayout from '../components/layouts/AuthLayout';
import useRegister from '../features/auth/hooks/useRegister';
import { useTheme } from '../providers/theme/ThemeProvider';
import { ThemeType } from '../providers/theme/themes';

export default function RegisterScreen() {
  const { handleSubmit, inputs, isLoading, handleInputChange } = useRegister();

  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <>
      <AuthLayout navigate="Login" title="Join The Glow!">
        <InputWithIcon
          icon="user"
          style={styles.input}
          placeholder="Full Name"
          value={inputs.name}
          onChangeText={text => handleInputChange('name', text)}
        />

        <InputWithIcon
          icon="mail"
          style={styles.input}
          placeholder="Email Address"
          value={inputs.email}
          onChangeText={text => handleInputChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <PasswordInput
          placeholder="Password"
          value={inputs.password}
          onChangeText={text => handleInputChange('password', text)}
        />

        <PasswordInput
          placeholder="Confirm Password"
          value={inputs.confirmPassword}
          onChangeText={text => handleInputChange('confirmPassword', text)}
        />

        <TouchableOpacity
          style={[
            styles.registerButton,
            isLoading && styles.registerButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.registerButtonText}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>
      </AuthLayout>
    </>
  );
}
const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.backgroundWarm },

    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 30,
    },
    backButton: {
      alignSelf: 'flex-start',
      marginTop: 10,
      marginBottom: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.accent,
      marginBottom: 15,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.lightGray,
      textAlign: 'center',
      lineHeight: 24,
    },
    formContainer: {
      width: '100%',
    },
    inputContainer: {
      position: 'relative',
      marginBottom: 20,
    },
    input: {
      backgroundColor: theme.colors.backgroundLight,
      paddingHorizontal: 20,
      paddingVertical: 18,
      borderRadius: 12,
      fontSize: 16,
      paddingRight: 50,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    inputIcon: {
      position: 'absolute',
      right: 20,
      top: 18,
    },
    registerButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 18,
      borderRadius: 12,
      marginTop: 20,
      marginBottom: 30,
    },
    registerButtonDisabled: {
      opacity: 0.6,
    },
    registerButtonText: {
      color: theme.colors.backgroundLight,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    loginText: {
      color: theme.colors.lightGray,
      fontSize: 14,
    },
    loginLink: {
      color: theme.colors.accent,
      fontSize: 14,
      fontWeight: '600',
    },
  });
