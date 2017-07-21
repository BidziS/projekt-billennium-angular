import MenuService from './menuService';
import {$state} from '@uirouter/angularjs';
import sessionStorageService from '../../../api/sessionStorageService';

export default class SidenavController{
    constructor(MenuService, $state, sessionStorageService){
        // // MenuService.getMenuItems()
        //     .then(result => this.menu = result.data);
        this.menu = [];
        this.$state = $state;
        this.tableHeader = '';
        this.sessionStorageService = sessionStorageService;
    }

    $onInit(){
        let token = this.sessionStorageService.getItemFromStorage('token');
        this.roles = token.roles;
        console.log(this.roles);
        if(this.roles === "Student") {
            this.iAmStudent = true;
            this.iAmLecturer = false;
            this.iAmAdmin = false;
        } else if(this.roles === "Lecturer") {
            this.iAmStudent = false;
            this.iAmLecturer = true;
            this.iAmAdmin = false;
        } else {
            this.iAmStudent = false;
            this.iAmLecturer = false;
            this.iAmAdmin = true;
        }
    }

    check(){
        this.menu = [];
    }

    goToSite(site){
        this.$state.go('home.' + site);
        this.tableHeader = 'Lecturers';
    }
}

//SidenavController.$inject = ['$state'];

