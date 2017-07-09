import {$state} from '@uirouter/angularjs';
import {$ngRedux} from 'ng-redux';

export default class MenuController{
    constructor($state, $ngRedux){
        this.unsubscribe = $ngRedux.connect(this.mapStateToThis)(this);
        this.$state = $state;
        this.isOpen = false;
    }

    toggleSubmenu(){
        this.isOpen = !this.isOpen;
    }

    $onDestroy(){
        this.unsubscribe();
    }

    mapStateToThis(state) {
        return {
            menu: state.menu
        };
    }
    goToSite(site){
        this.$state.go('home.' + site);
    }
}

//HeaderController.$inject = ['$mdSidenav', '$state']; 