import authService from './authService';
import apiService from '../../api/apiService';
import loginService from './loginservice';

export default class LoginController {
    constructor(apiService, $state, $mdToast, $timeout) {
        this.$state = $state;
        this.$mdToast = $mdToast;
        this.$timeout = $timeout;
        this.user = {
            username: '',
            password: ''
        };
        this.loading = false;
        this.ApiService = apiService;
    }


    logInTosite(){
        this.loading = true;
        // this.ApiService.logInToService(this.user)
        //     .then(response => {
        //         console.log(response);
        //     });
        this.$timeout(() => {
            console.log(this.user);
            this.ApiService.logInToService(this.user)
                .then(response => {
                    this.returnResult = response;
                    this.role = this.returnResult.roles;
                    this.token = this.returnResult.access_token;
                    console.log(this.returnResult);
                    console.log(this.role);
                    this.$state.go('home');
                    this.loading = false;
                })
                .catch(error => {
                    if (error.status === 400) {
                        console.log('złe dane');
                        this.badRequest();
                    } else {
                        console.log('baza danych nie odpowiada');
                        this.badDatabase();
                    }
                    this.loading = false;
                });
        },3000);
    }
    getAllLecturers(){
        this.ApiService.getRequest('api/Groups').then(response => {console.log(response.data)});
    }
    badRequest() {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent('Username or password is incorrect')
                .position('top center')
                .hideDelay(4000)
        );
    }

    badDatabase() {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent("   Oops... server don't answer")
                .position('top center')
                .hideDelay(4000)
        );
    }

}
