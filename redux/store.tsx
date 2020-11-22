import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import profileReducer from './reducers/ProfileReducer';
import memosReducer from './reducers/MemoReducer';
import expensesReducer from './reducers/expenseReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  profile: profileReducer,
  memos: memosReducer,
  expenses: expensesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

// Pour permettre d'utiliser useSelector & useDispatch //
export type RootState = ReturnType<typeof persistedReducer>;
export default rootReducer;
