import React from 'react';
import AppNavigator from "./views/AppNavigator";
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

export default function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
              <AppNavigator/>
        </PersistGate>
      </Provider>
  );
}
