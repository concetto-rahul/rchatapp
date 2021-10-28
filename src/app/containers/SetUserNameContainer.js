import { connect } from "react-redux";
import SetUserName from "../components/SetUserName";
import {setProfileData,onSubmitAddProfileData} from "../services/actions/profileAction";

const mapStateToProps=(state)=>({
    pageLoader:state.pageLoader.loader,
    profileVerification:state.profile.profileVerification,
    setUserNameProcess:state.profile.setUserNameProcess,
    profileUpdateError:state.profile.profileUpdateError
})

const mapDispatchToProps=(dispatch)=>({
    setProfileData:()=>dispatch(setProfileData()),
    onSubmitAddProfileData:(data)=>dispatch(onSubmitAddProfileData(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(SetUserName)