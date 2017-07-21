import apiService from '../../../api/apiService';
import { $mdDialog, $mdToast } from 'angular-material';
import ModalController from './add-lecturer/add-lecturerController';

export default class ManageLecturesController{
    constructor(apiService, $mdDialog, $mdToast){
        this.ApiService = apiService;
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.name = "Lecturers"
        this.data = [];
    }

    $onInit(){
        this.setDataToTable();
    }

    setDataToTable(){
        this.ApiService.getRequest('api/Lecturers').then(response => {
            this.data = response.data.Data.Entries;
            
            if(this.data.length > 0){
                this.isSomeData = true;
            }
            else{
               this.isSomeData = false; 
            }
            
            this.columnsName = Object.keys(this.data[0]);
            
            for(let i = 0; i < this.columnsName.length; i++){
                let index = this.columnsName[i];
                if(index === 'Id'){
                    this.columnsName.splice(i, 1);
                    i--;
                }
                
            }

        });
    }

    showConfirm(ev, id) {
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
        }).catch(function (){
            confirm.$mdDialog.cancel(conf);
        });
    };

    modalOpen(text, value) {
        let context = this;
        this.selectedElement = value;
        this.modalHeader = text;
        this.$mdDialog.show({
            controller: 'AddLecturerController',
            controllerAs: 'modal',
            clickOutsideToClose: true,
            template: require('./add-lecturer/add-lecturer.html'),
            locals: {
                data: context.data,
                selectedElement: context.selectedElement
            }
    


        })
    }

    deleteItem(id){
        this.ApiService.deleteRequest('api/Lecturers/' + id).then(response => {
            this.setDataToTable();
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent("You deleted a lecturer")
                    .position('top center')
                    .hideDelay(4000)
            )
        })
    }

}