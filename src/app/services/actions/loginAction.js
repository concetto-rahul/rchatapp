import { auth } from "../../../config/firebase";
import { RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import { LOGIN_SUCCESS, LOGIN_ERROR, PAGELOADERTRUE, PAGELOADERFALSE, OTP_VERIFICATION } from "../servicesConst";

export const invisibleCaptchaVerifier=()=>{
    return (dispatch)=>{
        return new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {}
        }, auth);
    }
}

export const onSubmitVerifyMobileNumber=(data)=>{
    return (dispatch)=>{
        const error=[];
        const mobileNumberPattern = new RegExp(/^[6-9]\d{9}$/);
        if(!data.phone_number){
            error.push({mobile:"Please enter mobile number."});
        }else if(!mobileNumberPattern.test(data.phone_number)){
            error.push({mobile:"Invalid mobile number format."});
        }
        if(!error.length){
            dispatch({type:PAGELOADERTRUE});
            const phone_number="+91"+data.phone_number;
            signInWithPhoneNumber(auth, phone_number, data.appVerifier)
            .then((confirmationResult) => {
                dispatch({type:LOGIN_SUCCESS,data:[true,data.phone_number,confirmationResult]});
                dispatch({type:PAGELOADERFALSE});
            }).catch((error) => {
                dispatch({type:LOGIN_ERROR,data:[{mobile:"Invalid mobile number"}]});
                dispatch({type:PAGELOADERFALSE});
            });
        }else{
            dispatch({type:LOGIN_ERROR,data:error}); 
        }
        
    }
}

export const onSubmitVerifyOTPNumber=(otpCode)=>{
    return (dispatch,getState)=>{
        const error=[];
        const otpCodePattern = new RegExp(/^[0-9]{1,6}$/);
        if(!otpCode){
            error.push({otpCode:"Please enter OTP number."});
        }else if(!otpCodePattern.test(otpCode)){
            error.push({otpCode:"Invalid OTP number format."});
        }
        if(!error.length){

            let { mobileConfirmationResult }=getState().login;
            dispatch({type:PAGELOADERTRUE});
            mobileConfirmationResult.confirm(otpCode).then((result) => {
                const user = result.user;
                localStorage.setItem('authtoken',user.uid);
                dispatch({type:OTP_VERIFICATION,data:false});
                dispatch({type:PAGELOADERFALSE});
                
            }).catch((error) => {
                dispatch({type:LOGIN_ERROR,data:[{otpCode:"Invalid OTP number"}]});
                dispatch({type:PAGELOADERFALSE});
            });
        }else{
            dispatch({type:LOGIN_ERROR,data:error}); 
        }
        
    }
}

export const onClickOtpVerifyStatusFalse=(status)=>{
    return (dispatch)=>{
        dispatch({type:OTP_VERIFICATION,data:false});
    }
}