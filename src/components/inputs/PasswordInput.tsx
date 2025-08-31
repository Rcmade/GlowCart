import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '../../providers/theme/ThemeProvider';
import { ThemeType } from '../../providers/theme/themes';

type PasswordInputProps = Omit<TextInputProps, 'secureTextEntry'> & {
  value: string;
  onChangeText: (text: string) => void;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Password',
  ...rest
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholderTextColor={theme.colors.extraLightGray}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        {...rest}
      />
      <TouchableOpacity
        onPress={() => setShowPassword(prev => !prev)}
        style={styles.inputIcon}
      >
        <Feather
          name={showPassword ? 'eye-off' : 'eye'}
          size={20}
          color={theme.colors.extraLightGray}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    inputContainer: {
      position: 'relative',
      backgroundColor: theme.colors.backgroundLight,
      borderWidth: 1,
      borderColor: theme.colors.extraLightGray,
      borderRadius: 14,
      marginBottom: 14,
      height: 58,
      justifyContent: 'center',
    },
    input: {
      paddingLeft: 16,
      paddingRight: 44,
      fontSize: 15,
      color: theme.colors.mediumGray2,
    },
    inputIcon: {
      position: 'absolute',
      right: 15,
      top: 15,
    },
  });
