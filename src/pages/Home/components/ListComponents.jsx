import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as date from "../../../utils/date";
// Slices
import { initTodo } from "../../../redux/slices/todoSlices";

export const ListItem = (props) => {
  const value = props.value;
  const isCompleted = props.isCompleted;
  const indexData = props.idx;

  const [isDisabled, setIsDisabled] = useState(true);
  const [itemValue, setItemvalue] = useState(value.task);

  const dispatch = useDispatch();
  const allDataTask = useSelector((state) => state.todo.todoList);

  const deleteTask = (value) => {
    const result = allDataTask.filter((e) => e !== value);
    dispatch(initTodo(result));
  };

  const editTask = () => {
    let temp = [...allDataTask];
    const idx = allDataTask.findIndex((e) => e.task === value.task);
    const result = {
      task: itemValue.task ? itemValue.task : itemValue,
      created_at: value.created_at,
      updated_at: date.getDateTimeNow(),
      isDone: value.isDone,
    };
    if (idx !== -1) temp[idx] = result;

    dispatch(initTodo(temp));
    setIsDisabled(true);
  };

  const changeStatus = (selector) => {
    var isChecked = document.querySelector(`#${selector}`).checked;
    let temp = [...allDataTask];
    
    const idx = allDataTask.findIndex((e) => e.task === value.task);
    const result = {
      task: itemValue.task ? itemValue.task : itemValue,
      created_at: value.created_at,
      updated_at: date.getDateTimeNow(),
      isDone: isChecked ? true : false,
    };
    if (idx !== -1) temp[idx] = result;

    dispatch(initTodo(temp));
    setIsDisabled(true);
  };

  return (
    <li className="max-w-full bg-white mt-4 py-2 px-5 border-spacing-0 drop-shadow-md hover:drop-shadow-xl rounded-2xl">
      <div className="flex flex-row flex-wrap">
        {isCompleted && (
          <input
            id={`isDone-${indexData}`}
            type="checkbox"
            onChange={(e) => changeStatus(e)}
            className="flex-none w-4 h-4 mt-2 mr-1 text-gray-600 
            bg-gray-100 rounded border-gray-300 focus:ring-green-500 
            dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 
            dark:bg-gray-700 dark:border-gray-600"
            checked
            disabled
          />
        )}
        {!isCompleted && (
          <input
            id={`isDone-${indexData}`}
            disabled={!isDisabled}
            type="checkbox"
            onChange={() => changeStatus(`isDone-${indexData}`)}
            className="flex-none w-4 h-4 mt-2 mr-1 text-green-600 
            bg-gray-100 rounded border-gray-300 focus:ring-green-500 
            dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 
            dark:bg-gray-700 dark:border-gray-600 disabled:dark:bg-gray-700"
          />
        )}
        {!isDisabled && (
          <div className="flex-1">
            <input
              className={` focus:ring-green-500 block w-3/4 focus:border-green-500 mt-1 sm:text-sm ${
                isDisabled ? "border-none" : "shadow-sm border border-gray-300"
              }  rounded-md`}
              type="text"
              name="newTask"
              value={itemValue.task}
              autoComplete="off"
              disabled={isDisabled}
              onChange={(e) => setItemvalue(e.target.value)}
            ></input>
          </div>
        )}
        {isDisabled && (
          <div className="flex-1">
            <p
              className={`text-lg leading-none ${
                isCompleted ? "line-through" : ""
              }`}
            >
              {value.task}
            </p>
            {!value.updated_at && (
              <p className="font-thin text-sm leading-none">
                Created at: {value.created_at}
              </p>
            )}
            {value.updated_at && (
              <p className="font-thin text-sm leading-none">
                Updated at: {value.updated_at}
              </p>
            )}
          </div>
        )}

        <div className="flex-initial">
          {isDisabled ? null : (
            <button
              className="text-green-500 border-2 border-green-500 
              hover:bg-green-500 hover:text-white active:bg-green-600 font-bold p-2 
              rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => editTask()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 stroke-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          )}
          {!isCompleted && (
            <button
              className="text-blue-500 border-2 border-blue-500 
              hover:bg-blue-500 hover:text-white mt-1 active:bg-blue-600 font-bold p-2 
              rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                setIsDisabled(!isDisabled);
                setItemvalue(value);
              }}
            >
              {isDisabled ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 stroke-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 stroke-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          )}
          {isDisabled ? (
            <button
              className="text-red-500 border-2 border-red-500 
              hover:bg-red-500 hover:text-white active:bg-red-600 font-bold p-2 
              rounded outline-none focus:outline-none mr-1 mb-1 mt-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => deleteTask(value)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 stroke-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default ListItem;
