import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { db } from '../../config/firebase';
import { collection, getDocs, query, where, addDoc  } from "firebase/firestore";

const accountProfileRef = collection(db, "account_profile");
const namePattern = new RegExp(/^[A-Za-z ]+$/);
const userAuthToken=localStorage.getItem('authtoken') || "";


const SetUserName=()=>{
    const [profileUpdateError,setProfileUpdateError]=useState([]);
    const [accountProfileData,setAccountProfileData]=useState();
    const history = useHistory();
            
    const getProfileData = async (userAuthToken)=>{
      const querySnapshot = await getDocs(query(accountProfileRef, where("userUId", "==",userAuthToken)));
      querySnapshot.forEach((doc) => {
        if(doc.data().userUId===userAuthToken){
          setAccountProfileData(doc.data()); 
        }
      });
    }

    useEffect(()=>{
      getProfileData(userAuthToken);
    },[]);

    useEffect(()=>{
      console.log(accountProfileData)
      if(accountProfileData && accountProfileData.profileName){
        history.push("/dashboard");
      }
    },[accountProfileData]);

    const onSaveNameSubmit=(e)=>{
        e.preventDefault();
        const errors={};
        const data = new FormData(e.target);
        const profileName=data.get('profileName');
        const profileStatus=data.get('profileStatus')
        if(!profileName){
          errors['profileName']="Please enter your name.";
        }else if(!namePattern.test(profileName)){
          errors['profileName']="Please enter alphabetic letter.";
        }else if(profileName.length>20){
          errors['profileName']="Please enter 20 letter only.";
        }

        if(!profileStatus){
          errors['profileStatus']="Please enter your status."
        }
        setProfileUpdateError(errors);
        if(!Object.keys(errors).length){
          addProfileData(profileName,profileStatus);
        }
    } 

    const addProfileData= async (name,status)=>{
      console.log("addProfileData");
      try {
        await addDoc(accountProfileRef, {
          profileName: name,
          profileStatus: status,
          profilePhotoURL: null,
          userUId: userAuthToken,
          liveStatus:true
        });
        getProfileData(userAuthToken);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    
    if(!userAuthToken){
      history.push("/login");
    }
    
    return(
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

                    <form method="POST" action="" onSubmit={onSaveNameSubmit}>
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
        </>
    )
}

export default SetUserName