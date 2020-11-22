import React, { useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import HeaderKlea from '../component/HeaderKlea';
import ExpenseCard from '../component/budget/ExpenseCard';
import ModalAddExpense from '../component/budget/ModalAddExpense';
import CategoriesCard from '../component/budget/CategoriesCard';
import GlobalBudget from '../component/budget/GlobalBudget';
import {RootState} from "../redux/store";
import {Expense} from "../redux/actions/types";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  dayTitle: {
    color: '#9A9A9A',
    fontWeight: '100',
    fontSize: 14,
    marginHorizontal: 10
  }
});

export default function BudgetScreen(props: any) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [budget, setBudget] = useState<number>(1000);
  const { expenses } = useSelector((state: RootState) => state.expenses);

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function setNewBudget(newBudget: number) {
    setBudget(newBudget);
  }

  function calcBudgetLeft(): number {
    let totalExpense = 0;

    expenses.forEach((expense) => {
      totalExpense += +(expense.price);
    });
    console.log(totalExpense);
    const budgetLeft = budget - totalExpense;
    console.log(budgetLeft);
    return (budget - totalExpense);
  }

  function dayTitle(expense: Expense, idx: number) {
    console.log(expense.date);
    console.log(moment(expense.date).days())
    if (idx === 0 || moment(expenses[idx - 1].date).format('L') !== moment(expense.date).format('L')) {
      switch (moment(expense.date).format('L')) {
        case moment().format('L'):
          return <Text style={styles.dayTitle}>Aujourd'hui</Text>;
        case moment().subtract(1, 'days').format('L'):
          return <Text style={styles.dayTitle}>Hier</Text>;
        default:
          return <Text style={styles.dayTitle}>Le {moment(expense.date).locale('fr').format("DD MMMM YYYY")}</Text>
      }
    }
    return <View/>
  }

  return (
    <View style={styles.mainContainer}>
      <HeaderKlea
        title="Mon Budget"
        handleMenu={() => props.navigation.openDrawer()}
        leftIconName="menu"
        rightIconName="add"
        handleRightClick={() => openModal()}
      />
      <ModalAddExpense modalState={modalVisible} modalType="Add" closeModal={closeModal} />
      <GlobalBudget budget={budget} changeBudget={setNewBudget} budgetLeft={calcBudgetLeft} />
      <CategoriesCard />
      <ScrollView>
      {
        expenses.map((expense, idx) => (
            <View key={expense.id}>
              {dayTitle(expense, idx)}
              <ExpenseCard expense={expense} />
            </View>
        ))
      }
      </ScrollView>
    </View>
  );

}