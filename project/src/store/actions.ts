import {createAction} from '@reduxjs/toolkit';
import {taskType} from '../types';

export const addTask = createAction<taskType>('addTask');
export const toggleActiveStatus = createAction<string>('toggleActiveStatus');
export const setFilteredTasks = createAction<string>('setFilteredTasks');
export const setActiveFilter = createAction<string>('setActiveFilter');
export const clearTasks = createAction('clearTasks');