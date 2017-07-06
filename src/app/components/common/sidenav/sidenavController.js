import MenuService from './menuService';
import {$state} from '@uirouter/angularjs';


export default class SidenavController{
    constructor(MenuService, $state){
        MenuService.getMenuItems()
            .then(result => this.menu = result.data);
        this.menu = [];
        this.$state = $state;
        
    }

    check(){
        this.menu = [];
    }

    goToSite(site){
        this.$state.go('home.' + site);
    }



}

//SidenavController.$inject = ['$state'];

