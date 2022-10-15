import {createSlice} from '@reduxjs/toolkit';
import {SingalLoanViewAction} from '../Action/SingalLoanViewAction';

const SingalLoanViewReducer = createSlice({
  name: 'SingalLoanView',
  initialState: {
    entities: [],
    loading: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(SingalLoanViewAction.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action?.payload?.data);
    });
  },
});
export default SingalLoanViewReducer.reducer;
