import { db } from "../../../config/firebase";
import { collection, getDocs, query, where, addDoc  } from "firebase/firestore";
import { SETPROFILEDATA,PROFILENOTADDED,PAGELOADERFALSE,PAGELOADERTRUE,PROFILEUPDATEERROR } from "../servicesConst";

const accountProfileRef = collection(db, "account_profile");
const namePattern = new RegExp(/^[A-Za-z ]+$/);

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
            dispatch({type:SETPROFILEDATA,data:data});
            profileFound=true;
            dispatch({type:PAGELOADERFALSE});
        }
    });
    if(!profileFound){
        dispatch({type:PROFILENOTADDED});
        dispatch({type:PAGELOADERFALSE});
    }
}

export const onSubmitAddProfileData=(data)=>(dispatch)=>{
    console.log(data);
    const errors={};
    if(!data.profileName){
        errors['profileName']="Please enter your name.";
    }else if(!namePattern.test(data.profileName)){
        errors['profileName']="Please enter alphabetic letter.";
    }else if(data.profileName.length>20){
        errors['profileName']="Please enter 20 letter only.";
    }

    if(!data.profileStatus){
        errors['profileStatus']="Please enter your status.";
    }else if(!namePattern.test(data.profileStatus)){
        errors['profileStatus']="Please enter alphabetic letter.";
    }else if(data.profileStatus.length>50){
        errors['profileStatus']="Please enter 50 letter only.";
    }

    if(!Object.keys(errors).length){
        console.log("onSubmitAddProfileData",errors)
        // addProfileData(profileName,profileStatus);
    }else{
        dispatch({type:PROFILEUPDATEERROR,data:errors}); 
    }
}