// import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import mainSlice from './Slice/Main';

import AsyncStorage from '@react-native-async-storage/async-storage';
const reducers = combineReducers({
  counter: mainSlice,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,

  middleware: [],
});

export default store;
