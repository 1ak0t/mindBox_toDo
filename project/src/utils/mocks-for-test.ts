import {faker, fakerRU} from '@faker-js/faker';
import {taskType} from '../types';
import {FilterState} from '../constants';
import {initialStateType} from '../store/reducer';

export const createRandomTask = (): taskType => {
  return {
    id: faker.string.uuid(),
    text: fakerRU.lorem.words(),
    isActive: faker.datatype.boolean()
  }
}

export const createRandomTasks = (): taskType[] => {
  return faker.helpers.multiple(createRandomTask, {count: 10});
}

export const createRandomState = (): initialStateType => {
  return {
  tasks: createRandomTasks(),
  filteredTasks: [],
  activeFilter: faker.helpers.enumValue(FilterState)
  };
};

export const initialStateMock: initialStateType = {
    tasks: [],
    filteredTasks: [],
    activeFilter: FilterState.All
};