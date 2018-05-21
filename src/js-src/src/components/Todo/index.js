import React from "react";
import { connect } from "react-redux";

import { addTodo, removeDoneTodo } from "../../actions/Todo";

import TodoList from "./TodoList";

const ENTER_KEYCODE = 13;

class Todo extends React.Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = { newTodoValue: "" };

        this.updateNewTodo = this.updateNewTodo.bind(this);
        this.submitNewTodoOnEnter = this.submitNewTodoOnEnter.bind(this);
        this.removeDoneTodo = this.removeDoneTodo.bind(this);
    }

    submitNewTodoOnEnter(event){
        if(event.keyCode === ENTER_KEYCODE){
            this.props.addTodo(this.state.newTodoValue);
            this.setState({ newTodoValue: "" });
        }
    }

    updateNewTodo(event){
        this.setState({ newTodoValue: event.target.value });
    }

    removeDoneTodo(event){
        this.props.removeDoneTodo();
    }

    render(){
        return ( 
            <div>
                <input value={this.state.newTodoValue} 
                       onChange={this.updateNewTodo}
                       onKeyDown={this.submitNewTodoOnEnter}
                       id="todo-input" 
                       className="input is-rounded is-info" 
                       type="text" 
                       placeholder="Enter your note" />
                       <TodoList todos={this.props.todos} />
                       <span onClick={this.removeDoneTodo} class="button is-info delete-task-btn">Delete completed task</span>
            </div>
        );
    }
}

const mapStateToProps = todos => {
    return { todos } ;
}

const mapDispatchToProps = dispatch => {
    return { 
        addTodo: todoName => { dispatch(addTodo(todoName)); },
        removeDoneTodo: () => { dispatch(removeDoneTodo()); }
     } ;
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);