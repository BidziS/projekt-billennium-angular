export default class MenuService{      
    constructor($http) {
        this.$http = $http;
    }

    // getMenuItems(){
    //     return this.$http.get('https://api.github.com/users/octocat/followers');
    // }
}
MenuService.$inject = ['$http']; 