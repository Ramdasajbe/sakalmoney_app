import {createSlice} from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'SakalMoney',
  initialState: {
    registartion: '',
  },
  reducers: {
    userRegistration: (state, action) => {
      state.registartion = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {userRegistration} = mainSlice.actions;

export default mainSlice.reducer;
