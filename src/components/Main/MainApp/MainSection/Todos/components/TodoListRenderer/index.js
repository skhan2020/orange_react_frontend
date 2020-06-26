import React from 'react';
import './index.scss';
import moment from 'moment';
import DropDown from '../../components/DropDown';
import { STATUSES } from '../../../../../../../constants/index'
import { CloseOutlined  } from '@ant-design/icons';
import { updateTodoChanges } from '../../../../../../../services/todo';
import { deleteTodo } from '../../../../../../../services/todo';

const TodoListRenderer = props => {
  const todos = props.todoList && props.todoList[1].sort((a, b) => a.status - b.status);

  const changeTodoStatus = item => {
    debugger;
    item.todo.status = item.status;
    updateTodoChanges(item.todo);
  }

  const handleDeleteTodo = item => {
    // SAMINA: add a confirmation for delete
    deleteTodo(item._id);
  }
  return (
    <div className={`day_renderer ${props.todoList[0] === moment().format('MM-DD-YYYY')? 'today_renderer' : ''}`} >
      <div className="date_label" >{props.todoList[0]}</div>
      <ul className="day_renderer_list">
        {todos && todos.map(item => <div key={item._id}>
          <div className={`todo_list_item ${STATUSES.get(parseInt(item.status)) ? STATUSES.get(parseInt(item.status)).bg_css: ''}`}>
            <div className="time_container"  onClick={() => props.openDetail(true, item)} >
              <div onClick={() => props.openDetail(true, item)} className="list_main_category">{item.category}</div>
              <CloseOutlined className="delete_btn" onClick={() => handleDeleteTodo(item)} />
            </div> 
            <span className="todo_title">{`${item.projectedStartTime.format('h:mm a')} - ${item.projectedEndTime.format('h:mm a')}`}</span>
            <div onClick={() => props.openDetail(true, item)} className="list_main_title">{item.title}</div>
            <div className="status_dd"><DropDown status={item.status} todo={item} handleStatusChanges={changeTodoStatus}/></div>
          </div>
        </div>)}
        </ul>
    </div>
  )
}
export default TodoListRenderer;