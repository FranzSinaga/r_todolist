// import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../../logo.svg";
import { ListItem } from "./components/ListComponents";

export const Home = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      console.log(todos)
      setTask(todos);
    }
  }, []);

  const save = (event) => {
    event.preventDefault();

    const addTask = task;
    addTask.push(newTask);
    localStorage.setItem("todos", JSON.stringify(addTask));
    setTask(addTask);
    setNewTask("");
  };


  const listTask = task.map(e =>
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
        {task.length > 0 ? "Todo: " : "Tidak ada task"}
        <ol>
          {listTask}
        </ol>
      </form>
    </div>
  );
};

export default Home;
