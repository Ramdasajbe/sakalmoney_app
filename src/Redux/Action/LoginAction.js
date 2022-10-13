import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const LoginAction = createAsyncThunk('loginActionLoding', content =>
  axios
    .post('http://43.204.38.56:4004/v1/user/login', content, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
    .then(response => response.data)
    .catch(error => error),
);

// export const getAllIncidentAction = createAsyncThunk(
//     "loginActionLoding",
//     async () =>
//     await axios
//     .get('https://server.sps.foxberry.link/v1/incident/get/all', {
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//         },
//       })
//     .then((response) => response)
//     .catch((error) => error)
// );

// export const getVolunteerByIdAction = createAsyncThunk(
//     "loginActionLoding",
//     (content) =>
//     axios
//     .post('https://server.sps.foxberry.link/v1/volunteer/getvolunteersbyid',(content), {
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//         },
//       })
//     .then((response) => response)
//     .catch((error) => error)
// );

// export const getAllVolunteerAction = createAsyncThunk(
//   "loginActionLoding",
//   () =>
//   axios
//   .get('https://server.sps.foxberry.link/v1/volunteer/getVolunteers', {
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//     })
//   .then((response) => response)
//   .catch((error) => error)
// );
