import './list.scss';
import ListItem from '../list-item/list-item';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addTask, clearTasks, setFilteredTasks} from '../../store/actions';
import React, {useRef, useState} from 'react';
import {nanoid} from 'nanoid';
import {FilterState} from '../../constants';
import {AnimatePresence} from 'framer-motion';

function List() {
  const tasks = useAppSelector(state => state.tasks);
  const filteredTasks = useAppSelector(state => state.filteredTasks);
  const activeFilter = useAppSelector(state => state.activeFilter);
  const dispatch = useAppDispatch();
  const [taskText, setTaskText] = useState('');

  const filterAll = useRef<HTMLButtonElement>(null);
  const filterActive = useRef<HTMLButtonElement>(null);
  const filterCompleted = useRef<HTMLButtonElement>(null);

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target?.value);
  }
  const addTaskSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskText && taskText !== "") {
      dispatch(addTask({
        id: nanoid(),
        text: taskText,
        isActive: true
      }));
    }
    setTaskText('');
    dispatch(setFilteredTasks(activeFilter));
  }

  const clickFilterHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => {
    switch (type) {
      case FilterState.All:
        event.currentTarget.classList.add('list__filter-button--active');
        filterActive.current?.classList.remove('list__filter-button--active');
        filterCompleted.current?.classList.remove('list__filter-button--active');
        dispatch(setFilteredTasks(FilterState.All));
        break;
      case FilterState.Active:
        event.currentTarget.classList.add('list__filter-button--active');
        filterAll.current?.classList.remove('list__filter-button--active');
        filterCompleted.current?.classList.remove('list__filter-button--active');
        dispatch(setFilteredTasks(FilterState.Active));
        break;
      case FilterState.Completed:
        event.currentTarget.classList.add('list__filter-button--active');
        filterAll.current?.classList.remove('list__filter-button--active');
        filterActive.current?.classList.remove('list__filter-button--active');
        dispatch(setFilteredTasks(FilterState.Completed));
        break;
    }
  }

  const onClearButtonHandler = () => {
    dispatch(clearTasks());
  }

  return(
    <>
      <form className="add" onSubmit={addTaskSubmit}>
        <label htmlFor="" className="add__label">
          <input value={taskText} onChange={onChangeInputHandler} type="text" className="add__input" name="text" placeholder="What needs to be done?" autoFocus />
        </label>
        <input type="submit" className="add__send" value="+"/>
      </form>
      <section className="list">
        <AnimatePresence mode="wait">
            {filteredTasks.map(task  => <ListItem task={task} key={task.id} />)}
        </AnimatePresence>
        {tasks.length > 0 &&
          <div className="list__filter">
            <span className="list__item-left">{tasks.filter((task) => task.isActive).length} items left</span>
            <div className="list__buttons">
              <button ref={filterAll} onClick={(event) => clickFilterHandler(event, FilterState.All)} className="list__filter-button list__filter-button--active">All</button>
              <button ref={filterActive} onClick={(event) => clickFilterHandler(event, FilterState.Active)} className="list__filter-button">Active</button>
              <button ref={filterCompleted} onClick={(event) => clickFilterHandler(event, FilterState.Completed)} className="list__filter-button">Completed</button>
            </div>
            <button onClick={onClearButtonHandler} className="list__filter-button list__filter-button--clear">Clear list</button>
          </div>
        }
      </section>
    </>
  );
}

export default List;