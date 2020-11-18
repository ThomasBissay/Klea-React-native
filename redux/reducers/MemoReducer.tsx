import {
  MemoState, ADD_MEMO, DEL_MEMO, MemosActionsTypes,
} from '../actions/types';

const initialState: MemoState = {
  memos: [],
};

export default function memosReducer(state = initialState,
  action: MemosActionsTypes): MemoState {
  switch (action.type) {
    case ADD_MEMO:
      return {
        memos: [...state.memos, action.payload],
      };
    case DEL_MEMO:
      return {
        memos: state.memos.filter(
          (memo) => memo.id !== action.meta.id,
        ),
      };
    default:
      return state;
  }
}
