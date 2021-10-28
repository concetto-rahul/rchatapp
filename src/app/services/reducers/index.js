import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import pageLoaderReducer from './pageLoaderReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    login:loginReducer,
    pageLoader:pageLoaderReducer,
    profile:profileReducer
});