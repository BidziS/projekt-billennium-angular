import {$mdSidenav} from 'angular-material';
import {$state} from '@uirouter/angularjs';
import sessionStorageService from '../../../api/sessionStorageService';

export default class HeaderController{
    constructor($mdSidenav, $state, sessionStorageService){
        this.title = 'SQL Exam';
        this.$mdSidenav = $mdSidenav;
        this.$state = $state;
        this.sessionStorageService = sessionStorageService;
        this.user = 'guest';
        this.getUserEmail();
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
    }
    
}
