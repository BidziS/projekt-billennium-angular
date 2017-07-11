export default class TableController {
    constructor() {

    }
    showModal() {
        $mdDialog.show({
            controller: TableController(),
            templateUrl: 'modal.html'
        })
    }
    hideModal() {
        $mdDialog.hide();
    };
}