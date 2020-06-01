import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getLoggedIn, getShowSignup } from '../../redux/selectors'
import { doLogout, setShowSignUp } from '../../redux/actions/authActions'
import orange_logo from '../../images/orange_logo.png'
import { translate } from '../../localization/service'

import './MainHeader.scss'

const MainHeader = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getLoggedIn);
  const showSignup = useSelector(getShowSignup);

  const logoutUser = () => {
    dispatch(doLogout());
  }
  const updateShowSignUp = () => {
    dispatch(setShowSignUp({showSignup: !showSignup}));
  }

  return (
    <header className="main-header">
      <div className="header_logo">
        <img className="logo" src={orange_logo} alt="OrangeLogo"/> 
        <div>Orange</div>
      </div>
      <ul>
        {!isLoggedIn && showSignup && <li onClick={updateShowSignUp}><NavLink to="/auth">{ translate('sign_up')}</NavLink></li>}
        {!isLoggedIn && !showSignup && <li onClick={updateShowSignUp}><NavLink to="/landing">Home</NavLink></li>}
        {isLoggedIn && (
          <li><button onClick={logoutUser}>Logout</button></li>
        )}
      </ul>
    </header>
  )
}

export default MainHeader;