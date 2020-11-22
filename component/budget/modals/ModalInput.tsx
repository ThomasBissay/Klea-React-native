import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  modalInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#5D9783',
    marginVertical: 10,
  },
});

interface PropsModalInput {
  onChangeText: (text: string) => void,
  value: string,
  keyboardType: 'numeric' | 'default',
  placeholder: string
}

const ModalInput = ({
  onChangeText, value, keyboardType, placeholder,
}: PropsModalInput): JSX.Element => (
  <View style={styles.modalInput}>
    <TextInput
      onChangeText={onChangeText}
      value={value}
      keyboardType={keyboardType}
      placeholder={placeholder}
    />
  </View>
);

export default ModalInput;
