import { configureStore } from '@reduxjs/toolkit'

// Import Store
import todoSlices from './slices/todoSlices.js' 

export default configureStore({
  reducer: {
    todo: todoSlices
  },
})