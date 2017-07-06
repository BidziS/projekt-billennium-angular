import { LOGIN } from '../constants/login';
import initialState from './initial-state';


export function LoginReducer(state = initialState.isLogIn, action) {  
    switch(action.type) {
        case LOGIN.LOG_IN:
            return action.isLogIn;
        case LOGIN.LOG_OUT:
            return action.isLogIn;
        default:
            return state;
    }
}