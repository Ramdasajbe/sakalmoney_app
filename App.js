import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import MainStack from './src/Navigation/MainStack';
import {Provider} from 'react-redux';
// import {persistor} from './src/Redux/Store';
import {store} from './src/Redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
};

export default App;
