import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { initTodo } from "../../../redux/slices/todoSlices";

export const ListItem = (props) => {
  const value = props.value;
  const [isDisabled, setIsDisabled] = useState(true);
  const [itemValue, setItemvalue] = useState(value)

  const dispatch = useDispatch();
  const allDataTask = useSelector((state) => state.todo.todoList)

  const deleteTask = (value) => {
    const result = allDataTask.filter(e => e !== value)
    dispatch(initTodo(result))
    localStorage.setItem("todos", JSON.stringify(result));
  }

  const editTask = (event) => {
    let temp = [...allDataTask];
    const idx = allDataTask.indexOf(value);
    temp[idx] = itemValue;
    dispatch(initTodo(temp))
    localStorage.setItem("todos", JSON.stringify(temp));
    setIsDisabled(true)
  }

  return (
    <li>
      <input
        type="text"
        name="newTask"
        value={itemValue}
        autoComplete="off"
        disabled={isDisabled}
        onChange={(e) => setItemvalue(e.target.value)}
      ></input>
      {isDisabled
        ? null
        : <button type="button" onClick={() => editTask()}>Confirm</button>
      }
      <button
        type="button"
        onClick={() => {
          setIsDisabled(!isDisabled);
          setItemvalue(value);
        }}>
        {isDisabled ? 'Edit' : 'Cancel'}
      </button>
      {isDisabled
        ? <button type="button" onClick={() => deleteTask(value)}>Delete</button>
        : null
      }
    </li>
  );
}

export default ListItem;
