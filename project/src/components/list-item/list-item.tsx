import './list-item.scss';
import {useDispatch} from 'react-redux';
import {setFilteredTasks, toggleActiveStatus} from '../../store/actions';
import React from 'react';
import {taskType} from '../../types';
import {useAppSelector} from '../../hooks';
import {AnimatePresence, motion} from 'framer-motion';

type ListItemProps = {
  task: taskType;
}

function ListItem({task}: ListItemProps) {
  const dispatch = useDispatch();
  const activeFilter = useAppSelector(state => state.activeFilter);

  const onTaskClickHandle = () => {
    dispatch(toggleActiveStatus(task.id));
    dispatch(setFilteredTasks(activeFilter));
  }

  return (
    <motion.label
                  layout
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  transitionEnd= {{ display: "none" }}
                  htmlFor={task.id}
                  className={`list-item ${task.isActive ? "" : "list-item--inactive"}`}>
      <input onClick={onTaskClickHandle} type="checkbox" className="list-item__input" id={task.id} />
      {task.text}
    </motion.label>
  );
}

export default ListItem;