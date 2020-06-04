import React from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { STATUSES, ON_HOLD } from '../../../../../constants/index';
import store from '../../../../../redux/store';
import { todoListSelector } from '../../../../../redux/selectors';
import './index.scss';
import '../../../Auth/index.scss';

const TodosPage = () => {
  const todos = useSelector(todoListSelector);

  return (
    <ul className="todo_list">
      {todos.map(item => <li key={item._id}>
        <div className="todo_list_item">
          <span>10:20 PM</span>
          <div className="list_main">
            <div className="list_main_title">{item.title}</div>
            <Select name="type" defaultValue={ON_HOLD} value={item.status}>
                {STATUSES.map((item, key) => <Select.Option key={key} value={item.value}>{item.label}</Select.Option>)}
            </Select>
            <div className="list_main_end">{item.startTime}</div>
            <div className="list_main_status">{item.category}</div>
          </div>
        </div>
      </li>)}
    </ul>
  )
}

export default TodosPage;