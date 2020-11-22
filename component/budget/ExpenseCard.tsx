import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import categories from '../../helpers/categories';
import ModalAddExpense from './modals/ModalAddExpense';

const expenseCardStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  titleText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  price: {
    fontSize: 30,
  },
});

interface ExpenseInterface {
  id: number,
  title: string,
  price: number,
  categorie: string,
  date: string,
}

interface PropsInterface {
  expense: ExpenseInterface,
}

const ExpenseCard = ({ expense } : PropsInterface): JSX.Element => {
  const categorieInfo = categories.filter((elem) => elem.name === expense.categorie);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  return (
    <TouchableOpacity style={expenseCardStyle.container} onPress={openModal}>
      <ModalAddExpense modalState={modalVisible} modalType="Modify" closeModal={closeModal} expense={expense} />
      <View style={{
        width: 40,
        height: 40,
        marginRight: 10,
        marginVertical: 5,
        borderRadius: 40 / 2,
        backgroundColor: (categorieInfo[0]) ? categorieInfo[0].color : 'white',
      }}
      />
      <View style={expenseCardStyle.textContainer}>
        <Text style={expenseCardStyle.titleText}>{expense.title}</Text>
        <Text>{moment(expense.date).format('HH:mm')}</Text>
      </View>
      <Text style={expenseCardStyle.price}>
        -
        {expense.price}
        {' '}
        €
      </Text>
    </TouchableOpacity>
  );
};

export default ExpenseCard;
