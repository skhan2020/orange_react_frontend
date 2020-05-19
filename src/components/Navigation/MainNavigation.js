import React from 'react'
import { NavLink } from 'react-router-dom'

import './MainNavigation.scss'

const mainNavigation = props => {
  return (
    <header className="main-navigation">
      <div className="logo">
        <h1>I am navigation</h1>
      </div> 
      <nav className="items">
        <ul>
          <li><NavLink to="/auth">Authentication</NavLink></li>
          <li><NavLink to="/todos">Todos</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default mainNavigation;