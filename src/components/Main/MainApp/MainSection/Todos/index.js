import React, { useState } from 'react';
import DropDown from './components/DropDown';
import { CloseOutlined  } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import { todoListSelector } from '../../../../../redux/selectors';
import Details from './components/Details/index';
import { deleteTodo } from '../../../../../services/todo';
import { openTodoDetail } from '../../../../../redux/actions/todoActions'
import './index.scss';
import '../../../Auth/index.scss';

const TodosPage = () => {
  const [showDetail, setShowDetail] = useState(false);
  const todos = useSelector(todoListSelector);
  const dispatch = useDispatch();
  todos.map(item =>{
    item.projectedStartTime = moment(item.projectedStartTime).local();
    item.projectedEndTime = moment(item.projectedEndTime).local();
  })

  const handleDeleteTodo = item => {
    // SAMINA: add a confirmation for delete
    deleteTodo(item._id);
  }

  const openDetail = (show, item) => {
    // SAMINA: add a confirmation for delete
    setShowDetail(show);
    dispatch(openTodoDetail(item));
  }

  return (
    <div className="todo_page">
      <ul className={`todo_list ${showDetail ? 'hide_todo' : ''}`}>
        {todos.map(item => <li key={item._id}>
          {item.showDate && <div className="todo_date_label" >{item.projectedStartTime.format('MM-DD-YYYY, dddd')} </div>}
          <div className="todo_list_item">
            <span className="todo_title">{`${item.projectedStartTime.format('h:mm a')} - ${item.projectedEndTime.format('h:mm a')}`}</span>
            <div className="list_main" >
              <div onClick={() => openDetail(true, item)} className="list_main_title">{`${item.category} - ${item.title}`}</div>
              <DropDown status={item.status} todo={item} />
              <CloseOutlined className="delete_btn" onClick={() => handleDeleteTodo(item)} />
            </div>
          </div>
        </li>)}
      </ul>
      { showDetail && <Details className="todo_details" openTodoDetail={openDetail} ></Details>}
    </div>
  )
}

export default TodosPage;