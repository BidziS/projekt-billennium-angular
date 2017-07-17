import apiService from '../../../../api/apiService';
import { $state } from '@uirouter/angularjs';

export default class AddStudentToGroupController{
    constructor($mdDialog, $mdToast, apiService, $state, groupId){
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.apiService = apiService;
        this.$state = $state;
        this.addGroup = {
            Name: ""
        }
        this.lecturers = [];
        this.selectedLecturer = {};
        this.groupId = groupId;
    }

    getLecturers(){
        this.apiService.getRequest('api/Lecturers').then(response => {
            this.data = response.data.Data.Entries;
            if(this.data.length > 0){
                this.isSomeData = true;
            }
            else{
               this.isSomeData = false; 
            }           
        });
    }


    addGroupToDatabase() {
        this.apiService.postRequest('api/Groups', this.addGroup).then(response => {
            this.dataAdded = response.data.Data;
            this.$state.reload();
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent("You added a group.")
                    .position('top center')
                    .hideDelay(4000)
            );
            this.$mdDialog.cancel();
        });
        
        
    }
    cancel() {
        this.$mdDialog.cancel();
    }

};


