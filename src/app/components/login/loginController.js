import authService from './authService';

export default class LoginController{
    constructor(authService) {
        this.logInUserData = {
            login: '',
            password: ''
        }
        this.AuthService = authService;
    }


    logInToSite(){
        this.AuthService.setFollowers();
    }
    
    logOutToSite(){
        this.AuthService.getFollowers();
    }

}
