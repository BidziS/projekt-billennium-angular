// import { $http } from 'angular';
import { $ngRedux } from 'ng-redux';

export default class ServerService {
    constructor($http, $q, $ngRedux) {
        this.$http = $http;
        this.$q = $q;
        this.unsubscribe = $ngRedux.connect(this.mapStateToThis, LoginActions)(this);
        this.host = 'http://10.24.14.219:5786/';
        this.token = '';
        this.tokenType = '';
        this.defaultHeader = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${this.tokenType} ${this.token}`
            }
        }
        this.loginHeader = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        this.user = {
            username: '',
            password: ''
        }
    }

    $onDestroy() {
        this.unsubscribe();
    }

    mapStateToThis(state) {
        return {
            todos: state.todos,
            isLogIn: state.isLogIn,
            currentUser: state.login
        };
    }

    logInToSite(user) {
        let logInObject = `grant_type=password&username=${user.username}&password=${user.password}`;
        return this.$q((resolve, reject) => {
            this.$http.get('https://api.github.com/users/octocat/followers').then((resault)=>{
                resolve(resault);
            });
        })
        //this.$http.post(this.host + 'Token', logInObject, this.loginHeader);
    }

}

ServerService.$inject = ['$http', '$q']; 