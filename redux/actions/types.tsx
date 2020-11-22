export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const DECREMENT_COUNT = 'DECREMENT_COUNT';

// Profile //
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export interface ProfileState {
  firstName: string
  lastName: string
  email: string
  gender: string
  address: string
  phoneNumber: string
  bio: string
  imageProfil: string
}

interface UpdateProfileAction {
  type: typeof UPDATE_PROFILE
  payload: ProfileState
}

export type ProfileActionsTypes = UpdateProfileAction;

// Mémo //
export const ADD_MEMO = 'ADD_MEMO';
export const DEL_MEMO = 'DEL_MEMO';

export interface Memo {
  id: string
  title: string
  text: string
  tag: string
  tagColor: string
}

export interface MemoState {
  memos: Memo[]
}

interface AddMemoAction {
  type: typeof ADD_MEMO
  payload: Memo
}

interface DelMemoAction {
  type: typeof DEL_MEMO
  meta: {
    id: string
  }
}

export type MemosActionsTypes = AddMemoAction | DelMemoAction;

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DEL_EXPENSE = 'DEL_EXPENSE';
export const MODIFY_EXPENSE = 'MODIFY_EXPENSE';

export interface Expense {
  id: number,
  title: string,
  price: number,
  categorie: string,
  date: string,
}

export interface ExpenseState {
  expenses: Expense[]
}

interface AddExpenseAction {
  type: typeof ADD_EXPENSE
  payload: Expense
}

interface DelExpenseAction {
  type: typeof DEL_EXPENSE
  meta: {
    id: number
  }
}

interface ModifyExpenseAction {
  type: typeof MODIFY_EXPENSE
  payload: Expense
  meta: {
    id: number
  }
}

export type ExpensesActionsTypes = AddExpenseAction | DelExpenseAction | ModifyExpenseAction;