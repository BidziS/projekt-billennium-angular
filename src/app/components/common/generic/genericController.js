import apiService from '../../../api/apiService';

export default class GenericController {
    constructor(apiService, $mdDialog){
        this.ApiService = apiService;
        this.$mdDialog = $mdDialog;
        this.modalHeader = '';
    }

    $onInit(){
        this.setDataToTable();
    }

    setDataToTable(){
        this.ApiService.getRequest(this.path).then(response => {
            this.data = response.data.Data.Entries;
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

    modalOpen(text) {
        console.log(text);
        this.modalHeader = text;
        this.$mdDialog.show({
            controller: 'ModalController',
            controllerAs: 'modal',
            clickOutsideToClose: true,
            template: require('./modal.html'),
            locals: {
                modalHeader: this.modalHeader,
                columnsName: this.columnsName
            }
        });

    }

}

