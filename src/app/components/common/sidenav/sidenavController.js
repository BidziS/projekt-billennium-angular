import MenuService from './menuService';
import {$state} from '@uirouter/angularjs';


export default class SidenavController{
    constructor(MenuService, $state){
        // // MenuService.getMenuItems()
        //     .then(result => this.menu = result.data);
        this.menu = [];
        this.$state = $state;
        this.tableHeader = '';
    }

    check(){
        this.menu = [];
    }

    goToSite(site){
        this.$state.go('home.' + site);
        this.tableHeader = 'Lecturers';
    }
}

//SidenavController.$inject = ['$state'];

