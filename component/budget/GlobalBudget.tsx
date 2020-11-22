import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import ModalGlobalBudget from './ModalGlobalBudget';

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#9A9A9A'
  },
  budgetLeft: {
    fontSize: 30,
    color: '#5D9783',
    marginVertical: 10,
  },
  totalBudgetContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#5D9783',
    marginLeft: 10,
  },
});

const GlobalBudget = (props: any) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { budget, budgetLeft } = props;

  const closeModal = () => {
    setModalVisible(false);
  };

  const changeBudget = (newBudget: number) => {
    props.changeBudget(newBudget);
    closeModal();
  };

  return (
    <View style={styles.container}>
      <ModalGlobalBudget
        modalState={modalVisible}
        closeModal={closeModal}
        changeBudget={changeBudget}
        budget={budget}
      />
      <Text style={styles.textTitle}>Budget Restant</Text>
      <Text style={styles.budgetLeft}>
        {budgetLeft()}
        {' '}
        €
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text>
          Le budget de départ est de :
        </Text>
        <TouchableOpacity style={styles.totalBudgetContainer} onPress={() => setModalVisible(true)}>
          <Text>{budget}</Text>
        </TouchableOpacity>
        <Text> €</Text>
      </View>
    </View>
  );
};

export default GlobalBudget;
