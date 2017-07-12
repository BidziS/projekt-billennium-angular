// import authService from './authService';
import apiService from '../../api/apiService';
// import $state from '@uirouter/angularjs';
import loginService from './loginservice';
// import $mdToast from 'angular-material';

export default class LoginController {
    constructor($state, loginService, $mdToast, $timeout) {
        this.$state = $state;
        this.$mdToast = $mdToast;
        this.$timeout = $timeout;
        this.username = '';
        this.password = '';
        this.LoginService = loginService;
        this.loading = false;
        this.ApiService = apiService;

    logInTosite(){
    postMyPersonalities(userData) {
        this.loading = true;
        this.ApiService.logInToService(this.user).then(response => {console.log(response)});
        this.$timeout(() => {
            this.LoginService.postResult(userData)
                .then(response => {
                    this.returnResult = response.data;
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

    requestAccess() {
        this.sth = `grant_type=password&username=`+ this.username + `&password=`+ this.password;
        this.postMyPersonalities(this.sth);
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