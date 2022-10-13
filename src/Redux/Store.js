import {configureStore} from '@reduxjs/toolkit';
import allreducer from '../Redux/Reducer/index';
import {setupListeners} from '@reduxjs/toolkit/query';
export const store = configureStore({
  reducer: {
    SakalMoney: allreducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);
