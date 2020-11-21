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

export interface Memo {
  id: number
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
    id: number
  }
}

export type MemosActionsTypes = AddMemoAction | DelMemoAction;
