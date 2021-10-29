import { connect } from "react-redux";
import AdminLayout from "../components/layout/AdminLayout";
import {setProfileData} from "../services/actions/profileAction";

const mapStateToProps=(state)=>({
    pageLoader:state.pageLoader.loader,
    setUserNameProcess:state.profile.setUserNameProcess,
    profileVerification:state.profile.profileVerification,
    profileId:state.profile.profileId,
    profileData:state.profile.profileData,
})

const mapDispatchToProps=(dispatch)=>({
    setProfileData:()=>dispatch(setProfileData()),
})
export default connect(mapStateToProps,mapDispatchToProps)(AdminLayout)