import { createSlice } from '@reduxjs/toolkit'
import { setItem } from '../../utils/storage'

const initialState = {
  todoList: [],
  isGetByLocalStorage: true
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
      state.todoList.push(value.payload);
      localStorage.setItem("todos", JSON.stringify(state.todoList));
    }
  },
})

// Action creators are generated for each case reducer function
export const { initTodo, addTodo } = todoSlices.actions

export default todoSlices.reducer