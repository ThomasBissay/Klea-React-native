import React, { useState } from 'react';
import {
  Text, View, StyleSheet, ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import HeaderKlea from '../component/HeaderKlea';
import ExpenseCard from '../component/budget/ExpenseCard';
import ModalAddExpense from '../component/budget/ModalAddExpense';
import CategoriesCard from '../component/budget/CategoriesCard';
import GlobalBudget from '../component/budget/GlobalBudget';
import { RootState } from '../redux/store';
import { Expense } from '../redux/actions/types';

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
    marginHorizontal: 10,
  },
});

type AppNavigatorParamList = {
  Memos: undefined,
  Profil: undefined,
  Budget: undefined,
  Traduction: undefined
};

type ProfileScreenNavigationProp = DrawerNavigationProp<
AppNavigatorParamList,
'Budget'
>;

type PropsBudget = {
  navigation: ProfileScreenNavigationProp;
};

export default function BudgetScreen({ navigation }: PropsBudget): JSX.Element {
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

    expenses.forEach((expense: Expense) => {
      totalExpense += +(expense.price);
    });

    return (budget - totalExpense);
  }

  function dayTitle(expense: Expense, idx: number) {
    if (idx === 0 || moment(expenses[idx - 1].date).format('L') !== moment(expense.date).format('L')) {
      switch (moment(expense.date).format('L')) {
        case moment().format('L'):
          return <Text style={styles.dayTitle}>Aujourd&apos;hui</Text>;
        case moment().subtract(1, 'days').format('L'):
          return <Text style={styles.dayTitle}>Hier</Text>;
        default:
          return (
            <Text style={styles.dayTitle}>
              Le
              {' '}
              {moment(expense.date).locale('fr').format('DD MMMM YYYY')}
            </Text>
          );
      }
    }
    return <View />;
  }

  return (
    <View style={styles.mainContainer}>
      <HeaderKlea
        title="Mon Budget"
        handleMenu={() => navigation.openDrawer()}
        leftIconName="menu"
        rightIconName="add"
        handleRightClick={() => openModal()}
      />
      <ModalAddExpense
        modalState={modalVisible}
        modalType="Add"
        closeModal={closeModal}
        expense={{
          id: -1, title: '', price: 0, categorie: '', date: '',
        }}
      />
      <GlobalBudget
        budget={budget}
        changeBudget={(newBudget: number) => setNewBudget(newBudget)}
        budgetLeft={calcBudgetLeft}
      />
      <ScrollView>
        <CategoriesCard />
        {
          expenses.map((expense: Expense, idx: number) => (
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
