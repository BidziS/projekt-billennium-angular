import apiService from '../../../api/apiService';
import {$state, $scope} from '@uirouter/angularjs';
import dataStoreService from '../../../api/dataStoreService';


export default class StagesController{
    constructor($state, apiService, dataStoreService, $scope){
        this.$state = $state;
        this.ApiService = apiService;
        this.stages = [];
        this.isOpen = false;
        this.DataStoreService = dataStoreService;
        this.$scope = $scope;

        let dataStorage = this.DataStoreService;
        this.$scope.$watch(function () {
            return dataStorage.getStage();
        }, (value) =>{
            console.log(value);
            this.stages = value;
        })
    }
    $onInit(){
        this.getStages();
    }
    toogleSubmenu(){
        this.isOpen = !this.isOpen;
    }
    getStages(){
        this.ApiService.getRequest('api/Stages').then(response =>{
            this.stages = response.data.Data;
        })
    }
    goToDoTest(id, name){
        if(this.stages[id].Grade === 0){
            this.$state.go('home.do-stage', {id: id, name: name})
        }
        else{
            this.$state.go('home.test-result', {id:id, name: name})
        }
    }

}