import { connect } from "react-redux";
import SetUserName from "../components/SetUserName";
import {setProfileData} from "../services/actions/profileAction";

const mapStateToProps=(state)=>({
    profileVerification:state.profile.profileVerification,
    profileId:state.profile.profileId,
    profileData:state.profile.profileData,
})

const mapDispatchToProps=(dispatch)=>({
    setProfileData:()=>dispatch(setProfileData()),
})

export default connect(mapStateToProps,mapDispatchToProps)(SetUserName)