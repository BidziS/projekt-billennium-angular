import angular from 'angular';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import uiRouter from '@uirouter/angularjs';
import ngRedux from 'ng-redux';
import ngChart from 'angular-chart.js';
import ReduxThunk from 'redux-thunk';

import { RootReducer } from './reducers';

import '../../node_modules/angular-material/angular-material.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './style.css';

import CommonModule from './components/common/commonModule';

import LoginComponent from './components/login/loginComponent';
import LogoutComponent from './components/logout/logoutComponent';
import HomeComponent from './components/home/homeComponent';

import StatisticComponent from './components/home/statistic/statisticComponent';
import ManageLecturesComponent from './components/home/manageLectures/manage-lecturesComponent';
import ManageGroupsComponent from './components/home/manageGroups/manage-groupsComponent';

import MenuService from './components/common/sidenav/menuService';

import ServerService from './api/serverService';

export default angular.module('AppModule', [ngMaterial, uiRouter, ngRedux, ngAnimate, ngChart, CommonModule.name])
                    .config(routingConfigs)
                    .component('homeComponent', HomeComponent)
                    .component('loginComponent', LoginComponent)
                    .component('myStatistic', StatisticComponent)
                    .component('myManageLectures', ManageLecturesComponent)
                    .component('myManageGroups', ManageGroupsComponent)
                    .component('logoutComponent', LogoutComponent)
                    .service('menuService', MenuService)
                    .service('serverService', ServerService)
                    .factory('myInjectableMiddleware', myInjectableMiddleware);


function myInjectableMiddleware($http) {
  return store => next => action => {
    if(action.type === 'LOGIN_USER_SUCCESS'){
      $http.get('https://api.github.com/users/octocat/followers').then(result => {return result});      
    }


    next(action);
  }
}

function routingConfigs($stateProvider, $urlRouterProvider, $ngReduxProvider) {
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

  const homeManageLectures = {
    name: 'home.manage-groups',
    url: '/manage-groups',
    component: 'myManageGroups'
  }

  const homeManageGroups = {
    name: 'home.manage-lectures',
    url: '/manage-lectures',
    component: 'myManageLectures'
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
    .state(logout);
    $ngReduxProvider.createStoreWith(
      RootReducer, [ReduxThunk, 'myInjectableMiddleware']
      );
};