// import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
// import logo from "../../logo.svg";
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
    <ListItem key={e.created_at} value={e} />
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="py-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Hello👋</span>
            <span className="block text-green-600">
              {todoList.length > 0 ? `You have ${todoList.length} task` : "Let's create a task!"}
            </span>
          </h2>
        </div>
        {/* <pre>{todoList}</pre> */}
        <div className="py-2">
          <form onSubmit={save} method="post">
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                Create New task
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="about"
                  name="about"
                  rows={3}
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Add New task"
                  defaultValue={''}
                  value={newTask}
                  required
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </div>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 mt-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Save
              </button>

            </div>
            <br />
            <ol>
              {listTask}
            </ol>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
