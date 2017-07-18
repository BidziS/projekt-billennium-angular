

export default class NewAccountController {
    constructor($mdToast, apiService, $stateParams){
        this.ApiService = apiService;
        this.$mdToast = $mdToast;
        this.newAccount = {
            'Token': '',
            'Password': '',
            'ConfirmPassword': ''
        };
        this.$stateParams = $stateParams;
        console.log(this.$stateParams);
    }
    signUp() {
        if (this.newAccount.Password !== this.newAccount.ConfirmPassword) {
            this.badPasswords();
        }
        // else if (typeof this.token === 'undefined') {
        //     this.noAccess();
        // }
        else {
            console.log(this.newAccount);
            this.ApiService.postAccount('api/Account/Activate', this.newAccount)
                .then(response => {
                    console.log(response);
                    // this.returnResult = response;
                    // this.role = this.returnResult.roles;
                    // this.token = this.returnResult.access_token;
                    // console.log(this.returnResult);
                    // console.log(this.role);
                    // this.$state.go('home');
                    // this.loading = false;
                })
                .catch(error => {
                    if (error.status === 400) {
                        console.log('złe dane');
                        // this.badRequest();
                    } else {
                        console.log('baza danych nie odpowiada');
                        this.badDatabase();
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

    badDatabase() {
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
}

NewAccountController.$inject = ['$mdToast','apiService', '$stateParams'];