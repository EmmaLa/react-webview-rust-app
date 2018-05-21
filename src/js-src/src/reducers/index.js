import { ADD_TODO, REFRESH_TODO, UPDATE_TODO, REMOVE_DONE_TODO } from "../constants/Todo";

const initialState = [];

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case REFRESH_TODO: 
            console.log("REFRESH TODO");
            return action.todos;
        case ADD_TODO: 
            console.log("ADDING TODO");
            return state;
        case UPDATE_TODO: 
            console.log("UPDATE TODO");
            return state;
        case REMOVE_DONE_TODO: 
            console.log("REMOVE TODO");
            return state;
        default:
            console.log("Nothing happened");
    }
    return state;
};
export default rootReducer;