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

const ModalInput = (props: any) => (
  <View style={styles.modalInput}>
    <TextInput {...props} />
  </View>
);

export default ModalInput;
