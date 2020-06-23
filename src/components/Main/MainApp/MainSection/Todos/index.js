import React, { useState } from 'react';
import DropDown from './components/DropDown';
import { CloseOutlined  } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { todoListSelector } from '../../../../../redux/selectors';
import Details from './components/Details/index';
import { deleteTodo, updateTodoChanges } from '../../../../../services/todo';
import { openTodoDetail } from '../../../../../redux/actions/todoActions'
import { Select, Input } from 'antd'
import { updateFilteredTodoList } from '../../../../../redux/actions/todoActions'
import { getFilteredTodos } from '../../../../../services/todo'
import { translate } from '../../../../../localization/service' 
import './index.scss';
import '../../../Auth/index.scss';
import EmptyUI from '../../EmptyUI';

const TodosPage = () => {
  const [showDetail, setShowDetail] = useState(false);
  const todos = useSelector(todoListSelector);
  const dispatch = useDispatch();
  const { Search } = Input;
  const { Option } = Select;

  const [searchCategory, setSearchCategory] = useState('status');
  const [searchValue, setSearchValue] = useState(null);

  const onSearch = () => {
    // call graphql search api
    if (searchCategory && searchValue) {
      getFilteredTodos(searchCategory, searchValue );
    }
  }

  const onDropdownChange = value => {
    clearSearch();
    setSearchCategory(value);
  }

  const onSearchChange = item => {
    setSearchValue(item.currentTarget.value);
  }

  const onStatusChange = value => {
    setSearchValue(value.status);
    getFilteredTodos(searchCategory, value.status.toString() );
  }

  const clearSearch = () => {
    setSearchValue(null);
    setSearchCategory('status');
    dispatch(updateFilteredTodoList([]));
  }

  const handleDeleteTodo = item => {
    // SAMINA: add a confirmation for delete
    deleteTodo(item._id);
  }

  const openDetail = (show, item) => {
    // SAMINA: add a confirmation for delete
    setShowDetail(show);
    dispatch(openTodoDetail(item));
  }

  const changeTodoStatus = item => {
    item.todo.status = item.status;
    updateTodoChanges(item.todo);
  }

  return (
    <>
      <div className={`header_box ${showDetail ? 'hide_todo' : ''}`}>
        <div className="page_heading">TODO</div>
        <Input.Group >
          <div className="filter_label" >Filter By:</div>
          <Select defaultValue={searchCategory}
            className="select_dropdown"
            value={searchCategory}
            onChange={onDropdownChange}>
            <Option value="status">Status</Option>
            <Option value="tags">Tags</Option>
            <Option value="title">Title</Option>
            <Option value="category">Category</Option>
          </Select>
          { searchCategory === 'status' ?
            <DropDown handleStatusChanges={onStatusChange} status={searchValue} />  :
            <Search
              className="search_input"
              onChange={onSearchChange}
              value={searchValue}
              placeholder={translate('enter_search', {item: searchCategory})}
              onSearch={onSearch}
              enterButton />
            }
            <div className="clear_btn" onClick={clearSearch}>{searchValue? 'Clear' : ''}</div>
        </Input.Group>
      </div>
      <div className="todo_page">
        { todos.length === 0 ? <EmptyUI message={translate('empty_todo')} /> :
        <ul className={`todo_list ${showDetail ? 'hide_todo' : ''}`}>
          {todos.map(item => <li key={item._id}>
            {item.showDate && <div className="todo_date_label" >{item.projectedStartTime.format('MM-DD-YYYY, dddd')} </div>}
            <div className="todo_list_item">
              <span className="todo_title">{`${item.projectedStartTime.format('h:mm a')} - ${item.projectedEndTime.format('h:mm a')}`}</span>
              <div className="list_main" >
                <div onClick={() => openDetail(true, item)} className="list_main_title">{`${item.category} - ${item.title}`}</div>
                <DropDown status={item.status} todo={item} handleStatusChanges={changeTodoStatus} />
                <CloseOutlined className="delete_btn" onClick={() => handleDeleteTodo(item)} />
              </div>
            </div>
          </li>)}
          </ul> }
        { showDetail && <Details className="todo_details" openTodoDetail={openDetail} ></Details>}
      </div>
      </>
  )
}

export default TodosPage;