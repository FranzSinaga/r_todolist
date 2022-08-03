import { createSlice } from '@reduxjs/toolkit'
import { setItem } from '../../utils/storage'
import * as date from '../../utils/date';

const initialState = {
  todoList: [],
  isGetByLocalStorage: true,
}

export const todoSlices = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    initTodo: (state, value) => {
      state.todoList = value.payload
      setItem("todos", JSON.stringify(state.todoList));
    },
    addTodo: (state, value) => {
      console.log(date.getDateTimeNow())
      const data = {
        task: value.payload,
        created_at: date.getDateTimeNow(),
        isDone: false
      }
      state.todoList.push(data);
      localStorage.setItem("todos", JSON.stringify(state.todoList));
    },
    getIncompletedTask: (state) => {
      return state.todoList
    }
  },
})

// Action creators are generated for each case reducer function
export const { initTodo, addTodo, getIncompletedTask } = todoSlices.actions

export default todoSlices.reducer