import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientContainer from '../components/containers/GradientContainer';
import { useCurrentUser } from '../features/auth/hooks/useCurrentUser';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../providers/theme/ThemeProvider';
import { ThemeType } from '../providers/theme/themes';

const { width, height } = Dimensions.get('window');
type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

export default function OnboardingScreen() {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const { currentUser, isLoading } = useCurrentUser();

  const { theme } = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    if (!isLoading) {
      if (currentUser) {
        navigation.replace('Main');
      } else {
        navigation.replace('Login');
      }
    }
    return () => {};
  }, [currentUser, isLoading, navigation]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <GradientContainer>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/onboarding-transparent.png')}
                style={styles.heroImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.brandName}>Viorra</Text>
              <Text style={styles.tagline}>Your Beauty, Delivered.</Text>
            </View>

            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            <View style={styles.indicators}>
              <View style={[styles.indicator]} />
            </View>
          </View>
        </SafeAreaView>
      </GradientContainer>
    </>
  );
}

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 50,
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    heroImage: {
      width: width * 0.9,
      height: height * 0.7,
      borderRadius: 20,
    },
    textContainer: {
      alignItems: 'center',
      marginVertical: 40,
    },
    brandName: {
      fontSize: 60,
      fontWeight: '400',
      color: theme.colors.backgroundLight,
      fontFamily: 'Italiana',
      textAlign: 'center',
      letterSpacing: 2,
      marginBottom: 10,
    },
    tagline: {
      fontSize: 24,
      fontWeight: '300',
      color: theme.colors.backgroundLight,
      textAlign: 'center',
      opacity: 0.9,
      letterSpacing: 1,
    },
    getStartedButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 40,
      paddingVertical: 14,
      borderRadius: 25,
      marginBottom: 30,
    },
    buttonText: {
      color: theme.colors.backgroundLight,
      fontSize: 24,
      fontWeight: '500',
      textAlign: 'center',
    },
    indicators: {
      width: width * 0.5,
      height: 12,
      backgroundColor: theme.colors.extraLightGray,
      borderRadius: 24,
      position: 'relative',
    },
    indicator: {
      width: '40%',
      height: '100%',
      borderRadius: 24,
      backgroundColor: theme.colors.neutralLight2,
    },
  });
