import {$mdSidenav} from 'angular-material';
import {$state} from '@uirouter/angularjs';
import {$ngRedux} from 'ng-redux';

export default class HeaderController{
    constructor($mdSidenav, $state, $ngRedux){
        this.title = 'header';
        this.$mdSidenav = $mdSidenav;
        this.$state = $state;
        this.isLoggedIn = false;
        this.unsubscribe = $ngRedux.connect(this.mapStateToThis)(this);
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
        this.$state.go('login');
    }
    $onDestroy(){
        this.unsubscribe();
    }

    mapStateToThis(state) {
        return {
            isLogIn: state.login
        };
    }
    
}

//HeaderController.$inject = ['$mdSidenav', '$state']; 