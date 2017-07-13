// import {GenericController} from './genericController';

export default class ModalController{
    constructor(modalHeader, $mdDialog, columnsName){
        this.modalHeader = modalHeader;
        this.$mdDialog = $mdDialog;
        this.columnsName = columnsName;
        console.log(this.modalHeader);
    }

    submit() {
        this.$mdDialog.cancel();
    }

    request() {
        console.log('z drogi, request idzie kurwa');
        console.log(this.columnsName);
    }

};



ModalController.$inject = ['modalHeader','$mdDialog', 'columnsName'];