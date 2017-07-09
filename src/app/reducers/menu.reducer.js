import initialState from './initial-state';

export function MenuReducer(state = initialState.menuItems, action) {  
    switch(action.type) {
        default:
            return state;
    }
}