import {$mdSidenav} from 'angular-material';
import {$state} from '@uirouter/angularjs';
import sessionStorageService from '../../../api/sessionStorageService';


export default class HeaderController {
    constructor($mdSidenav, $state, sessionStorageService, $rootScope, apiService){
        this.title = 'Shut up and learn';
        this.$mdSidenav = $mdSidenav;
        this.$state = $state;
        this.sessionStorageService = sessionStorageService;
        this.apiService = apiService;
        this.getUserEmail();
        this.isOpen = false;
        this.inputWithUsername = true;
        this.name = {
            FirstName: '',
            LastName: ''
        }
    }

    toggleMenu() {
        this.$mdSidenav('left').toggle();
    }

    logout() {
        this.$state.go('logout');
    }
    getUserEmail() {
        let token = this.sessionStorageService.getItemFromStorage('token');
        this.user = token.name;
        console.log(token);
    }

    toggleSubmenu() {
            this.isOpen = !this.isOpen;
    }

    changePassword() {
        this.isOpen = false;
        this.$state.go('home.change-password');
    }

    changeEmail() {
        this.isOpen = false;
        this.$state.go('home.change-email');
    }

    // openInputWithName() {
    //     this.inputWithUsername = false;
    //     this.isOpen = false;
    // }

    // changeName() {
    //     let lastName = '';
    //     for(let i = this.user.length; i = 0; i--) {
    //         if(this.user[i] === ' ') {
    //
    //         }
    //     }
    //     this.user
    //     this.isOpen = false;
    //     this.inputWithUsername = true;
    //     // this.apiService.postRequest('api/Account/ChangeName', this.name)
    //     //     .then(response => {
    //     //         console.log(response);
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error);
    //     //     })
    // }
}
