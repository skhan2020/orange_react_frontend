// @ts-nocheck
import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import OrDropDown from '../OrDropDown';
import { STATUSES } from '../../../../../../../constants/index'
import { CloseOutlined  } from '@ant-design/icons';
import { updateTodoChanges } from '../../../../../../../services/todo';
import { deleteTodo } from '../../../../../../../services/todo';
import { openTodoDetail } from '../../../../../../../redux/actions/todoActions'
import './index.scss';
import { Todo } from '../../../../../../../redux/reducers/todoReducer';

// @ts-ignore
const TodoListRenderer = props => {
  const dispatch = useDispatch();
  const todos = props.todoList && props.todoList[1];

// @ts-ignore
  const changeTodoStatus = (item) => {
    item.todo.status = item.status;
    updateTodoChanges(item.todo);
  }

// @ts-ignore
  const handleDeleteTodo = (item) => {
    deleteTodo(item._id);
  }

// @ts-ignore
  const openDetail = (item) => {
    // SAMINA: add a confirmation for delete
    dispatch(openTodoDetail(item));
  }

  return (
    <div className={`day_renderer ${props.todoList[0] === moment().format('MM-DD-YYYY')? 'today_renderer' : ''}`} >
      <div className="date_label" >{props.todoList[0]}</div>
      <ul className="day_renderer_list">
        {
          todos && todos.map((item: Todo ) => <div key={item._id}>
          <div className={`todo_list_item ${STATUSES.get(parseInt(item.status)) ? STATUSES.get(parseInt(item.status)).bg_css: ''}`}>
            <div className="time_container">
              <div onClick={() => openDetail(item)} className="list_main_category">{item.category}</div>
              <CloseOutlined className="delete_btn" onClick={() => handleDeleteTodo(item)} />
            </div> 
            <span className="todo_title" onClick={() => openDetail(item)} >{`${item.projectedStartTime.format('h:mm a')} - ${item.projectedEndTime.format('h:mm a')}`}</span>
            <div className="list_main_title" onClick={() => openDetail(item)} >{item.title}</div>
            <div className="status_dd"><OrDropDown status={item.status} todo={item} handleStatusChanges={changeTodoStatus}/></div>
          </div>
        </div>)}
        </ul>
    </div>
  )
}
export default TodoListRenderer;