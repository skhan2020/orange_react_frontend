import React, { useState } from 'react';
import {NavLink, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { showModal } from '../../../../redux/actions/modalActions'
import {
  CarryOutOutlined,
  UnorderedListOutlined,
  LineChartOutlined,
  CaretRightOutlined,
  PlusOutlined } 
from '@ant-design/icons';
import './index.scss';

const Spine = () => {
  const [selectedTab, setSelectedTab] = useState('todos');
  const dispatch = useDispatch();
  let { url } = useRouteMatch();

  const startCreatingTodos = () => {
    dispatch(showModal('createTodo'));
  }  
  
  const startCreatingNotes = () => {
    dispatch(showModal('createNotes'));
  }

  const saveSelectedTab = type => {
     setSelectedTab(type);
  }

  return (
    <div className="spine">
      <ul>
        <li className="create_link" 
            onClick={selectedTab === 'todos' ? startCreatingTodos : startCreatingNotes} >
          <PlusOutlined />
        </li>
        <li >
          <NavLink className="create_link"
            onClick={() => saveSelectedTab('todos')}
            activeStyle={{ backgroundColor: "rgb(247, 221, 108)" }}
            to={`${url}/todo`}><CarryOutOutlined /></NavLink>
        </li>
        <li >
          <NavLink className="create_link"
            onClick={() => saveSelectedTab('notes')}
            activeStyle={{ backgroundColor: "rgb(247, 221, 108)" }}
            to={`${url}/notes`}><UnorderedListOutlined /></NavLink>
        </li>
        <li >
          <NavLink className="create_link"
            activeStyle={{ backgroundColor: "rgb(247, 221, 108)" }}
            to={`${url}/videos`}><CaretRightOutlined /></NavLink>
        </li>
        <li >
          <NavLink className="create_link"
            activeStyle={{ backgroundColor: "rgb(247, 221, 108)" }}
            to={`${url}/charts`}><LineChartOutlined /></NavLink>
        </li>
      </ul>
    </div>)
}

export default Spine;