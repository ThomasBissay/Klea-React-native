import {ADD_EXPENSE, DEL_EXPENSE, Expense, ExpensesActionsTypes, MODIFY_EXPENSE,} from './types';

export function addExpense(newEpense: Expense): ExpensesActionsTypes {
    return {
        type: ADD_EXPENSE,
        payload: newEpense,
    };
}

export function deleteExpense(id: number): ExpensesActionsTypes {
    return {
        type: DEL_EXPENSE,
        meta: {
            id,
        },
    };
}

export function modifyExpense(id: number, newExpense: Expense): ExpensesActionsTypes {
    return {
        type: MODIFY_EXPENSE,
        payload: newExpense,
        meta: {
            id,
        },
    };
}