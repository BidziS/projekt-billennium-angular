import TodoActions from '../../actions/todo.actions';
import LoginActions from '../../actions/login.actions';
import loginService from './loginservice';
import {$ngRedux} from 'ng-redux';
let obj = `grant_type=password&username=jan@abc.com&password=Qwerty123`;

export default class LoginController {
    constructor(loginService) {
        this.sth = {
            "grant_type": "password",
            "userName": "jan@abc.com",
            "password": "Qwerty123"
        };
        this.LoginService = loginService;
        console.log(this.LoginService);
        this.LoginService.postResult(obj)
            .then(response => {
            this.wantFuckingResult = response.data;
            console.log(this.wantFuckingResult.access_token);
            console.log('dobrze jest');
        });
        // this.todo = '';
        // this.unsubscribe = $ngRedux.connect(this.mapStateToThis, LoginActions)(this);
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

