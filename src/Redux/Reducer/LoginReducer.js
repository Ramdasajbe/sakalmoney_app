import {LoginAction} from '../Action/LoginAction';
export const LoginReducer = {
  [LoginAction.pending.type]: (state, action) => {
    state.userLogin = {
      status: 'loading',
      data: {},
      error: {},
    };
  },
  [LoginAction.fulfilled.type]: (state, action) => {
    state.userLogin = {
      status: 'idle',
      data: action.payload,
      error: {},
    };
  },
  [LoginAction.rejected.type]: (state, action) => {
    state.userLogin = {
      status: 'idle',
      data: {},
      error: action.payload,
    };
  },
};
