import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { db, storage } from '../config/firebase';
import { collection, getDocs, query, where, doc, updateDoc  } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const accountProfileRef = collection(db, "account_profile");
const namePattern = new RegExp(/^[A-Za-z ]+$/);
const userAuthToken=localStorage.getItem('authtoken') || "";

const Profile=()=>{

    const history=useHistory();
    const [uploadFilePer,setUploadFilePer]=useState();
    const [profileUpdateError,setProfileUpdateError]=useState([]);
    const [accountProfileData,setAccountProfileData]=useState({profileName: '', profilePhotoURL: null, profileStatus: ''});
    const [profileID,setprofileID]=useState();

    const getProfileData = async (userAuthToken)=>{
        const querySnapshot = await getDocs(query(accountProfileRef, where("userUId", "==",userAuthToken)));
        querySnapshot.forEach((doc) => {
          if(doc.data().userUId===userAuthToken){
            setprofileID(doc.id);
            setAccountProfileData(doc.data());
          }
        });
    }

    useEffect(()=>{
        getProfileData(userAuthToken);
    },[]);

    const backToPage=()=>{
        history.goBack()
    }

    const onSaveNameSubmit= async (e)=>{
        e.preventDefault();
        const errors={};
        const data = new FormData(e.target);
        const profileName=data.get('profileName');
        const profileStatus=data.get('profileStatus');
        const profileFile=data.get('profileFile');
        const profilePhotoURL=accountProfileData.profilePhotoURL;

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
            await updateProfileData(profileID,{profileName,profileStatus,profilePhotoURL},profileFile);
        }
    } 

    const updateProfileData= async (dataid,updateData,imageFileData)=>{
        const profileUpdateDoc=doc(db, "account_profile", dataid);
        if(imageFileData.name){
            const profileImagesRef = ref(storage, `profile/${dataid}.jpg`);
            const uploadTask = uploadBytesResumable(profileImagesRef, imageFileData);
                uploadTask.on('state_changed',(snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    (progress===100)?setUploadFilePer(0):setUploadFilePer(progress);
                },(error) => {
                    console.log(error);
                },() => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        updateData.profilePhotoURL=downloadURL
                        try {
                            updateDoc(profileUpdateDoc,updateData).then(()=>getProfileData(userAuthToken));
                        } catch (e) {
                            console.error("Error adding document: ", e);
                        }
                    });
                }
            );
        }else{
            try {
                await updateDoc(profileUpdateDoc,updateData).then(()=>getProfileData(userAuthToken));
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }

    if(!userAuthToken){
        history.push("/login");
    }

    return(
        <>
        <div className="section-header">
            <h1>
                <i className="fa fa-arrow-left mr-3" onClick={backToPage}></i>
                Profile
            </h1>
        </div>
        <div className="section-body">
            <div className="row align-items-center justify-content-center">
            <div className="col-12 col-md-12 col-lg-5">
                <form method="POST" action="" onSubmit={onSaveNameSubmit}>
                <div className="card profile-widget">
                    <div className="profile-widget-header">
                        <img alt="" src={accountProfileData && accountProfileData.profilePhotoURL?accountProfileData.profilePhotoURL:"/img/avatar/avatar-1.png"} className="rounded-circle profile-widget-picture" />
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="form-group col-md-12 col-12">
                                <label htmlFor="profileFile">Profile Name</label>
                                <input id="profileFile" type="file" className={uploadFilePer?"form-control is-invalid":"form-control"} name="profileFile" tabIndex="0"/>
                                {uploadFilePer?<div className="invalid-feedback">Uploading ... ( {uploadFilePer}% )</div>:""}
                            </div>
                            <div className="form-group col-md-12 col-12">
                                <label htmlFor="profileName">Profile Name</label>
                                <input id="profileName" type="text" className={profileUpdateError && profileUpdateError.profileName?"form-control is-invalid":"form-control"} name="profileName" defaultValue={accountProfileData.profileName} tabIndex="1" autoFocus/>
                                {profileUpdateError && profileUpdateError.profileName?<div className="invalid-feedback">{profileUpdateError.profileName}</div>:""}
                            </div>
                            <div className="form-group col-md-12 col-12">
                                <label htmlFor="profileStatus">Profile Status</label>
                                <input id="profileStatus" type="text" className={profileUpdateError && profileUpdateError.profileStatus?"form-control is-invalid":"form-control"} name="profileStatus" defaultValue={accountProfileData.profileStatus} tabIndex="2" autoFocus/>
                                {profileUpdateError && profileUpdateError.profileStatus?<div className="invalid-feedback">{profileUpdateError.profileStatus}</div>:""}
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-right" tabIndex="3">
                      <button className="btn btn-primary">Save Changes</button>
                    </div>
                </div>
                </form>
              </div>
            </div>
        </div>
        </>
    )
}

export default Profile;
