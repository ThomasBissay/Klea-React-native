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
  connected: boolean
}

interface UpdateProfileAction {
  type: typeof UPDATE_PROFILE
  payload: ProfileState
}

export type ProfileActionsTypes = UpdateProfileAction;

// Mémo //
export const ADD_MEMO = 'ADD_MEMO';
export const DEL_MEMO = 'DEL_MEMO';
export const CLEAR_MEMO = 'CLEAR_MEMO';

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

interface ClearMemoAction {
  type: typeof CLEAR_MEMO
}

export type MemosActionsTypes = AddMemoAction | DelMemoAction | ClearMemoAction;

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DEL_EXPENSE = 'DEL_EXPENSE';
export const MODIFY_EXPENSE = 'MODIFY_EXPENSE';
export const CLEAR_EXPENSE = 'CLEAR_EXPENSE';

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

interface ClearExpenseAction {
  type: typeof CLEAR_EXPENSE
}

interface ModifyExpenseAction {
  type: typeof MODIFY_EXPENSE
  payload: Expense
  meta: {
    id: number
  }
}

export type ExpensesActionsTypes = AddExpenseAction
| DelExpenseAction
| ModifyExpenseAction
| ClearExpenseAction;
