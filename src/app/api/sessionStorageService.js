import { $window } from 'angular';

export default class SessionStorageService {
    constructor($window){
        this.$window = $window;
    }

    getItemFromStorage(itemName){
        return JSON.parse(this.$window.sessionStorage.getItem(itemName));
    }

    setItemInStorage(data, itemName){
        this.$window.sessionStorage.setItem(itemName, JSON.stringify(data));
    }
}