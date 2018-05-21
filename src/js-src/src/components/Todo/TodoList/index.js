import React from "react";
import { connect } from "react-redux";
import { updateTodo } from '../../../actions/Todo';

class TodoItem extends React.Component {
    constructor(props){
        super(props);

        this.toggleTodoStatus = this.toggleTodoStatus.bind(this);
    }

    toggleTodoStatus(event){
        console.log(this.props);
        const todoIsDone = !this.props.todo.done;
        this.props.updateTodo(this.props.index, todoIsDone)
        console.log("Click on todo");
    }

    render(){
        const markTodoClassName = this.props.todo.done ? "marked" : "";

        return (
            <div className="todo-item" >
                <span className="todo-text" onClick={this.toggleTodoStatus} className={markTodoClassName} > {this.props.index} - { this.props.todo.name } </span>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        updateTodo: (index, done) => { dispatch(updateTodo(index, done)); }
     } ;
}

const TodoItemComponentProxy = connect(null, mapDispatchToProps)(TodoItem);

export default class TodoList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const todoItems = this.props.todos.map( (todo, index) => <TodoItemComponentProxy key={todo.id} index={index} todo={todo} /> )

        return (
            <div>
                {todoItems}
            </div>
        )
    }
}



