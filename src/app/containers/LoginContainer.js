import { connect } from "react-redux";
import Login from "../components/Login";
import {invisibleCaptchaVerifier,onSubmitVerifyMobileNumber,onSubmitVerifyOTPNumber,onClickOtpVerifyStatusFalse} from "../services/actions/loginAction";

const mapStateToProps=state=>({
    userAuthToken:state.login.userAuthToken,
    loginError:state.login.loginError,
    otpVerification:state.login.otpVerification,
    mobile_number:state.login.mobile_number,
    pageLoader:state.pageLoader.loader
})

const mapDispatchToProps=(dispatch)=>({
    invisibleCaptchaVerifier:()=>dispatch(invisibleCaptchaVerifier()),
    onSubmitVerifyMobileNumber:(data)=>dispatch(onSubmitVerifyMobileNumber(data)),
    onSubmitVerifyOTPNumber:(data)=>dispatch(onSubmitVerifyOTPNumber(data)),
    onClickOtpVerifyStatusFalse:(data)=>dispatch(onClickOtpVerifyStatusFalse(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)