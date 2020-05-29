import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getLoggedIn } from '../../redux/selectors'
import { doLogout } from '../../redux/actions/loginActions'
import orange_logo from '../../images/orange_logo.png'
import { translate } from '../../localization/service'

import './MainHeader.scss'

const MainHeader = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getLoggedIn);

  const logoutUser = () => {
    dispatch(doLogout());
  }
  const updateShowSignIn = () => {
    setShowSignIn(prevState => !prevState);
  }

  return (
    <header className="main-header">
      {!isLoggedIn && 
      <div className="header_logo">
        <img className="logo" src={orange_logo} /> 
        <div>Orange</div>
      </div>
      }
      <ul>
        {!isLoggedIn && showSignIn && <li onClick={updateShowSignIn}><NavLink to="/auth">{ translate('sign_up')}</NavLink></li>}
        {!isLoggedIn && !showSignIn && <li onClick={updateShowSignIn}><NavLink to="/landing">Home</NavLink></li>}
        {isLoggedIn && (
          <li><button onClick={logoutUser}>Logout</button></li>
        )}
      </ul>
    </header>
  )
}

export default MainHeader;