import {configureStore} from '@reduxjs/toolkit';
import allreducer from '../Redux/Reducer/index';
import {setupListeners} from '@reduxjs/toolkit/query';
import LoginReducer from './Reducer/LoginReducer.reducer.js';
import SingalLoanViewReducer from './Reducer/SingalLoanView.reducer';
export const store = configureStore({
  reducer: {
    login: LoginReducer,
    SingalLoanView: SingalLoanViewReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);
