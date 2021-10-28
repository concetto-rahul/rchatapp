import { PROFILEVERIFICATION, SETPROFILEDATA } from "../servicesConst";
const initialState={
    profileVerification:false,
    profileId:"",
    profileData:""
}

export default function profileFuntion(state=initialState,action){
    console.log(action);
    switch (action.type) {
        case PROFILEVERIFICATION:
            return {
                ...state,
                profileVerification:true,
                profileId:action.data.id,
                profileData:action.data.data
            };
        case SETPROFILEDATA:
            return {
                ...state,
                profileVerification:true,
                profileId:action.data.id,
                profileData:action.data.data
            };
        default:
            return state;
    }
}