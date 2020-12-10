import moment from 'moment';
import update from 'immutability-helper';
import {
  ADD_EXPENSE, DEL_EXPENSE, Expense, ExpensesActionsTypes, ExpenseState,
} from '../actions/types';

const initialState: ExpenseState = {
  expenses: [],
};

function getMaxId(expenses: Expense[]): number {
  let maxId = 0;

  if (expenses.length === 0) { return 0; }
  expenses.forEach((expense) => {
    if (expense.id > maxId) {
      maxId = expense.id;
    }
  });
  return maxId + 1;
}

function getPosWhereInsert(expenses: Expense[], expenseToInsert: Expense): number {
  let pos = 0;

  if (expenses.length === 0) {
    return 0;
  }
  for (let i = 0; i <= expenses.length; i += 1) {
    if ((i === 0 || moment(expenseToInsert.date).isBefore(expenses[i - 1].date))
        && ((i === expenses.length) || moment(expenseToInsert.date).isAfter(expenses[i].date))) {
      pos = i;
    }
  }
  return pos;
}

export default function expensesReducer(state = initialState,
  action: ExpensesActionsTypes): ExpenseState {
  switch (action.type) {
    case ADD_EXPENSE: {
      const posWhereInsert = getPosWhereInsert(state.expenses, action.payload);
      const newExpense = {
        ...action.payload,
        id: getMaxId(state.expenses),
      };

      return {
        expenses: [
          ...state.expenses.slice(0, posWhereInsert),
          newExpense,
          ...state.expenses.slice(posWhereInsert),
        ],
      };
    }
    case 'MODIFY_EXPENSE': {
      let pos = -1;

      state.expenses.forEach((expense, idx) => {
        if (expense.id === action.meta.id) {
          pos = idx;
        }
      });
      if (pos === -1) {
        return state;
      }
      return update(state, {
        expenses: {
          [pos]: { $set: action.payload },
        },
      });
    }
    case DEL_EXPENSE:
      return {
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.meta.id,
        ),
      };
    case 'CLEAR_EXPENSE':
      return {
        expenses: [],
      };
    default:
      return state;
  }
}
