import angular from 'angular';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import uiRouter from '@uirouter/angularjs';
import ngChart from 'angular-chart.js';


import '../../node_modules/angular-material/angular-material.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './style.css';

import CommonModule from './components/common/commonModule';

import LoginComponent from './components/login/loginComponent';
import LoginService from './components/login/loginservice';

import LogoutComponent from './components/logout/logoutComponent';
import HomeComponent from './components/home/homeComponent';

import StatisticComponent from './components/home/statistic/statisticComponent';
import ManageLecturesComponent from './components/home/manageLectures/manage-lecturesComponent';
import ManageGroupsComponent from './components/home/manageGroups/manage-groupsComponent';
import GenericComponent from './components/common/generic/genericComponent';
import ModalController from './components/common/generic/modalController';

import MenuService from './components/common/sidenav/menuService';
import AuthService from './components/login/authService';

import ApiService from './api/apiService';
import SessionStorageService from './api/sessionStorageService';



export default angular.module('AppModule', [ngMaterial, uiRouter, ngAnimate, ngChart, CommonModule.name])
                    .config(routingConfigs)
                    .component('homeComponent', HomeComponent)
                    .component('loginComponent', LoginComponent)
                    .component('myStatistic', StatisticComponent)
                    .component('myManageLectures', ManageLecturesComponent)
                    .component('myManageGroups', ManageGroupsComponent)
                    .component('logoutComponent', LogoutComponent)
                    .component('genericComponent', GenericComponent)
                    .service('menuService', MenuService)
                    .service('authService', AuthService)
                    .service('loginService', LoginService)
                    .service('apiService', ApiService)
                    .service('sessionStorageService', SessionStorageService)
.controller('ModalController',ModalController);

function routingConfigs($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .when('/home', '/home/statistic')
    .otherwise('/login');

  const login = {
    name: 'login',
    url: '/login',
    component: 'loginComponent'
  }
  const home = {
    name: 'home',
    url: '/home',
    component: 'homeComponent'
  }

  const homeStatistic = {
    name: 'home.statistic',
    url: '/statistic',
    component: 'myStatistic'
  }

  const homeManageGroups = {
    name: 'home.manage-groups',
    url: '/manage-groups',
    component: 'genericComponent',
    resolve: { path: function(){ return 'api/Groups' } }
  }

  const homeManageLectures = {
    name: 'home.manage-lectures',
    url: '/manage-lectures',
    component: 'genericComponent',
    resolve: { path: function(){ return 'api/Lecturers' } }
  }
  const homeManageTasks = {
    name: 'home.manage-tasks',
    url: '/manage-tasks',
    component: 'genericComponent',
    resolve: { path: function(){ return 'api/Groups' } }
  }

  const logout = {
    name: 'logout',
    url: '/logout',
    component: 'logoutComponent'
  }
  

  $stateProvider
    .state(login)
    .state(home)
    .state(homeStatistic)
    .state(homeManageLectures)
    .state(homeManageGroups)
    .state(homeManageTasks)
    .state(logout);
}