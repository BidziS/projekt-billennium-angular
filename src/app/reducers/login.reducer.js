import { LOGIN } from '../constants/login';
import initialState from './initial-state';


export function LoginReducer(state = initialState.currentUser, action) {  
    switch(action.type) {
        case LOGIN.LOGIN_USER_SUCCESS:
            return action.currentUser;
        case LOGIN.LOG_OUT:
            return action.isLogIn;
        default:
            return state;
    }
}