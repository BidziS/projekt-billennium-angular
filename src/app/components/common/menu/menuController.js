import {$state} from '@uirouter/angularjs';
import apiService from '../../../api/apiService';

export default class MenuController{
    constructor($state, apiService){
        this.$state = $state;
        this.ApiService = apiService;
        this.isOpen = false;
        this.menu = [];
        this.tableHeader = '';
    }

    $onInit(){
        this.getGruops();
    }

    toggleSubmenu(){
        this.isOpen = !this.isOpen;
    }

    goToSite(site){
        this.$state.go('home.' + site);
        this.tableHeader = 'Groups';
    }

    getGruops(){
        this.ApiService.getRequest('api/Groups').then(response => {
            console.log(response.data);
            this.menu = response.data.Data.Entries;
        });
    }
}
