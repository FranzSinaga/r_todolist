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
    };
    if (idx !== -1) temp[idx] = result;

    dispatch(initTodo(temp));
    setIsDisabled(true);
  };

  const changeStatus = (selector) => {
    console.log(selector)
    var isChecked = document.querySelector(`#${selector}`).checked;
    let temp = [...allDataTask];
    console.log(isChecked);
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
            type="checkbox"
            onChange={() => changeStatus(`isDone-${indexData}`)}
            className="flex-none w-4 h-4 mt-2 mr-1 text-green-600 
            bg-gray-100 rounded border-gray-300 focus:ring-green-500 
            dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 
            dark:bg-gray-700 dark:border-gray-600"
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
              className="inline-flex mr-1 justify-center py-2 px-4 mt-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              type="button"
              onClick={() => editTask()}
            >
              Confirm
            </button>
          )}
          {!isCompleted && (
            <button
              className="inline-flex mr-1 justify-center py-2 px-4 mt-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              type="button"
              onClick={() => {
                setIsDisabled(!isDisabled);
                setItemvalue(value);
              }}
            >
              {isDisabled ? "Edit" : "Cancel"}
            </button>
          )}
          {isDisabled ? (
            <button
              className="inline-flex justify-center py-2 px-4 mt-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              type="button"
              onClick={() => deleteTask(value)}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default ListItem;
