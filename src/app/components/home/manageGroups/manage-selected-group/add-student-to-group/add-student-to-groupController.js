import apiService from '../../../../../api/apiService';
import { $state } from '@uirouter/angularjs';

export default class AddStudentToGroupController{
    constructor($mdDialog, $mdToast, apiService, $state, groupId){
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.apiService = apiService;
        this.$state = $state;
        this.addPerson = {
            Name: "",
            Email: ""
        }
        this.groupId = groupId;
        this.columnsName = Object.keys(this.addPerson);
    }
    addStudentToGroup() {
        this.apiService.postRequest('api/Groups/'+this.groupId+'/Students', this.addPerson).then(response => {
            this.dataAdded = response.data.Data;
            this.$state.reload();
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent("You added a student to group.")
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


