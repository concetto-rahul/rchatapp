import { db } from "../../../config/firebase";
import { collection, getDocs, query, where, addDoc  } from "firebase/firestore";
import { SETPROFILEDATA,PROFILENOTADDED,PAGELOADERFALSE,PAGELOADERTRUE,PROFILEUPDATEERROR } from "../servicesConst";

const accountProfileRef = collection(db, "account_profile");
export const setProfileData = () => async (dispatch,getState)=>{
    let { userAuthToken } = getState().login;
    let profileFound=false;
    dispatch({type:PAGELOADERTRUE});
    const querySnapshot = await getDocs(query(accountProfileRef, where("userUId", "==",userAuthToken)));
    querySnapshot.forEach((doc) => {
        if(doc.data().userUId===userAuthToken){
            const data={
                id:doc.id,
                data:doc.data()
            }
            profileFound=true;
            dispatch({type:SETPROFILEDATA,data:data});
            dispatch({type:PAGELOADERFALSE});
        }
    });
    if(!profileFound){
        dispatch({type:PROFILENOTADDED});
        dispatch({type:PAGELOADERFALSE});
    }
}

const profile_form_validation=(data)=>{
    const errors={};
    const namePattern = new RegExp(/^[A-Za-z ]+$/);
    const imageFilePattern = new RegExp(/\.(jpe?g|png)$/i);

    if(!data.profileName){
        errors['profileName']="Please enter your name.";
    }else if(!namePattern.test(data.profileName)){
        errors['profileName']="Please enter alphabetic letter.";
    }else if(data.profileName.length>20){
        errors['profileName']="Please enter maximum 20 letter only.";
    }

    if(!data.profileStatus){
        errors['profileStatus']="Please enter your status.";
    }else if(!namePattern.test(data.profileStatus)){
        errors['profileStatus']="Please enter alphabetic letter.";
    }else if(data.profileStatus.length>50){
        errors['profileStatus']="Please enter maximum 50 letter only.";
    }

    if(data.profileFile.name && !imageFilePattern.test(data.profileFile.name)){
        errors['profileFile']="Please select valid image.";
    }
    return errors;
}

export const onSubmitAddProfileData=(data)=> async (dispatch,getState)=>{
    const errors=profile_form_validation(data);
    dispatch({type:PROFILEUPDATEERROR,data:errors});
    if(!Object.keys(errors).length){
        dispatch({type:PAGELOADERTRUE});
        let { userAuthToken }=getState().login;
        await addDoc(accountProfileRef,{
            profileName:data.profileName,
            profileStatus:data.profileStatus,
            profilePhotoURL:null,
            userUId: userAuthToken,
            liveStatus:true
        }).then((res)=>{
            dispatch(setProfileData());
        }).catch((error)=>{
            dispatch({type:PAGELOADERFALSE});
        });
    }
}

export const listAllUsers = (nextPageToken=1) => async (dispatch,getState)=> {
    let userList=[];
    // console.log("listAllUsers start");
    const querySnapshot = await getDocs(accountProfileRef);
    // console.log("listAllUsers res",querySnapshot);
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        userList.push(doc.data());
    });
    // console.log("listAllUsers end");
    return userList;
};