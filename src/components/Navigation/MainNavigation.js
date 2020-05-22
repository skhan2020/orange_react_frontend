import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getLoggedIn } from '../../redux/selectors'
import { doLogout } from '../../redux/actions/loginActions'

import './MainNavigation.scss'

const MainNavigation = () => {
  const dispatch  = useDispatch();
  const isLoggedIn = useSelector(getLoggedIn);

  const logoutUser = () => {
    dispatch(doLogout());
  }

  return (
    <header className="main-navigation">
      <div className="logo">
        <h1>I am navigation</h1>
      </div> 
      <nav className="items">
        <ul>
          {!isLoggedIn && <li><NavLink to="/auth">Authentication</NavLink></li>}
          {isLoggedIn && (
          <>
            <li><NavLink to="/todos">Todos</NavLink></li>
            <li><button onClick={logoutUser}>Logout</button></li>
          </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation;