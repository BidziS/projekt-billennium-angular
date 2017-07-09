import { combineReducers } from 'redux';  
import { TodosReducer }  from './todos.reducer';
import { LoginReducer } from './login.reducer';
import { MenuReducer } from './menu.reducer';
 
export const RootReducer = combineReducers({  
    todos: TodosReducer,
    login: LoginReducer,
    menu: MenuReducer
});