import TodoActions from '../../actions/todo.actions';
import LoginActions from '../../actions/login.actions';
import {$ngRedux} from 'ng-redux';
import {MenuService} from '../common/sidenav/menuService';
import {ServerService} from '../../api/serverService';


export default class LoginController{
    constructor($ngRedux, ServerService) {
        this.todo = 'aaaa';
        this.logInUserData = {
            login: '',
            password: ''
        }
        this.unsubscribe = $ngRedux.connect(this.mapStateToThis, LoginActions)(this);
        this.ServerService = ServerService;
    }

    submitTodo(){
        this.addTodo(this.todo);
        this.todo = '';
    }

    logInToSite(){
        this.ServerService.getMenuItems()
                        .then(result => {this.logIn(this.result)})
        
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
            isLogIn: state.isLogIn,
            currentUser: state.login
        };
    }
}
