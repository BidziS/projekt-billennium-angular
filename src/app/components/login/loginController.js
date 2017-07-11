// import authService from './authService';
// import loginService from './loginservice';
// import $state from '@uirouter/angularjs';
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
    }

    catchMeIfYouCan() {
        this.sth = `grant_type=password&username=`+ this.username + `&password=`+ this.password;
        this.postMyPersonalities(this.sth);
    }

    postMyPersonalities(userData) {
        this.loading = true;
        this.$timeout(() => {
            this.LoginService.postResult(userData)
                .then(response => {
                    this.wantFuckingResult = response.data;
                    this.role = this.wantFuckingResult.roles;
                    this.token = this.wantFuckingResult.access_token;
                    console.log(this.wantFuckingResult);
                    console.log(this.role);
                    this.$state.go('home');
                    this.loading = false;
                })
                .catch(() => {
                    console.log('złe dane');
                    this.showAlert();
                    this.loading = false;
                });
        },3000);
    }

    showAlert() {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent('Username or password is incorrect')
                .position('top center')
                .hideDelay(4000)
        );
    }
}