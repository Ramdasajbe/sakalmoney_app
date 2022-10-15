import {createSlice} from '@reduxjs/toolkit';
// import { loginReducer } from "./auth/Login/login.reducer";
// import { signUpReducer } from "./auth/SignUp/signUp.reducer";
// import { personalDetailsReducer } from "./auth/PersonalDetails/personalDetails.reducer";
// import { forgotPasswordReducer } from "./auth/ForgotPassword/forgotPassword.reducer";
// import { changePasswordReducer } from "./auth/ChangePassword/changePassword.reducer";
// import { varifyOTPReducer } from "./auth/VarifyOTP/varifyOTP.reducer";
// import { volunteerRegisterReducer } from "./auth/VolunteerRegister/volunteerRegister.reducer";
// import { getVolunteerByIdReducer } from "./auth/VolunteerRegister/volunteerRegister.reducer";
// import { getAllIncidentReducer } from "./auth/VolunteerRegister/volunteerRegister.reducer";
// import { addEmergencyContactReducer } from "./AddEmergencyContact/addEmergencyContact.reducer";
// import { getEmergencyContactReducer } from "./GetEmergencyContact/getEmergencyContact.reducer";
// import { getSingleDataReducer } from "./CyberCaseDetails/cyberCaseDetails.reducer";
// import { asignCaseToSelfReducer } from "./CyberCaseDetails/cyberCaseDetails.reducer";
// import { volunteerCommentReducer } from "./CyberCaseDetails/cyberCaseDetails.reducer";
// import { getVolunteerCommentReducer } from "./CyberCaseDetails/cyberCaseDetails.reducer";
// import { getAssignCasesReducer } from "./CyberCases/cyberCases.reducer";
// import { getUnAssignCasesReducer } from "./CyberCases/cyberCases.reducer";
// import { getCyberListReducer } from "./CyberCrimeRecords/cyberCrimeRecords.reducer";
// import { deleteReportIncidentReducer } from "./CyberCrimeRecords/cyberCrimeRecords.reducer";
// import { viewSingleUserReducer } from "./EditProfile/editProfile.reducer";
// import { updateUserReducer } from "./EditProfile/editProfile.reducer";
// import { getPoliceStationReducer } from "./GetPoliceStation/getPoliceStation.reducer";
// import { getAllVolunteerReducer } from "./auth/VolunteerRegister/volunteerRegister.reducer";
import {LoginReducer} from './LoginReducer.reducer';
const allReducers = createSlice({
  name: 'SakalMoney',
  initialState: {
    message: 'Initial message',
    entities: [],
    loading: 'idle',
  },
  reducers: {
    // loading(state, action) {
    //     // state.loading = 'idle';
    //   },
    //   setMessage(state, action) {
    //     state.message = action.payload;
    //   },
  },
  extraReducers: {
    LoginReducer,
    // loginReducer,
    // signUpReducer,
    // personalDetailsReducer,
    // forgotPasswordReducer,
    // changePasswordReducer,
    // varifyOTPReducer,
    // volunteerRegisterReducer,
    // getAllIncidentReducer,
    // getVolunteerByIdReducer,
    // addEmergencyContactReducer,
    // getEmergencyContactReducer,
    // getSingleDataReducer,
    // asignCaseToSelfReducer,
    // volunteerCommentReducer,
    // getVolunteerCommentReducer,
    // getAssignCasesReducer,
    // getUnAssignCasesReducer,
    // getCyberListReducer,
    // deleteReportIncidentReducer,
    // viewSingleUserReducer,
    // updateUserReducer,
    // getPoliceStationReducer,
    // getAllVolunteerReducer,
  },
});
export default allReducers.reducer;
