import React, { useState } from 'react';
import {
  Modal, Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import ModalInput from './ModalInput';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginTop: 200,
  },
  transparentBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 50,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: '#5D9783',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 10,
  },
});

interface PropsModalGlobalBudget {
  modalState: boolean,
  budget: number,
  closeModal: () => void,
  changeBudget: (newBudget: number) => void
}

const ModalGlobalBudget = ({
  modalState, budget, closeModal, changeBudget,
}: PropsModalGlobalBudget): JSX.Element => {
  const [newBudget, setBudget] = useState<string>(budget.toString());

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalState}
    >
      <View style={styles.transparentBackground}>
        <View style={styles.container}>
          <Text style={styles.modalTitle}>Changer le budget de départ</Text>
          <Text>Modifie ici le budget total que tu as décidé d&apos;allouer à ton voyage.</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ModalInput
              onChangeText={(text: string) => setBudget(text)}
              value={newBudget}
              keyboardType="numeric"
              placeholder="Budget"
            />
            <Text style={{ marginHorizontal: 15, fontSize: 20 }}>€</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 'auto', marginTop: 10 }}>
            <TouchableOpacity onPress={() => { closeModal(); }}>
              <Text style={styles.buttonTextStyle}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { changeBudget(+newBudget); }}>
              <Text style={styles.buttonTextStyle}>Modifier</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalGlobalBudget;
