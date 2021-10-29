import { connect } from "react-redux";
import Dashboard from "../components/Dashboard";
import {listAllUsers} from "../services/actions/profileAction";


const mapStateToProps=(state)=>({
    pageLoader:state.pageLoader.loader,
    profileVerification:state.profile.profileVerification,
    setUserNameProcess:state.profile.setUserNameProcess,
    profileUpdateError:state.profile.profileUpdateError
})

const mapDispatchToProps=(dispatch)=>({
    listAllUsers:(data)=>dispatch(listAllUsers(data)),
})

export default connect(null,mapDispatchToProps)(Dashboard)