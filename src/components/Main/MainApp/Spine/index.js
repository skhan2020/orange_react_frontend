import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { showModal } from '../../../../redux/actions/modalActions'

import { CarryOutOutlined,
  UnorderedListOutlined,
  LineChartOutlined,
  CaretRightOutlined,
  PlusOutlined } from '@ant-design/icons';
import './index.scss';

const Spine = () => {
  const dispatch = useDispatch();
  const [activeList, setActiveList] = useState(
  {  todo: true, 
     charts: false, 
     notes: false, 
     video: false, 
     add: false});

  const startCreatingTodos = () => {
    dispatch(showModal('createTodo'));
  }

  const setActive = value => {
    const list = activeList;
    activeList[value] = !activeList[value];
    setActiveList(list);
  }
  return (
  <div className="spine">
    <ul>
      <li className={activeList.add ? 'activeButton' : ''}  onClick={startCreatingTodos} ><PlusOutlined /></li>
      <li className={activeList.todo ? 'activeButton' : ''} onClick={() => setActive('todo')}><CarryOutOutlined /></li>
      <li className={activeList.notes ? 'activeButton' : ''} ><UnorderedListOutlined /></li>
      <li className={activeList.videos ? 'activeButton' : ''} ><CaretRightOutlined /></li>
      <li className={activeList.charts ? 'activeButton' : ''} ><LineChartOutlined/></li>
    </ul>
  </div>)
}

export default Spine;