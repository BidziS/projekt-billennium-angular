import authService from './authService';
// import loginService from './loginservice';

export default class LoginController {
    constructor(loginService) {
        // this.$state = $state;
        this.username = '';
        this.password = '';
        // this.sth = {
        //     "grant_type": "password",
        //     "userName": "jan@abc.com",
        //     "password": "Qwerty123"
        // };
        this.LoginService = loginService;
        // this.todo = '';
        // this.unsubscribe = $ngRedux.connect(this.mapStateToThis, LoginActions)(this);
    }

    catchMeIfYouCan() {
        this.sth = `grant_type=password&username=`+ this.username + `&password=`+ this.password;
        // console.log(this.sth);
        this.postMyPersonalities(this.sth);
    }

    postMyPersonalities(userData) {
        this.LoginService.postResult(userData)
            .then(response => {
                this.wantFuckingResult = response.data;
                this.role = this.wantFuckingResult.roles;
                this.token = this.wantFuckingResult.access_token;
                console.log(this.wantFuckingResult);
                console.log(this.role);
                if(this.wantFuckingResult.id !== '') {
                    // $state.go('home');
                    // $cookies.put('token', this.token);
                    console.log('poszło id');
                } else {
                    console.log('złe dane');
                }
            });
    }
    //
    // submitTodo(){
    //     this.addTodo(this.todo);
    //     this.todo = '';
    // }
    //
    // logInToSite(){
    //     this.logIn();
    // }
    //
    // logOutToSite(){
    //     this.logOut();
    // }
    //
    // $onDestroy(){
    //     this.unsubscribe();
    // }
    //
    // mapStateToThis(state) {
    //     return {
    //         todos: state.todos,
    //         isLogIn: state.isLogIn
    //     };
    // }
}

// LoginController.$inject = ['$state'];