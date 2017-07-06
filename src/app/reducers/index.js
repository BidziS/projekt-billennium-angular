import { combineReducers } from 'redux';  
import { TodosReducer }  from './todos.reducer';
import { LoginReducer } from './login.reducer';
 
export const RootReducer = combineReducers({  
    todos: TodosReducer,
    login: LoginReducer
});