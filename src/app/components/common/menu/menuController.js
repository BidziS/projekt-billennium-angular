import {$state} from '@uirouter/angularjs';

export default class MenuController{
    constructor($state){
        this.$state = $state;
        this.isOpen = false;
    }

    toggleSubmenu(){
        this.isOpen = !this.isOpen;
    }

    goToSite(site){
        this.$state.go('home.' + site);
    }
}

//HeaderController.$inject = ['$mdSidenav', '$state']; 