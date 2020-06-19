import React, { useState } from 'react';
import { Select, Input } from 'antd'
import { updateFilteredTodoList } from '../../../../redux/actions/todoActions'
import { getFilteredTodos } from '../../../../services/todo'
import { translate } from '../../../../localization/service' 
import './index.scss';
import TodosPage from './Todos/index';
import DropDown from './Todos/components/DropDown';
import { useDispatch } from 'react-redux';

const MainSection = () => {
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

  return (
  <div className="main_section">
    <div className="header_box">
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
    <TodosPage />
  </div>)
}

export default MainSection;