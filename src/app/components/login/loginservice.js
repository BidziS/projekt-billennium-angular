let header = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
};
export default class LoginService {
    constructor ($http) {
        this.$http = $http;
        // this.url = 'http://10.24.14.219:5786/Token';
    }

    postResult(value) {
        console.log(value);
        return this.$http.post('http://10.24.14.219:5786/Token', value, header);
    }
}

LoginService.$inject = ['$http'];