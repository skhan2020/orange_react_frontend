import React, { useState } from 'react';
import { Select, Input } from 'antd'
import DropDown from '../../components/DropDown';
import { updateFilterStatus } from '../../../../../../../redux/actions/todoActions'
import { getFilteredTodos } from '../../../../../../../services/todo'
import { useDispatch } from 'react-redux';
import { translate } from '../../../../../../../localization/service' 
import './index.scss'

const TodoHeader = React.memo(() => {
  const { Search } = Input;
  const { Option } = Select;
  const dispatch = useDispatch();

  const [searchCategory, setSearchCategory] = useState('status');
  const [searchValue, setSearchValue] = useState(null);

  const onSearch = () => {
    // call graphql search api
    if (searchCategory && searchValue) {
      dispatch(updateFilterStatus(true));
      getFilteredTodos(searchCategory, searchValue );
    }
  }

  const onDropdownChange = value => {
    if (searchValue) {
      clearSearch();
    }
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
    dispatch(updateFilterStatus(false));
  }


  return (
    <div className={`header_box`}>
      <Input.Group >
        <div className="filter_label" >{translate("filter_by")}</div>
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
  )
})

export default TodoHeader;