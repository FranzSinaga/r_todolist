// import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import logo from "../../logo.svg";
import { getItem } from "../../utils/storage";

// Slices
import { addTodo, initTodo } from "../../redux/slices/todoSlices.js";

// Components
import { ListItem } from "./components/ListComponents";
import Toggle from "../../components/toggleTheme/ThemeToggle";

export const Home = () => {
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);

  useEffect(() => {
    const todos = JSON.parse(getItem("todos"));
    if (todos) {
      dispatch(initTodo(todos));
    }
  }, [dispatch]);

  const save = (event) => {
    event.preventDefault();
    dispatch(addTodo(newTask));
    setNewTask("");
  };

  const listTask = todoList.map((e, idx) => {
    if (e.isDone === false) {
      return (
        <ListItem key={e.created_at} value={e} isCompleted={false} idx={idx} />
      );
    }
    return null;
  });

  const listTaskCompleted = todoList.map((e) => {
    if (e.isDone) {
      return <ListItem key={e.created_at} value={e} isCompleted={true} />;
    }
    return null;
  });

  const incompletedtask = todoList.filter((e) => {
    return e.isDone === false;
  });

  const completedtask = todoList.filter((e) => {
    return e.isDone === true;
  });

  return (
    // <div className="min-h-screen bg-gray-50 dark:bg-black"></div>
    <div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="flex justify-between py-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block dark:text-gray-100">Hello👋</span>
            <span className="block text-green-600 dark:text-green-400">
              {incompletedtask.length > 0
                ? `You have ${incompletedtask.length} task`
                : "Let's create a task!"}
            </span>
          </h2>
          <Toggle />
        </div>
        {/* <pre>{todoList}</pre> */}
        <div className="py-2">
          <form onSubmit={save} method="post">
            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 dark:text-gray-100"
              >
                Create New task
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="about"
                  name="about"
                  rows={3}
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md
                  dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:bg-gray-600 dark:border-gray-800 dark:text-white dark:placeholder-gray-300"
                  placeholder="Add New task"
                  value={newTask}
                  autoComplete="off"
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
            <ol>{listTask}</ol>
            {completedtask.length > 0 && (
              <p className="dark:text-gray-50">Completed:</p>
            )}
            <ol>{listTaskCompleted}</ol>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
