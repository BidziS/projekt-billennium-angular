export default class ManageLecturesController {
    constructor($mdDialog){
        this.$mdDialog = $mdDialog;
    }
    showModal() {
        this.$mdDialog.show({
            controller: ManageLecturesController,
            controllerAs: 'lectures',
            template: require('./modal.html'),
            clickOutsideToClose: true
        })
    }

    confirmModal() {
        this.$mdDialog.cancel();
    };

    cancelModal() {
        this.$mdDialog.cancel();
    };
}