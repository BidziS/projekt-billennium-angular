import GenericController from './genericController';
//import apiService from '../../../api/apiService';

export default class ModalController{
    constructor(modalHeader, $mdDialog, columnsName, selectedElement, apiService, data){
        this.modalHeader = modalHeader;
        this.$mdDialog = $mdDialog;
        this.columnsName = columnsName;
        this.selectedElement = selectedElement;
        this.apiService = apiService;
        this.GenericController = GenericController;
        this.data = data;
        this.modalTable = [];
        this.addPerson = {
            "Name": "",
            "Email": "",
            "Password": "",
            "ConfirmPassword": ""
        }
        // this.newPerson = false;
    }

    // submit() {
    //     if(this.newPerson) {
    //         this.request();
    //     } else {
    //         console.log('cancel');
    //     }
    //     this.newPerson = false;
    // }

    request() {
        console.log(this.data);
        console.log(this.addPerson);
        if(this.modalHeader === 'Add') {
            this.apiService.postRequest('api/Lecturers/',this.selectedElement)
                .then(response => {
                    this.dataAdded = response.data.Data;
            });
        } else {
            this.apiService.putRequest('api/Lecturers/',this.selectedElement, this.selectedElement.Id)
                .then(response => {
                    this.dataAdded = response.data.Data;

            });
        }
        this.$mdDialog.cancel();
    }
    cancel() {
        this.$mdDialog.cancel();
    }

};



ModalController.$inject = ['modalHeader','$mdDialog', 'columnsName', 'selectedElement', 'apiService', 'data'];