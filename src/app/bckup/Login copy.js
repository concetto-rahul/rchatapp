import React, { useState } from "react";
import { Redirect } from "react-router";


function Login() {
    const userAuthToken=localStorage.getItem('authtoken') || "";

    const [mobile_number,setMobileNumber]=useState("");
    const [mobileNumberError,setMobileNumberError]=useState("");
    const [otpCode,setOTPCode]=useState("");
    const [otpVerification,setOTPVerification]=useState(false);
    const [otpCodeError,setOtpCodeError]=useState("");

    const recaptchaVerifier1222=()=>{
      if(!window.recaptchaVerifier){
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
              onSignInSubmit();
            }
        }, firebaseAuth);
      }
    }

    const clearError=()=>{
      setMobileNumberError("");
      setOtpCodeError("");
    }

    const changeMobileNumber=()=>{
      console.log('changeMobileNumber')
      setOTPVerification(false);
    }

    const onSignInSubmit=(e)=>{
        e.preventDefault();
        
        recaptchaVerifier1222();
        clearError();

        const appVerifier = window.recaptchaVerifier;
        const phone_number="+91"+mobile_number;
        signInWithPhoneNumber(firebaseAuth, phone_number, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setOTPVerification(true);
          console.log('confirmationResult',confirmationResult);
        }).catch((error) => {
          setMobileNumberError("Invalid mobile number.");
          console.log('error',error.message);
        });
    }

    const onSubmitOtpVerification=(e)=>{
      e.preventDefault();
      console.log(otpCode)
      window.confirmationResult.confirm(otpCode).then((result) => {
          const user = result.user;
          localStorage.setItem('authtoken',user.uid);
          console.log("user datat",user,user.uid);
      }).catch((error) => {
        setOtpCodeError('Invalid code.');
        console.log('otp error',error.message);
      });
    }

    if(userAuthToken) return <Redirect to="/setusername"/>;

    return (
      <>
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
                        <input id="mobile" type="text" minLength="10" maxLength="10" className={mobileNumberError?"form-control is-invalid":"form-control"} name="mobile" tabIndex="1" value={mobile_number} required autoFocus onChange={(e)=>setMobileNumber(e.target.value)}/>
                        {mobileNumberError?<div className="invalid-feedback">{mobileNumberError}</div>:""}
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
                        <input id="otp_code" type="text" minLength="6" maxLength="6" className={otpCodeError?"form-control is-invalid":"form-control"} name="otp_code" value={otpCode} tabIndex="3" required autoFocus onChange={(e)=>setOTPCode(e.target.value)}/>
                        {otpCodeError?<div className="invalid-feedback">{otpCodeError}</div>:""}
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
  