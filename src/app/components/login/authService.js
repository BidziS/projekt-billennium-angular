import { $http, $window } from 'angular'; 

export default class AuthService{
    constructor($http, $window){
        this.$http = $http;
        this.$window = $window;
        this.user = {
            username: '',
            password: ''
        }
        this.token = {
            access_token: '',
            token_type: ''
        };
        this.defaultHeader = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${this.token.token_type} ${this.token.access_token}`
            }
        }
        this.authorizationHeader = {
            headers: {
                
            }
        }
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