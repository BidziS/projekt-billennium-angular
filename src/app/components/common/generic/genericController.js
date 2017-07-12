import apiService from '../../../api/apiService';
import dataStoreService from '../../../api/dataStoreService';
import {$mdDialog} from 'angular-material';

export default class GenericController{
    constructor(apiService, $mdDialog, dataStoreService){
        this.ApiService = apiService;
        this.$mdDialog = $mdDialog;
        this.tableName = this.path;
        this.DataStoreService = dataStoreService;      
    }

    $onInit(){
        this.setDataToTable();
    }

    setDataToTable(){
        this.ApiService.getRequest('api/' + this.path).then(response => {
            this.data = response.data.Data.Entries;
            this.DataStoreService.setGroups(this.data);
            this.columnsName = Object.keys(this.data[0]);
            for(let i = 0; i < this.columnsName.length; i++){
                let index = this.columnsName[i];
                if(this.data[0][index] instanceof Array){                   
                    this.columnsName.splice(i, 1);
                    i--;
                }
            }
        });
    }
    showConfirm(ev, id) {
    // Appending dialog to document.body to cover sidenav in docs app
        let confirm = this;
        let conf = confirm.$mdDialog.confirm()
            .title(`Do you want to delete this item?`)
            .textContent('')
            .ariaLabel('')
            .targetEvent(ev)
            .ok('Confirm')
            .cancel('Abort');

        let deleteItm = function(){
            this.deleteItem(id);
        };
        confirm.$mdDialog.show(conf).then(function(deleteItm){
            confirm.deleteItem(id);
        });
    };

    deleteItem(id){
        this.ApiService.deleteRequest('api/'+ this.path + '/' + id).then(response => {
            this.setDataToTable();
        });
    }
}
