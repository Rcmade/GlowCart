import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '../../providers/theme/ThemeProvider';
import { ThemeType } from '../../providers/theme/themes';

type InputWithIconProps = TextInputProps & {
  icon: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  containerStyle,
  inputStyle,
  ...textInputProps
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput
        placeholderTextColor={theme.colors.extraLightGray}
        style={[styles.input, inputStyle]}
        {...textInputProps}
      />

      <Feather
        name={icon}
        size={20}
        color={theme.colors.extraLightGray}
        style={styles.icon}
      />
    </View>
  );
};

export default InputWithIcon;

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
      fontSize: 16,
      flex: 1,
      paddingHorizontal: 15,
    },
    icon: {
      position: 'absolute',
      top: 18,
      right: 15,
    },
  });
