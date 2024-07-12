// src/redux/features/tasksSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of a Task
interface Task {
  id: number;
  objective: string;
  session_id: string;
  created_on: string;
}

// Define the structure of the tasks state
interface TasksState {
  currentTask: Task | null;
  allTasks: Task[];
}

// Initial state
const initialState: TasksState = {
  currentTask: null,
  allTasks: [],
};

// Create the slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<Task>) => {
      state.currentTask = action.payload;
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.allTasks.push(action.payload);
    },
    setAllTasks: (state, action: PayloadAction<Task[]>) => {
      state.allTasks = action.payload;
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.allTasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.allTasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.allTasks = state.allTasks.filter(task => task.id !== action.payload);
    },
  },
});

// Export actions
export const {
  setCurrentTask,
  clearCurrentTask,
  addTask,
  setAllTasks,
  updateTask,
  deleteTask,
} = tasksSlice.actions;

// Export reducer
export default tasksSlice.reducer;

// Selectors
export const selectCurrentTask = (state: { tasks: TasksState }) => state.tasks.currentTask;
export const selectAllTasks = (state: { tasks: TasksState }) => state.tasks.allTasks;