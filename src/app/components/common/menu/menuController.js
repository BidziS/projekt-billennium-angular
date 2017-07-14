import {$state, $scope} from '@uirouter/angularjs';
import apiService from '../../../api/apiService';
import dataStoreService from '../../../api/dataStoreService';

export default class MenuController{
    constructor($state, apiService, dataStoreService, $scope){
        this.$state = $state;
        this.ApiService = apiService;
        this.DataStoreService = dataStoreService;
        this.isOpen = false;
        this.menu = [];
        this.$scope = $scope;
        let dataStorage = this.DataStoreService;
        this.$scope.$watch(function(){return dataStorage.getGroups();}, (value) => {
            console.log(value);
            this.menu = value;
        });
    }

    $onInit(){
        this.getGruops();
    }

    toggleSubmenu(){
        this.isOpen = !this.isOpen;
    }

    goToSite(site){
        this.$state.go('home.' + site);
    }

    goToManageGroup(id, name){
        this.$state.go('home.manage-group', {id: id, name: name})
    }

    getGruops(){
        this.ApiService.getRequest('api/Groups').then(response => {
            console.log(response.data);
            this.menu = response.data.Data.Entries;
        });
    }
}
