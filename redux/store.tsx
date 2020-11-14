import {createStore, combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import counter from './reducers/counterReducer';

const persistConfig = {
    key: "root",
    storage: storage
};

const rootReducer = combineReducers({
    counter,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor =  persistStore(store);