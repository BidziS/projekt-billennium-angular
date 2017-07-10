export default class LoginService {
    constructor ($q, $http) {
        this.$q = $q;
        this.$http = $http;
    }

    static postResult(value) {
        return this.$http.post('http://10.24.14.219:5786/Token', value);
    }
}

LoginService.$inject = ['$q', '$http'];