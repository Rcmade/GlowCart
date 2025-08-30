import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

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
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput
        placeholderTextColor="#9A8F8E"
        style={[styles.input, inputStyle]}
        {...textInputProps}
      />

      <Feather name={icon} size={20} color="#9A8F8E" style={styles.icon} />
    </View>
  );
};

export default InputWithIcon;

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#989696',
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
