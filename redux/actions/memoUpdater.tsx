import {
  Memo, ADD_MEMO, DEL_MEMO, CLEAR_MEMO, MemosActionsTypes,
} from './types';

export function addMemo(newMemo: Memo): MemosActionsTypes {
  return {
    type: ADD_MEMO,
    payload: newMemo,
  };
}

export function deleteMemo(id: string): MemosActionsTypes {
  return {
    type: DEL_MEMO,
    meta: {
      id,
    },
  };
}

export function clearMemo(): MemosActionsTypes {
  return {
    type: CLEAR_MEMO,
  };
}
