import {createReducer} from '@reduxjs/toolkit';
import {addTask, clearTasks, setFilteredTasks, toggleActiveStatus} from './actions';
import {taskType} from '../types';
import {FilterState} from '../constants';

export type initialStateType = {
  tasks: taskType[];
  filteredTasks: taskType[];
  activeFilter: string;
}

const initialState: initialStateType = {
  tasks: [],
  filteredTasks: [],
  activeFilter: FilterState.All,
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(addTask, (state, action) => {
      state.tasks.push(action.payload);
      state.filteredTasks.push(action.payload);
    })
    .addCase(toggleActiveStatus, (state, action) => {
      const id = action.payload;
      const taskIndex = state.tasks.findIndex((el) => el.id === id);
      state.tasks[taskIndex].isActive = !state.tasks[taskIndex].isActive;
      const filteredTasksIndex = state.filteredTasks.findIndex((el) => el.id === id);
      if (filteredTasksIndex !== -1) {
        state.filteredTasks[filteredTasksIndex].isActive = !state.filteredTasks[filteredTasksIndex].isActive;
      }
    })
    .addCase(clearTasks, state => {
      state.filteredTasks = [];
      state.tasks = [];
      state.activeFilter = FilterState.All;
    })
    .addCase(setFilteredTasks, (state, action) => {
      switch (action.payload) {
        case FilterState.All:
          state.filteredTasks = state.tasks;
          state.activeFilter = action.payload;
          break;
        case FilterState.Active:
          state.filteredTasks = state.tasks.filter(task => task.isActive);
          state.activeFilter = action.payload;
          break;
        case FilterState.Completed:
          state.filteredTasks = state.tasks.filter(task => !task.isActive);
          state.activeFilter = action.payload;
          break;
      }
    })
});

export {reducer};