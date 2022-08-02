import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as date from '../../../utils/date'
// Slices
import { initTodo } from "../../../redux/slices/todoSlices";

export const ListItem = (props) => {
  const value = props.value;
  const [isDisabled, setIsDisabled] = useState(true);
  const [itemValue, setItemvalue] = useState(value.task)

  const dispatch = useDispatch();
  const allDataTask = useSelector((state) => state.todo.todoList)

  const deleteTask = (value) => {
    const result = allDataTask.filter(e => e !== value)
    dispatch(initTodo(result))
  }

  const editTask = () => {
    let temp = [...allDataTask];
    const idx = allDataTask.findIndex(e => e.task === value.task);
    const result = {
      task: itemValue.task ? itemValue.task : itemValue,
      created_at: value.created_at,
      updated_at: date.getDateTimeNow()
    }
    if (idx !== -1) temp[idx] = result;
    console.log(temp, idx)

    dispatch(initTodo(temp))
    setIsDisabled(true)
  }

  return (
    <li className="max-w-full bg-white mt-4 py-2 px-5 border-spacing-0 drop-shadow-md hover:drop-shadow-xl rounded-2xl">
      <div className="flex justify-between">
        {
          !isDisabled &&
          <input
            className={`focus:ring-green-500 block w-3/4 focus:border-green-500 mt-1 sm:text-sm ${isDisabled ? "border-none" : "shadow-sm border border-gray-300"}  rounded-md`}
            type="text"
            name="newTask"
            value={itemValue.task}
            autoComplete="off"
            disabled={isDisabled}
            onChange={(e) => setItemvalue(e.target.value)}
          ></input>
        }
        {
          isDisabled &&
          <div>
            <p className="text-lg leading-none">{value.task} {value.isDone}</p>
            {!value.updated_at && <p className="font-thin text-sm leading-none">Created at: {value.created_at}</p>}
            {value.updated_at && <p className="font-thin text-sm leading-none">Updated at: {value.updated_at}</p>}
          </div>
        }

        <div>
        <button
            className="inline-flex mr-1 justify-center py-2 px-4 mt-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            type="button"
            onClick={() => {
              setIsDisabled(!isDisabled);
              setItemvalue(value);
            }}>
              Done
          </button>
          {isDisabled
            ? null
            : <button
              className="inline-flex mr-1 justify-center py-2 px-4 mt-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              type="button" onClick={() => editTask()}>
              Confirm
            </button>
          }
          <button
            className="inline-flex mr-1 justify-center py-2 px-4 mt-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            type="button"
            onClick={() => {
              setIsDisabled(!isDisabled);
              setItemvalue(value);
            }}>
            {isDisabled ? 'Edit' : 'Cancel'}
          </button>
          {isDisabled
            ? <button
              className="inline-flex justify-center py-2 px-4 mt-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              type="button"
              onClick={() => deleteTask(value)}>
              Delete
            </button>
            : null
          }
        </div>
      </div>
    </li >
  );
}

export default ListItem;
