export default class ChangePasswordController {
    constructor(apiService, $mdToast, $state, $mdDialog) {
        this.apiService = apiService;
        this.$mdToast = $mdToast;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.password = {
            OldPassword: '',
            NewPassword: '',
            ConfirmPassword: ''
        };

    }

    changePassword() {
        if (this.password.NewPassword !== this.password.ConfirmPassword) {
            this.badPasswords();
        } else {
            console.log(this.password);
            this.apiService.postRequest('api/Account/ChangePassword', this.password)
                .then(response => {
                    console.log(response);
                    this.changedPassword();
                    this.$state.go('home.statistic');
                })
                .catch(error => {
                    this.badApi();
                })
        }
    }

    badPasswords() {
        this.$mdToast.show(
            this.$mdToast.simple()
                .content("Passwords are different")
                .position('top center')
                .hideDelay(4000)
        );
    }

    changedPassword() {
        this.$mdToast.show(
            this.$mdToast.simple()
                .content("Password is changed")
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

    showConfirm() {
        let confirm = this;
        let conf = confirm.$mdDialog.confirm()
            .title(`Do you want to change your password?`)
            .textContent('')
            .ariaLabel('')
            // .targetEvent(ev)
            .ok('Confirm')
            .cancel('Abort');

        let hideDialog = function () {
            this.changePassword();
        };
        confirm.$mdDialog.show(conf)
            .then(hideDialog => {
                confirm.changePassword();
            })
            .catch(() => {
                confirm.$mdDialog.cancel(conf);
            });
    };
}