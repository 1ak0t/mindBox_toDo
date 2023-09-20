import {reducer} from './reducer';
import {addTask, clearTasks, setFilteredTasks, toggleActiveStatus} from './actions';
import {FilterState} from '../constants';
import {createRandomTask, createRandomState} from '../utils/mocks-for-test';
import {faker} from '@faker-js/faker';

describe('Reducer tests', () => {
  it('should clear tasks', () => {
    expect(reducer(createRandomState(), clearTasks()))
      .toEqual({
        tasks: [],
        filteredTasks: [],
        activeFilter: FilterState.All,
      })
  });

  it('should added task',  () => {
    const newTask = createRandomTask();
    const state = createRandomState();
    const result = reducer(state, addTask(newTask));

    expect(result.tasks).toContain(newTask);
    expect(result.filteredTasks).toContain(newTask);
  });

  it('should toggle task status',  () => {
    const state = createRandomState();
    const task = state.tasks[Math.floor(Math.random()*state.tasks.length)];
    const result = reducer(state, toggleActiveStatus(task.id));

    expect(result.tasks.find(taskRes => taskRes.id === task.id)?.isActive)
      .toEqual(!task.isActive);

    if (result.filteredTasks.find(taskRes => taskRes.id === task.id)){
      expect(result.filteredTasks.find(taskRes => taskRes.id === task.id)?.isActive)
        .toEqual(!task.isActive);
    }
  });

  it('should filter tasks',  () =>  {
    const state = createRandomState();

    const filteredTasksAll = reducer(state, setFilteredTasks(FilterState.All));
    const filteredTasksActive = reducer(state, setFilteredTasks(FilterState.Active));
    const filteredTasksCompleted = reducer(state, setFilteredTasks(FilterState.Completed));

    expect(filteredTasksAll.filteredTasks)
      .toEqual(state.tasks);

    expect(filteredTasksActive.filteredTasks)
      .toEqual(state.tasks.filter(task => task.isActive));

    expect(filteredTasksCompleted.filteredTasks)
      .toEqual(state.tasks.filter(task => !task.isActive));
  });

  it('should set active filter', () => {
    const state = createRandomState();
    const filterName = faker.helpers.enumValue(FilterState);

    const result = reducer(state, setFilteredTasks(filterName));

    expect(result.activeFilter)
      .toEqual(filterName);
  });
})