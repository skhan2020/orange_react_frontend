import React from 'react';
import DropDown from './components/DropDown';
import { CloseOutlined  } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import moment from 'moment'
import { todoListSelector } from '../../../../../redux/selectors';
import { deleteTodo } from '../../../../../services/todo';
import './index.scss';
import '../../../Auth/index.scss';

const TodosPage = () => {
  const todos = useSelector(todoListSelector);
  todos.map(item =>{
    item.projectedStartTime = moment(item.projectedStartTime).local();
    item.projectedEndTime = moment(item.projectedEndTime).local();
  })

  const handleDeleteTodo = item => {
    // SAMINA: add a confirmation for delete
    deleteTodo(item._id);
  }

  return (
    <ul className="todo_list">
      {todos.map(item => <li key={item._id}>
        {item.showDate && <div className="todo_date_label" >{item.projectedStartTime.format('MM-DD-YYYY')} </div>}
        <div className="todo_list_item">
        <span>{`${item.projectedStartTime.format('HH:mm')} - ${item.projectedEndTime.format('HH:mm')}`}</span>
          <div className="list_main">
            <div className="list_main_title">{`${item.category} - ${item.title}`}</div>
            <DropDown status={item.status} todo={item} />
            <CloseOutlined className="delete_btn" onClick={() => handleDeleteTodo(item)} />
          </div>
        </div>
      </li>)}
    </ul>
  )
}

export default TodosPage;