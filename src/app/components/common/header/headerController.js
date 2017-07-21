import {$mdSidenav} from 'angular-material';
import {$state} from '@uirouter/angularjs';
import sessionStorageService from '../../../api/sessionStorageService';

export default class HeaderController {
    constructor($mdSidenav, $state, sessionStorageService, $rootScope){
        this.title = 'Shut up and learn';
        this.$mdSidenav = $mdSidenav;
        this.$state = $state;
        this.sessionStorageService = sessionStorageService;
        this.getUserEmail();
        this.isOpen = false;
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
        console.log('password');
        this.isOpen = false;
        this.$state.go('home.change-password');
    }

    changeEmail() {
        console.log('email');
        this.isOpen = false;
        this.$state.go('home.change-email');
    }
    
}
