

export default class NewAccountController {
    constructor($mdToast, apiService, $stateParams, $state){
        this.ApiService = apiService;
        this.$mdToast = $mdToast;
        this.$state = $state;
        this.newAccount = {
            'Token': $stateParams.access_token,
            'Password': '',
            'ConfirmPassword': ''
        };
        this.$stateParams = $stateParams;
    }
    signUp() {
        if (this.newAccount.Password !== this.newAccount.ConfirmPassword) {
            this.badPasswords();
        } else {
            console.log(this.newAccount);
            this.ApiService.postRequestNoConfig('api/Account/Activate', this.newAccount)
                .then(response => {
                    console.log(response);
                    this.createdAccount();
                    this.$state.go('login');
                })
                .catch(error => {
                    if (error.status === 400) {
                        console.log('złe dane');
                    } else {
                        this.badApi();
                    }
                })
        }
    }


    badPasswords() {
        this.$mdToast.show(
            this.$mdToast.simple()
                .content("        Passwords are different")
                .position('top center')
                .hideDelay(4000)
        );
    }

    badApi() {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent("   Oops... server don't answer")
                .position('top center')
                .hideDelay(4000)
        );
    }

    noAccess() {
        this.$mdToast.show(
            this.$mdToast.simple()
                .textContent("Your link to register is invalid")
                .position('top center')
                .hideDelay(4000)
        );
    }

    createdAccount() {
        this.$mdToast.show(
            this.$mdToast.simple()
                .content("Your account is activated")
                .position('top center')
                .hideDelay(4000)
        );
    }
}

NewAccountController.$inject = ['$mdToast','apiService', '$stateParams', '$state'];