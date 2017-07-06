import TodoActions from '../../actions/todo.actions';
import LoginActions from '../../actions/login.actions';
import {$ngRedux} from 'ng-redux';

export default class LoginController{
    constructor($ngRedux) {
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
