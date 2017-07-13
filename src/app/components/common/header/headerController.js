import {$mdSidenav} from 'angular-material';
import {$state} from '@uirouter/angularjs';

export default class HeaderController{
    constructor($mdSidenav, $state){
        this.title = 'header';
        this.$mdSidenav = $mdSidenav;
        this.$state = $state;
    }

    toggleMenu(){
        this.$mdSidenav('left').toggle();
    }

    logout(){
        this.$state.go('logout');
    }

    
}

//HeaderController.$inject = ['$mdSidenav', '$state']; 