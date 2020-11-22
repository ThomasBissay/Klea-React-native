import {ADD_EXPENSE, DEL_EXPENSE, ExpensesActionsTypes, ExpenseState,} from '../actions/types';
import moment from "moment";
import update from 'immutability-helper';

const initialState: ExpenseState = {
    expenses: [],
};

export default function expensesReducer(state = initialState,
                                     action: ExpensesActionsTypes): ExpenseState {
    switch (action.type) {
        case ADD_EXPENSE:
            action.payload.id = (state.expenses.length > 0) ? state.expenses[state.expenses.length - 1].id + 1 : 0;
            const updatedExpenses = [...state.expenses, action.payload];

            updatedExpenses.sort((a, b) => {
                return moment(b.date).diff(a.date);
            });
            return {
                expenses: updatedExpenses,
            };
        case "MODIFY_EXPENSE":
            let pos: number = -1;

            state.expenses.forEach((expense, idx) => {
                if (expense.id === action.meta.id) {
                    pos =  idx;
                }
            })
            if (pos === -1) {
                return state;
            }
            return update(state, {
                expenses: {
                    [pos]: {$set: action.payload}
                }
            })
        case DEL_EXPENSE:
            return {
                expenses: state.expenses.filter(
                    (expense) => expense.id !== action.meta.id,
                ),
            };
        default:
            return state;
    }
}