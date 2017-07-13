import { $http, $q } from 'angular';
import sessionStorageService from './sessionStorageService';

export default class ApiService {
    constructor($http, $q, sessionStorageService){
        this.$http = $http;
        this.$q = $q;
        this.SessionStorageService = sessionStorageService;
        this.url = 'http://10.24.14.219:5786/';
        this.token = {
            token_type: '',
            access_token: ''
        };
        this.defaultHeader = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${this.token.token_type} ${this.token.access_token}`
            }
        }
        this.authorizationHeader = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    }

    getRequest(path){
        this.setDefaultHeader();
        return this.$http.get(this.url + path, this.defaultHeader);
    }

    postRequest(path, data){
        this.setDefaultHeader();
        return this.$http.post(this.url + path, data, this.defaultHeader);
    }

    deleteRequest(path){
        this.setDefaultHeader();
        return this.$http.delete(this.url + path, this.defaultHeader);
    }

    logInToService(user){
        let loginString = `grant_type=password&username=${user.username}&password=${user.password}`;
        return this.$q((resolve, reject) => {
            this.$http.post('http://10.24.14.219:5786/Token', loginString, this.authorizationHeader).then(response => {

                this.SessionStorageService.setItemInStorage(response.data, 'token');
                resolve(response.data);
            }).catch( e => {
                console.log(e);
            })
        })
        
    }


    setDefaultHeader(){
        this.token = this.SessionStorageService.getItemFromStorage('token');
        this.defaultHeader = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${this.token.token_type} ${this.token.access_token}`
            }
        }
    }


}