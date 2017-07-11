import authService from './authService';
import apiService from '../../api/apiService';
import loginService from './loginservice';

export default class LoginController {
    constructor(loginService, apiService) {
        this.user = {
            username: '',
            password: ''
        }
        this.LoginService = loginService;
        this.ApiService = apiService;
    }


    logInTosite(){
        this.ApiService.logInToService(this.user).then(response => {console.log(response)});
    }
    getAllLecturers(){
        this.ApiService.getRequest('api/Groups').then(response => {console.log(response.data)});
    }
    

}
