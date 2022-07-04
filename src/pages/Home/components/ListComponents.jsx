import React, { useState } from "react";

export const ListItem = (props) => {
  const value = props.value;
  const allDataTask = JSON.parse(localStorage.getItem('todos'));
  const [isDisabled, setIsDisabled] = useState(true);
  const [itemValue, setItemvalue] = useState(value)
  const deleteTask = (value) => {
    const delTask = allDataTask.filter(e => {
      return e !== value
    })
    localStorage.setItem("todos", JSON.stringify(delTask));
    window.location.reload(); // reload untuk sementara
  }

  const editTask = () => {
    let temp = [...allDataTask];
    const idx = allDataTask.indexOf(value)
    console.log(idx)
    temp[idx] = itemValue;
    console.log(temp)
    localStorage.setItem("todos", JSON.stringify(temp));
    setIsDisabled(true)
    window.location.reload();
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
