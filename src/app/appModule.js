import angular from 'angular';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import uiRouter from '@uirouter/angularjs';
import ngChart from 'angular-chart.js';
import angularLoadingBar from 'angular-loading-bar'; 

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

import MenuService from './components/common/sidenav/menuService';
import AuthService from './components/login/authService';
import loadingInterceptor from './api/loadingInterceptor';

import ApiService from './api/apiService';
import SessionStorageService from './api/sessionStorageService';
import DataStoreService from './api/dataStoreService';

import {$windowProvider} from 'angular';


export default angular.module('AppModule', [ngMaterial, uiRouter, ngAnimate, ngChart, angularLoadingBar, CommonModule.name])
                    .config(routingConfigs)
                    .run(checkAuthentication)
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
                    .factory('loadingInterceptor', loadingInterceptor)
                    .service('sessionStorageService', SessionStorageService)
                    .service('dataStoreService', DataStoreService);

function checkAuthentication($rootScope, $state, $window){
  $rootScope.$on("$locationChangeSuccess", function(event, toState, toParams, fromState, fromParams){
    let token = {}
    if($window.sessionStorage.getItem("token") !== null){
      token = JSON.parse($window.sessionStorage.getItem('token'));
    }
    let isEmpty = 0;

    isEmpty = Object.keys(token).length;

    
    let state = '';
    for(let i = toState.length - 1; i > 0; i--){
        if(toState[i] === '/'){
          break;
        }
        let tmp = '';
        tmp = toState[i] + state;
        state = tmp;
    }
      
    if (state !== 'login' && state != 'logout' && isEmpty === 0){
      // User isn’t authenticated
      $state.transitionTo("login");
      event.preventDefault(); 
    }
  });
}

function routingConfigs($stateProvider, $urlRouterProvider, $windowProvider, $qProvider, cfpLoadingBarProvider, $httpProvider) {
  $httpProvider.interceptors.push(loadingInterceptor);
  $urlRouterProvider
    .when('/home', '/home/statistic')
    .otherwise('/login');

  const login = {
    name: 'login',
    url: '/login',
    component: 'loginComponent',
    authenticate: true
  }
  const home = {
    name: 'home',
    url: '/home',
    component: 'homeComponent',
    authenticate: true
  }

  const homeStatistic = {
    name: 'home.statistic',
    url: '/statistic',
    component: 'myStatistic',
    authenticate: true
  }

  const homeManageGroups = {
    name: 'home.manage-groups',
    url: '/manage-groups',
    component: 'genericComponent',
    resolve: { path: function(){ return 'Groups' } },
    authenticate: true
  }

  const homeManageLectures = {
    name: 'home.manage-lectures',
    url: '/manage-lectures',
    component: 'genericComponent',
    resolve: { path: function(){ return 'Lecturers' } },
    authenticate: true
  }
  const homeManageTasks = {
    name: 'home.manage-tasks',
    url: '/manage-tasks',
    component: 'genericComponent',
    resolve: { path: function(){ return 'Groups' } }
  }

  const manageGroup = {
    name: 'home.manage-group',
    url: '/manage-group/{id}',
    component: 'myManageGroups',
    params: {
      id: ''
    }
  }

  const logout = {
    name: 'logout',
    url: '/logout',
    component: 'logoutComponent'
  }
  
  // function authenticate($state, $q, $timeout){
  //   let $window = $windowProvider.$get();
  //   let token = JSON.parse($window.sessionStorage.getItem('token'));
  //   let isEmpty = Object.keys(token).length

  //   if(Object.keys(token).length !== 0){
  //     return $q.when();
  //   }
  //   else{
  //     $timeout(function(){
  //       $state.go('login');
  //     });

  //     return $q.reject();
  //   }

  // }

  $stateProvider
    .state(login)
    .state(home)
    .state(homeStatistic)
    .state(homeManageLectures)
    .state(homeManageGroups)
    .state(homeManageTasks)
    .state(manageGroup)
    .state(logout);
}