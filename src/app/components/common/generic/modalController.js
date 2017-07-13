// import {GenericController} from './genericController';
//import apiService from '../../../api/apiService';

export default class ModalController{
    constructor(modalHeader, $mdDialog, columnsName, selectedElement, apiService){
        this.modalHeader = modalHeader;
        this.$mdDialog = $mdDialog;
        this.columnsName = columnsName;
        this.selectedElement = selectedElement;
        this.apiService = apiService;
        this.modalTable = [];
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
        console.log(this.modalHeader);
        if(this.modalHeader === 'Add') {
            this.apiService.postRequest('api/Lecturers/',this.selectedElement).then(response => {
                console.log(response);
            });
        } else {
            this.apiService.putRequest('api/Lecturers/',this.selectedElement, this.selectedElement.Id).then(response => {
                console.log(response);
            });
        }
        this.$mdDialog.cancel();
    }
    // confirm() {
    //     this.newPerson = true;
    // }
    cancel() {
        this.$mdDialog.cancel();
    }

};



ModalController.$inject = ['modalHeader','$mdDialog', 'columnsName', 'selectedElement', 'apiService'];