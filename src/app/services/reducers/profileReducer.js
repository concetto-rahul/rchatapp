import { SETPROFILEDATA,PROFILENOTADDED,PROFILEUPDATEERROR } from "../servicesConst";
const initialState={
    profileVerification:false,
    setUserNameProcess:"Checking",
    profileId:"",
    profileData:"",
    profileUpdateError:{}
}

export default function profileFuntion(state=initialState,action){
    // console.log(state,action);
    switch (action.type) {
        case SETPROFILEDATA:
            return {
                ...state,
                profileVerification:true,
                profileId:action.data.id,
                profileData:action.data.data,
                setUserNameProcess:"ProfileAdded",
                profileUpdateError:[]
            };
        case PROFILENOTADDED:
            return {
                ...state,
                profileVerification:false,
                profileId:"",
                profileData:"",
                setUserNameProcess:"ProfileNotAdded",
                profileUpdateError:[]
            };
        case PROFILEUPDATEERROR:
            return {
                ...state,
                profileUpdateError:action.data
            };
        default:
            return state;
    }
}