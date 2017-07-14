import apiService from '../../../api/apiService';

export default class GenericController {
    constructor(apiService, $mdDialog, $timeout){
        this.ApiService = apiService;
        this.$mdDialog = $mdDialog;
        this.$timeout = $timeout;
        this.modalHeader = '';
        this.isLoading = true;
        // this.setDataToTable();
    }

    $onInit(){
        this.setDataToTable();
    }

    setDataToTable(){
        this.$timeout(() => {
        this.ApiService.getRequest(this.path).then(response => {
            this.data = response.data.Data.Entries;
            console.log(this.data);
            this.columnsName = Object.keys(this.data[0]);
            for(let i = 0; i < this.columnsName.length; i++){
                let index = this.columnsName[i];
                if(this.data[0][index] instanceof Array){                   
                    this.columnsName.splice(i, 1);
                    i--;
                }
            }
            this.isLoading = false;
        });
        },3000);
    }

    modalOpen(text, value) {
        this.selectedElement = value;
        this.modalHeader = text;
        this.$mdDialog.show({
            controller: 'ModalController',
            controllerAs: 'modal',
            clickOutsideToClose: true,
            template: require('./modal.html'),
            locals: {
                modalHeader: this.modalHeader,
                columnsName: this.columnsName,
                data: this.data,
                selectedElement: this.selectedElement
            }
        });

    }

}
