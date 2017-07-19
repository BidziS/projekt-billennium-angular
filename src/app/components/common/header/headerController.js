import {$mdSidenav} from 'angular-material';
import {$state} from '@uirouter/angularjs';
import sessionStorageService from '../../../api/sessionStorageService';

export default class HeaderController {
    constructor($mdSidenav, $state, sessionStorageService){
        this.title = 'SQL Exam';
        this.$mdSidenav = $mdSidenav;
        this.$state = $state;
        this.sessionStorageService = sessionStorageService;
        this.getUserEmail();
        this.settings = ['Change password', 'Change e-mail'];
        this.isOpen = false;
    }

    toggleMenu(){
        this.$mdSidenav('left').toggle();
    }

    logout(){
        this.$state.go('logout');
    }
    getUserEmail(){
        let token = this.sessionStorageService.getItemFromStorage('token');
        this.user = token.userName;
        console.log(token);
    }

    toggleSubmenu(){
        this.isOpen = !this.isOpen;
    }
    
}
