import { useEffect } from "react";
import { useHistory } from "react-router";
import PageLoader from "./PageLoader";

const Login=(props)=>{  
  const {userAuthToken,loginError,pageLoader,otpVerification,mobile_number,invisibleCaptchaVerifier,onSubmitVerifyMobileNumber,onSubmitVerifyOTPNumber,onClickOtpVerifyStatusFalse}=props;
  const history=useHistory();

  useEffect(()=>{
    if(userAuthToken){
      history.push("/setusername");
    }
  },[userAuthToken]);

  const onSignInSubmit= async (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const appVerifier = invisibleCaptchaVerifier();
    const phone_number=data.get('mobile');
    await onSubmitVerifyMobileNumber({phone_number,appVerifier});
  }

  const onSubmitOtpVerification=(e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    onSubmitVerifyOTPNumber(data.get('otp_code'))
  }

  const changeMobileNumber=()=>{
    onClickOtpVerifyStatusFalse();
  }

  return (
    <>
    { pageLoader?<PageLoader />:"" }
    <div id="app">
      <section className="section">
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">            
              <div className="login-brand">
                <img src="/img/stisla-fill.svg" alt="logo" width="100" className="shadow-light rounded-circle" />
              </div>
  
              <div className="card card-primary">
                <div className="card-body">
                  {
                    !otpVerification?
                    <form method="POST" action="" onSubmit={onSignInSubmit}>
                      <div id="sign-in-button" style={{display:'none'}}></div>
                      <div className="form-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input id="mobile" type="text" minLength="10" maxLength="10" className={loginError.length && loginError[0].mobile?"form-control is-invalid":"form-control"} name="mobile" defaultValue={mobile_number} tabIndex="1" required autoFocus/>
                        {loginError.length && loginError[0].mobile?<div className="invalid-feedback">{loginError[0].mobile}</div>:""}
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex="2">
                          Submit
                        </button>
                      </div>
                    </form>
                    :
                    <form method="POST" action="" onSubmit={onSubmitOtpVerification}>
                      <div className="form-group">
                        <label className="w-100" htmlFor="mobile">Mobile Number: { mobile_number } <i className="fa fa-pencil-alt float-right" title="Change mobile number" onClick={changeMobileNumber}></i></label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="otp_code">Enter OTP Number</label>
                        <input id="otp_code" type="text" minLength="6" maxLength="6" className={loginError.length && loginError[0].otpCode?"form-control is-invalid":"form-control"} name="otp_code" defaultValue={"000000"} tabIndex="3" required autoFocus/>
                        {loginError.length && loginError[0].otpCode?<div className="invalid-feedback">{loginError[0].otpCode}</div>:""}
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex="4">
                          Submit
                        </button>
                      </div>
                    </form>
                  }
                </div>
              </div>
              <div className="simple-footer">
                Copyright &copy; <a href="https://www.concettolabs.com/"  rel="noreferrer" target="_blank">Concetto Labs</a> 2021
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
    );
  }
  
  export default Login;
  