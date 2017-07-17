import apiService from '../../../../api/apiService';
import { $state } from '@uirouter/angularjs';

export default class ModalController{
    constructor($mdDialog, $mdToast, apiService, $state){
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.apiService = apiService;
        this.$state = $state;
        this.addPerson = {
            FirstName: "",
            LastName: "",
            Email: "",
            Password: "",
            ConfirmPassword: ""
        }
        this.columnsName = Object.keys(this.addPerson);
    }
    request() {
        if(this.addPerson.Password !== this.addPerson.ConfirmPassword ){
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent("Password and Confirm password not match!")
                    .position('top center')
                    .hideDelay(4000)
            );
            return;
        }
        this.apiService.postRequest('api/Lecturers/', this.addPerson).then(response => {
            this.dataAdded = response.data.Data;
            this.$state.reload();
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent("You added a lecturer")
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


