import {createSlice} from '@reduxjs/toolkit';
import {LoginAction} from '../Action/LoginAction';

const LoginReducer = createSlice({
  name: 'login',
  initialState: {
    entities: [],
    loading: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(LoginAction.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action?.payload?.data);
    });
  },
});
export default LoginReducer.reducer;

// import {createSlice} from '@reduxjs/toolkit';
// // import { loginAction } from "../../../actions/auth/Login/login.action";
// import {LoginAction} from '../Action/LoginAction';
// const LoginReducer = createSlice({
//   name: 'login',
//   initialState: {
//     entities: [],
//     loading: 'idle',
//   },
//   reducers: {
//     // [LoginAction.pending]: (state, action) => {
//     //   console.log("Action Payload===>", action?.payload?.data)
//     //   state.entities.push(action?.payload?.data)
//     // },
//     [LoginAction.fulfilled]: (state, action) => {
//       console.log('Action Payload===>', action?.payload?.data);
//       state.entities.push(action?.payload?.data);
//     },
//   },
//   /*  extraReducers: builder => {
//     // Add reducers for additional action types here, and handle loading state as needed
//     builder.addCase(loginAction.fulfilled, (state, action) => {
//       // Add user to the state array
//       state.entities.push(action.payload)
//     })
//   }, */
// });
// export default LoginReducer.reducer;
