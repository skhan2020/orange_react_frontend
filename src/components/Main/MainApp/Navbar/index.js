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

  const startCreatingItems = () => {
    if (selectedTab !== 'none') {
      dispatch(showModal(selectedTab));
    }
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
            onClick={startCreatingItems} >
          <PlusOutlined />
        </li>
        <li >
          <NavLink className="create_link"
            onClick={() => saveSelectedTab('todos')}
            activeStyle={{ backgroundColor: "rgb(90, 59, 16)", border: "#b59d9d 1px solid" }}
            to={`${url}/todo`}><CarryOutOutlined /></NavLink>
        </li>
        <li >
          <NavLink className="create_link"
            onClick={() => saveSelectedTab('notes')}
            activeStyle={{ backgroundColor: "rgb(90, 59, 16)", border: "#b59d9d 1px solid" }}
            to={`${url}/notes`}><UnorderedListOutlined /></NavLink>
        </li>
        <li >
          <NavLink className="create_link"
            onClick={() => saveSelectedTab('video')}
            activeStyle={{ backgroundColor: "rgb(90, 59, 16)", border: "#b59d9d 1px solid" }}
            to={`${url}/videos`}><CaretRightOutlined /></NavLink>
        </li>
        <li >
          <NavLink className="create_link"
            onClick={() => saveSelectedTab('none')}
            activeStyle={{ backgroundColor: "rgb(90, 59, 16)", border: "#b59d9d 1px solid" }}
            to={`${url}/charts`}><LineChartOutlined /></NavLink>
        </li>
        <li >
          <NavLink className="create_link"
            onClick={executeLogout}
            activeStyle={{ backgroundColor: "rgb(90, 59, 16)", border: "#b59d9d 1px solid" }}
            to={`${url}/none`}><ExportOutlined /></NavLink>
        </li>
      </ul>
      <Logo />
    </div>)
}

export default Navbar;