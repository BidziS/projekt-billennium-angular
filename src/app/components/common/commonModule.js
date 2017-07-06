import angular from 'angular';
import ngMaterial from 'angular-material';

import HeaderComponent from './header/headerComponent';
import SidenavComponent from './sidenav/sidenavComponent';
import UserDetailsComponent from './user-details/user-detailsComponent';

import MenuService from './sidenav/menuService';

export default angular.module('CommonModule', [ngMaterial])
                    .service('MenuService', MenuService)                   
                    .component('myHeader', HeaderComponent)
                    .component('mySidenav', SidenavComponent)
                    .component('myUserDetails', UserDetailsComponent);
