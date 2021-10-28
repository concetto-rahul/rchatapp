import { PAGELOADERTRUE, PAGELOADERFALSE } from "../servicesConst";
const initialState={
    loader:false
}

export default function pageLoaderFuntion(state=initialState,action){
    switch (action.type) {
        case PAGELOADERTRUE:
            return {
                ...state,
                loader:true
            };
        case PAGELOADERFALSE:
            return {
                ...state,
                loader:false
            };
        default:
            return state;
    }
}