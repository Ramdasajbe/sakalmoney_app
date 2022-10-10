import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';

import MainStack from './src/Navigation/MainStack';
import store from './src/Redux/Store';
import {Provider} from 'react-redux';
// import {persistor} from './src/Redux/Store';
import {persistStore} from 'redux-persist';
let persistor = persistStore(store);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStack />
      </PersistGate>
    </Provider>
  );
};

export default App;
