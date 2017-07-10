import { LOGIN } from '../constants/login';
import userApi from '../api/userApi';
import serverService from '../api/serverService';
import menuService from '../components/common/sidenav/menuService';
import {$http} from 'angular';

import {myInjectableMiddleware} from '../appModule';


export function logInUserSuccess(currentUser) {
    return { type: LOGIN.LOGIN_USER_SUCCESS, currentUser };
}

function logIn(user){  
    return function(dispatch){
        return dispatch(logInUserSuccess(user));

    }
}

function logOut(){  
    return {
        type: LOGIN.LOG_OUT,
        isLogIn: false
    };
}

export default { logIn, logOut };  


