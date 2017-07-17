import { $stateParams } from '@uirouter/angularjs';
import apiService from '../../../../api/apiService';
import { $mdDialog, $mdToast } from 'angular-material';

export default class ManageGroupController{
    constructor($stateParams, apiService, $mdDialog, $mdToast){
        this.$stateParams = $stateParams;
        this.ApiService = apiService;
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.data = [];
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

    modalOpen(text, value) {
        let context = this;
        this.selectedElement = value;
        this.modalHeader = text;
        this.$mdDialog.show({
            controller: 'AddStudentToGroupController',
            controllerAs: 'modal',
            clickOutsideToClose: true,
            template: require('./add-student-to-group/add-student-to-group.html'),
            locals: {
                data: context.data,
                groupId: context.$stateParams.id
            }
    


        })
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
        this.ApiService.deleteRequest('api/Groups/'+ this.$stateParams.id + '/Students/' +id).then(response => {
            this.getGroup();
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent("You deleted a student")
                    .position('top center')
                    .hideDelay(4000)
            )
        })
    }

}