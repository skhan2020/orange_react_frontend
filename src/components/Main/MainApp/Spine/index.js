import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { showModal } from '../../../../redux/actions/modalAction'

import { CarryOutOutlined,
  UnorderedListOutlined,
  LineChartOutlined,
  CaretRightOutlined,
  PlusOutlined } from '@ant-design/icons';
import './index.scss';

const Spine = () => {
  const dispatch = useDispatch();
  const [activeList, setActiveList] = useState(
  {  todo: false, 
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
      <li className={activeList.todo ? 'active' : ''} onClick={() => setActive('todo')}><CarryOutOutlined /></li>
      <li className={activeList.notes ? 'active' : ''} ><UnorderedListOutlined /></li>
      <li className={activeList.videos ? 'active' : ''} ><CaretRightOutlined /></li>
      <li className={activeList.charts ? 'active' : ''} ><LineChartOutlined/></li>
      <li className={activeList.add ? 'active' : ''}  onClick={startCreatingTodos} ><PlusOutlined /></li>
    </ul>
  </div>)
}

export default Spine;