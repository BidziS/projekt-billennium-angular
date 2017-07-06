import {$mdSidenav} from 'angular-material';
import {$state} from '@uirouter/angularjs';

export default class HeaderController{
    constructor($mdSidenav, $state){
        this.title = 'header';
        this.$mdSidenav = $mdSidenav;
        this.$state = $state;
        this.isLoggedIn = false;
    }

    $onInit(){
        console.log('y');
    }

    toggleMenu(){
        this.$mdSidenav('left').toggle();
    }
    toggleLogin(){
        this.isLoggedIn = !this.isLoggedIn;
    }
    logout(){
        this.$state.go('logout');
    }
    
}

//HeaderController.$inject = ['$mdSidenav', '$state']; 