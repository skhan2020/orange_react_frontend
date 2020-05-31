import React from 'react';
import { Input } from 'antd'
import Detail from './Detail/index'
import './index.scss';
import TodosPage from './Todos/index';

const MainSection = () => {
  const { Search } = Input;

  return (
  <div className="main_section">
    <Search
      className="search_input"
      placeholder="input search text"
      onSearch={value => console.log(value)}
      enterButton />
    <TodosPage />
    <Detail />
  </div>)
}

export default MainSection;