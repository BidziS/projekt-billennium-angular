import angular from 'angular';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import uiRouter from '@uirouter/angularjs';
import ngRedux from 'ng-redux';
import ngCookies from 'angular-cookies';

import { RootReducer } from './reducers';

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

export default angular.module('AppModule', [ngMaterial, uiRouter, ngRedux, ngAnimate, ngCookies, CommonModule.name])
                    .service('loginService', LoginService)
                    .config(routingConfigs)
                    .component('homeComponent', HomeComponent)
                    .component('loginComponent', LoginComponent)
                    .component('myStatistic', StatisticComponent)
                    .component('myManageLectures', ManageLecturesComponent)
                    .component('myManageGroups', ManageGroupsComponent)
                    .component('logoutComponent', LogoutComponent);

function routingConfigs($stateProvider, $urlRouterProvider, $ngReduxProvider) {
  $urlRouterProvider
    .when('/home', '/home/statistic')
    .otherwise('/login');

  const login = {
    name: 'login',
    url: '/login',
    component: 'loginComponent',
      resolve: {
      show: function() {
          console.log('login');
      }
      }
  };
  const home = {
    name: 'home',
    url: '/home',
    component: 'homeComponent',
      resolve: {
          show: function () {
              console.log('home');
          }
      }
  };

  const homeStatistic = {
    name: 'home.statistic',
    url: '/statistic',
    component: 'myStatistic',
      resolve: {
          show: function () {
              console.log('statistic');
          }
      }
  };

  const homeManageLectures = {
    name: 'home.manage-groups',
    url: '/manage-groups',
    component: 'myManageGroups',
      resolve: {
          show: function () {
              console.log('groups');
          }
      }
  };

  const homeManageGroups = {
    name: 'home.manage-lectures',
    url: '/manage-lectures',
    component: 'myManageLectures',
      resolve: {
          show: function () {
              console.log('lecturers');
          }
      }
  };

  const logout = {
    name: 'logout',
    url: '/logout',
    component: 'logoutComponent',
      resolve: {
          show: function () {
              console.log('logout');
          }
      }
  };
  

  $stateProvider
    .state(login)
    .state(home)
    .state(homeStatistic)
    .state(homeManageLectures)
    .state(homeManageGroups)
    .state(logout);
    $ngReduxProvider.createStoreWith(RootReducer);
}