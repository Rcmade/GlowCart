import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/AppNavigator';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subTitle?: string | ReactNode;
  navigate: 'Login' | 'Register';
}

const AuthLayout = ({
  children,
  title,
  subTitle,
  navigate,
}: AuthLayoutProps) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, AuthLayoutProps['navigate']>
    >();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={styles.container}>
        <SafeAreaView
          edges={['left', 'right', 'bottom']}
          style={styles.container}
        >
          {/* Header*/}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {subTitle && <Text style={styles.subtitle}>{subTitle}</Text>}
          </View>

          {/* Form */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.formContainer}>{children}</View>
              <View style={styles.bottomContainer}>
                <Text style={styles.helpText}>
                  {navigate === 'Login'
                    ? 'Already have an account? '
                    : 'Not a Member? '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate(navigate)}>
                  <Text style={styles.navigationText}>
                    {navigate === 'Login' ? 'Login' : 'Register Now'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFEDE8' },
  header: {
    alignItems: 'center',
    paddingVertical: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 58,
    paddingBottom: 58,
    backgroundColor: '#F1B0B0',
  },
  title: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: '900',
    color: '#B84953',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',

    fontSize: 26,
    color: '#AD7373',
    fontWeight: '500',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },

  formContainer: {
    width: '100%',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  helpText: {
    color: '#6C6C6C',
    fontSize: 16,
  },
  navigationText: {
    color: '#B84953',
    fontSize: 14,
    fontWeight: '600',
  },
});
