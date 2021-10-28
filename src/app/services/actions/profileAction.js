import { db } from "../../../config/firebase";
import { collection, getDocs, query, where, addDoc  } from "firebase/firestore";
import { PROFILEVERIFICATION } from "../servicesConst";

const accountProfileRef = collection(db, "account_profile");

export const setProfileData = ()=>{
    return (dispatch,getState)=>{
        let { userAuthToken } = getState().login;
        const querySnapshot = getDocs(query(accountProfileRef, where("userUId", "==",userAuthToken)));
        querySnapshot.forEach((doc) => {
            if(doc.data().userUId===userAuthToken){
                const data={
                    id:doc.id,
                    data:doc.data()
                }
                dispatch({type:PROFILEVERIFICATION,data})
            }
        });
    }
}