import { ADD_TODO, REFRESH_TODO, UPDATE_TODO, REMOVE_DONE_TODO } from "../../constants/Todo";

const rpc = {
    invoke : function(arg) { window.external.invoke(JSON.stringify(arg)); },
    init : function() { rpc.invoke({cmd : 'init'}); },
    log : function() {
      var s = '';
      for (var i = 0; i < arguments.length; i++) {
        if (i != 0) {
      s = s + ' ';
        }
        s = s + JSON.stringify(arguments[i]);
      }
      rpc.invoke({cmd : 'log', text : s});
    },
    addTask : function(name) { 
        console.log("Adding task rpc call");
        rpc.invoke({cmd : 'addTask', name : name}); 
    },
    clearDoneTasks : function() { rpc.invoke({cmd : 'clearDoneTasks'}); },
    markTask : function(index, done) {
      rpc.invoke({cmd : 'markTask', index : index, done : done});
    },
  };

export const addTodo = todoName => {
    rpc.addTask(todoName);
    return {
        type: ADD_TODO,
        name: todoName
    }
}

export const updateTodo = (index, done) => {
    rpc.markTask(index, done);
    return {
        type: UPDATE_TODO,
        done: done
    }
}

export const removeDoneTodo = () => {
    rpc.clearDoneTasks();
    return {
        type: UPDATE_TODO,
        done: done
    }
}

export const refreshTodos = (todos) => {
    return {
        type: REFRESH_TODO,
        todos
    }
}