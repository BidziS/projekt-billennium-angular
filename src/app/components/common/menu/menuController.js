import {$state, $scope} from '@uirouter/angularjs';
import apiService from '../../../api/apiService';
import dataStoreService from '../../../api/dataStoreService';
import sessionStorageService from '../../../api/sessionStorageService';

export default class MenuController{
    constructor($state, apiService, dataStoreService, $scope, sessionStorageService){
        this.$state = $state;
        this.ApiService = apiService;
        this.DataStoreService = dataStoreService;
        this.sessionStorageService = sessionStorageService;
        this.isOpen = false;
        this.iAmStudent = false;
        this.iAmLecturer = false;
        this.iAmAdmin = false;
        this.menu = [];
        this.$scope = $scope;
        let dataStorage = this.DataStoreService;
        this.$scope.$watch(function(){return dataStorage.getGroups();}, (value) => {
            console.log(value);
            this.menu = value;
        });
    }

    $onInit(){
        let token = this.sessionStorageService.getItemFromStorage('token');
        this.roles = token.roles;
        console.log(this.roles);
        if(this.roles === "Student") {
            console.log('jestem tylko biednym studentem');
        } else if(this.roles === "Lecturer") {
            this.getGroups();
        } else {
            this.getGroups();
        }
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

    getGroups(){
        this.ApiService.getRequest('api/Groups').then(response => {
            console.log(response.data);
            this.menu = response.data.Data.Entries;
            
        });
    }
}
