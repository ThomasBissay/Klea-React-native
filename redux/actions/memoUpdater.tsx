import {
  Memo, ADD_MEMO, DEL_MEMO, MemosActionsTypes,
} from './types';

export function addMemo(newMemo: Memo): MemosActionsTypes {
  return {
    type: ADD_MEMO,
    payload: newMemo,
  };
}

export function deleteMemo(id: number): MemosActionsTypes {
  return {
    type: DEL_MEMO,
    meta: {
      id,
    },
  };
}
