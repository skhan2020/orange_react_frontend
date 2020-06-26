import React, { useState } from 'react';
import {NavLink, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { showModal } from '../../../../redux/actions/modalActions'
import { doLogout } from '../../../../redux/actions/authActions'
import Logo from '../../../Logo/logo'
import {
  CarryOutOutlined,
  UnorderedListOutlined,
  LineChartOutlined,
  CaretRightOutlined,
  PlusOutlined,
  ExportOutlined } 
from '@ant-design/icons';
import './index.scss';

const Navbar = () => {
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

  const executeLogout = () => {
    dispatch(doLogout());
  }

  return (
    <div className="navbar">
      <ul>
        <li className="create_link" 
            onClick={selectedTab === 'todos' ? startCreatingTodos : startCreatingNotes} >
          <PlusOutlined />
        </li>
        <li >
          <NavLink className="create_link"
            onClick={() => saveSelectedTab('todos')}
            activeStyle={{ backgroundColor: "#5a5757" }}
            to={`${url}/todo`}><CarryOutOutlined /></NavLink>
        </li>
        <li >
          <NavLink className="create_link"
            onClick={() => saveSelectedTab('notes')}
            activeStyle={{ backgroundColor: "#5a5757" }}
            to={`${url}/notes`}><UnorderedListOutlined /></NavLink>
        </li>
        <li >
          <NavLink className="create_link"
            activeStyle={{ backgroundColor: "#5a5757" }}
            to={`${url}/videos`}><CaretRightOutlined /></NavLink>
        </li>
        <li >
          <NavLink className="create_link"
            activeStyle={{ backgroundColor: "#5a5757" }}
            to={`${url}/charts`}><LineChartOutlined /></NavLink>
        </li>
        <li >
          <NavLink className="create_link"
            onClick={executeLogout}
            activeStyle={{ backgroundColor: "#5a5757" }}
            to={`${url}/none`}><ExportOutlined /></NavLink>
        </li>
      </ul>
      <Logo />
    </div>)
}

export default Navbar;