import {$stateParams} from '@uirouter/angularjs';
import apiService from '../../../api/apiService';

export default class ManageGroupsController{
    constructor($stateParams, apiService){
        this.$stateParams = $stateParams;
        this.ApiService = apiService;
        this.data = [];
        console.log(this.$stateParams.id);
        console.log(this.id);
        this.name = "";
        this.isSomeData = false;  
        this.getGroup();
    }

    getGroup(){
        this.ApiService.getRequest('api/Groups/' + this.$stateParams.id).then(response => {
            this.data = response.data.Data.Students;
            this.name = response.data.Data.Name;
            if(this.data.length > 0){
                this.isSomeData = true;
            }
            else{
               this.isSomeData = false;
               return; 
            }

            if(this.path === 'Groups'){
                this.DataStoreService.setGroups(this.data);
            }
            this.columnsName = Object.keys(this.data[0]);
            for(let i = 0; i < this.columnsName.length; i++){
                let index = this.columnsName[i];
                if(this.data[0][index] instanceof Array){                   
                    this.columnsName.splice(i, 1);
                    i--;
                }
                if(index === 'Id'){
                    this.columnsName.splice(i, 1);
                    i--;
                }
            }
        });
    }

}