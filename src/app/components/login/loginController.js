import TodoActions from '../../actions/todo.actions';
import LoginActions from '../../actions/login.actions';
import LoginService from './loginservice';
import {$ngRedux} from 'ng-redux';

export default class LoginController {
    constructor($ngRedux) {
        this.sth = {
            "grant_type": "password",
            "userName": "jan@abc.pl",
            "password": "Qwerty123"
        };
        this.elo = LoginService;
        // console.log(this.LoginService);
        console.log(this.sth);
        LoginService.postResult(this.sth);
            // .then(response => {
            // this.wantFuckingResult = response.data;
            // console.log('dobrze jest');
        // });
        this.todo = '';
        this.unsubscribe = $ngRedux.connect(this.mapStateToThis, LoginActions)(this);
    }

    submitTodo(){
        this.addTodo(this.todo);
        this.todo = '';
    }

    logInToSite(){
        this.logIn();
    }

    logOutToSite(){
        this.logOut();
    }

    $onDestroy(){
        this.unsubscribe();
    }

    mapStateToThis(state) {
        return {
            todos: state.todos,
            isLogIn: state.isLogIn
        };
    }
}
