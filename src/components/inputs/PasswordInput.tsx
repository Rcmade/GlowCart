import React, { useState } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholderTextColor="#9A8F8E"
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
          color="#9A8F8E"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;

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
    paddingLeft: 16,
    paddingRight: 44,
    fontSize: 15,
    color: '#767676',
  },
  inputIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
});
