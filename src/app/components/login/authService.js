import { $http, $window } from 'angular'; 
export default class AuthService{
    constructor($http, $window){
        this.$http = $http;
        this.$window = $window;
    }

    setFollowers(){
        this.$http.get('https://api.github.com/users/octocat/followers').then(response => {
            this.$window.sessionStorage.setItem('followers', JSON.stringify(response.data))
        });
    }

    getFollowers(){
        let followers = JSON.parse(this.$window.sessionStorage.getItem('followers'));
    }
}