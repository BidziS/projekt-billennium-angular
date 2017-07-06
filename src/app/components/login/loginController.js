import TodoActions from '../../actions/todo.actions';
import {$ngRedux} from 'ng-redux';

export default class LoginController{
    constructor($ngRedux) {
        this.todo = '';
        this.unsubscribe = $ngRedux.connect(this.mapStateToThis, TodoActions)(this);
    }

    submitTodo(){
        this.addTodo(this.todo);
        this.todo = '';
    }

    $onDestroy(){
        this.unsubscribe();
    }

    mapStateToThis(state) {
        return {
            todos: state.todos
        };
    }
}
