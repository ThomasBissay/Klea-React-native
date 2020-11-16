import {createStore, combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import counter from './reducers/counterReducer';
import profileReducer from "./reducers/ProfileReducer";

const persistConfig = {
    key: "root",
    storage: storage
};

const rootReducer = combineReducers({
    counter,
    profile: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor =  persistStore(store);

// Pour permettre d'utiliser useSelector & useDispatch //
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;