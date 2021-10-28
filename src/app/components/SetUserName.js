import React, { useEffect, useLayoutEffect } from "react";
import { useHistory } from "react-router";
import PageLoader from "./PageLoader";

const SetUserName=(props)=>{
    const {pageLoader,setUserNameProcess,profileVerification,profileUpdateError,setProfileData,onSubmitAddProfileData}=props;
    const history=useHistory();

    useLayoutEffect(()=>{
      setProfileData();
    },[]);

    useEffect(()=>{
      if(profileVerification){
        history.push('/dashboard');
      }
    },[profileVerification]);

    const onSaveNameSubmit= async (e)=>{
      e.preventDefault();
      const data = new FormData(e.target);
      const profileName=data.get('profileName');
      const profileStatus=data.get('profileStatus');
      const profileFile=data.get('profileFile');
      await onSubmitAddProfileData({profileName,profileStatus,profileFile});
    }

    return(
        <>
         { pageLoader?<PageLoader />:"" }
        {
          setUserNameProcess=="ProfileNotAdded"?
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

                        <form method="POST" action="" onSubmit={onSaveNameSubmit}>
                          <div className="form-group">
                            <label htmlFor="profileFile">Profile Photo</label>
                            <input id="profileFile" type="file" className="form-control" name="profileFile" tabIndex="0"/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="profileName">Profile Name</label>
                            <input id="profileName" type="text" className={profileUpdateError && profileUpdateError.profileName?"form-control is-invalid":"form-control"} name="profileName" tabIndex="1" autoFocus/>
                            {profileUpdateError && profileUpdateError.profileName?<div className="invalid-feedback">{profileUpdateError.profileName}</div>:""}
                          </div>
                          <div className="form-group">
                            <label htmlFor="profileStatus">Profile Status</label>
                            <input id="profileStatus" type="text" className={profileUpdateError && profileUpdateError.profileStatus?"form-control is-invalid":"form-control"} name="profileStatus" tabIndex="2" autoFocus/>
                            {profileUpdateError && profileUpdateError.profileStatus?<div className="invalid-feedback">{profileUpdateError.profileStatus}</div>:""}
                          </div>
                          <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex="3">
                              Submit
                            </button>
                          </div>
                        </form>
                    </div>
                  </div>
                  <div className="simple-footer">
                    Copyright &copy; <a href="https://www.concettolabs.com/" rel="noreferrer" target="_blank">Concetto Labs</a> 2021
                  </div>
              </div>
            </div>
          </div>
        </section>
        </div>
          :""
        }
        
        </>
    )
}

export default SetUserName