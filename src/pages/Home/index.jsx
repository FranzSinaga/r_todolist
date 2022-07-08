// import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import logo from "../../logo.svg";
import { getItem } from "../../utils/storage";
// Slices
import { addTodo, initTodo } from "../../redux/slices/todoSlices.js"
// Components
import { ListItem } from "./components/ListComponents";

export const Home = () => {
  const [newTask, setNewTask] = useState("");

  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);

  useEffect(() => {
    const todos = JSON.parse(getItem('todos'));
    if (todos) {
      dispatch(initTodo(todos));
    }
  }, [dispatch]);

  const save = (event) => {
    event.preventDefault();
    dispatch(addTodo(newTask))
    setNewTask("");
  };


  const listTask = todoList.map(e =>
    <ListItem key={e} value={e} />
  );

  return (
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h3>To Do Web</h3>
      <form onSubmit={save} method="post">
        <div>
          <label>
            Task
            <input
              type="text"
              name="newTask"
              value={newTask}
              autoComplete="off"
              onChange={(e) => setNewTask(e.target.value)}
            ></input>
          </label>
        </div>
        <button type="submit">Save</button>
        <br />
        {todoList.length > 0 ? "Todo: " : "Tidak ada task"}
        <ol>
          {listTask}
        </ol>
      </form>
    </div>
  );
};

export default Home;
