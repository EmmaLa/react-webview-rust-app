import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";


import 'bulma/css/bulma.css';
import './css/index.scss';

import Todo from "./components/Todo";
import store from "./stores";
import { refreshTodos } from "./actions/Todo";

window.refresh = (todos) => {
  console.log("Called refresh");
  store.dispatch(refreshTodos(todos));
}

const App = () =>{
  return (
    <Provider store={store}>
      <div div className="container">
        <Todo/>
      </div>
    </Provider>
  )
};

render(<App />, document.getElementById("app"));
