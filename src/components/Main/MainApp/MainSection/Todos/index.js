import React, { useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import DropDown from './components/DropDown';
import { useSelector, useDispatch } from 'react-redux';
import { todoListSelector } from '../../../../../redux/selectors';
import Details from './components/Details/index';
import { openTodoDetail } from '../../../../../redux/actions/todoActions'
import { Select, Input, Drawer } from 'antd'
import { updateFilteredTodoList } from '../../../../../redux/actions/todoActions'
import { getFilteredTodos } from '../../../../../services/todo'
import { translate } from '../../../../../localization/service' 
import './index.scss';
import '../../../Auth/index.scss';
import EmptyUI from '../../EmptyUI';
import TodoListRenderer from './components/TodoListRenderer';

const TodosPage = () => {
  const [showDetail, setShowDetail] = useState(false);
  const todos = useSelector(todoListSelector);
  const [todo, setTodo ] = useState();
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

  const openDetail = (show, item) => {
    // SAMINA: add a confirmation for delete
    setShowDetail(show);
    setTodo(item);
    dispatch(openTodoDetail(item));
  }

  const onClose = () => {
    setShowDetail(false);
  }
  return (
    <>
      <div className={`header_box ${showDetail ? 'hide_todo' : ''}`}>
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
      <div className="todo_page">
        { todos.length === 0 ? <EmptyUI message={translate('empty_todo')} /> :
          <CarouselProvider
            naturalSlideWidth={400}
            naturalSlideHeight={125}
            totalSlides={todos.length}
            className="carousal"
            visibleSlides={5}
            step={1}
            isIntrinsicHeight
          >
            <div className="btn_box">
              <ButtonNext className="carousal_btn">Next</ButtonNext>
              <ButtonBack className="carousal_btn">Back</ButtonBack>
            </div>
            <Slider>
              {todos.map((item, key) => 
                <Slide index={key}><TodoListRenderer todoList={item} openDetail={openDetail}/></Slide>
              ) }
            </Slider>
          </CarouselProvider> }
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={showDetail}
            width={500}
          >
          <div className="detail_box">
            <Details openTodoDetail={openDetail} todo={todo}></Details>
          </div>
        </Drawer>
      </div>
      </>
  )
}

export default TodosPage;