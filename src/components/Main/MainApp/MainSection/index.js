import React from 'react';
import { Input } from 'antd'
import { translate } from '../../../../localization/service' 
// import Detail from './Detail/index'
import './index.scss';
import TodosPage from './Todos/index';

const MainSection = () => {
  const { Search } = Input;

  return (
  <div className="main_section">
    <div className="header_box">
      <div className="page_heading">TODO</div>
      <Search
        className="search_input"
        placeholder={translate('enter_search')}
        onSearch={value => console.log(value)}
        enterButton />
    </div>
    <TodosPage />
    {/* <Detail /> */}
  </div>)
}

export default MainSection;