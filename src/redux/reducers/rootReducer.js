import { combineReducers } from "redux"; // eslint-disable-line
import  facebookReducer  from './facebookReducer';

const rootReducer = combineReducers({
    userFacebook: facebookReducer
})
export default rootReducer;
