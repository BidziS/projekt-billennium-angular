export default class TableController {
    constructor($mdDialog) {
        this.$mdDialog = $mdDialog;
    }
    showModal() {
        this.$mdDialog.show({
            controller: TableController(),
            templateUrl: '../home/manageLectures/modal.html'
        })
    }
    hideModal() {
        this.$mdDialog.hide();
    };
}