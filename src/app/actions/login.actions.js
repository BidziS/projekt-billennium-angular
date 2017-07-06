import { LOGIN } from '../constants/login';

function logIn(){  
    return {
        type: LOGIN.LOG_IN,
        isLogIn: true
    }
}

function logOut(){  
    return {
        type: LOGIN.LOG_OUT,
        isLogIn: false
    };
}

export default { logIn, logOut };  