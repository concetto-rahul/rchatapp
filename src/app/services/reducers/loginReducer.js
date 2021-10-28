import { LOGIN_ERROR, LOGIN_SUCCESS , OTP_VERIFICATION } from "../servicesConst";
const initialState={
    userAuthToken:localStorage.getItem('authtoken') || "",
    loginError:[],
    otpVerification:false,
    mobile_number:"",
    mobileConfirmationResult:"",
}

export default function loginFuntion(state=initialState,action){
    switch (action.type) {
        case LOGIN_ERROR:
            return {
                ...state,
                loginError:action.data
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginError:[],
                otpVerification:action.data[0],
                mobile_number:action.data[1],
                mobileConfirmationResult:action.data[2],
            };
        case OTP_VERIFICATION:
            return {
                ...state,
                otpVerification:action.data,
                mobile_number:"",
                mobileConfirmationResult:"",
            };
        default:
            return state;
    }
}