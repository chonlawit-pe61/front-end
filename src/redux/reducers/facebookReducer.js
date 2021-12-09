import {FACEBOOK_LOGIN} from '../action/action'

const facebookReducer = (state=null, action ) => {
    switch (action.type) {
        case FACEBOOK_LOGIN:
            return action.payload
        default:
            return {
                ...state
            }
    }
}
export default facebookReducer;