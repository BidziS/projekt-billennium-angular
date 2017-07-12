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
        this.lecturer = {
            name: 'Andrzej',
            email: 'andaw@gmail.com',
            password: 'qwerty',
            confirmPassword: 'qwerty'
        }
    }


    logInTosite(){
        this.ApiService.logInToService(this.user).then(response => {console.log(response)});
    }
    getAllLecturers(){
        this.ApiService.getRequest('api/Groups').then(response => {console.log(response.data)});
    }
    addLecturer(){
        this.ApiService.postRequest('api/Lecturers', this.lecturer)
                        .then(response => {console.log(response.data)})
                        .catch(err => {console.log(err.message)});
    }

}
