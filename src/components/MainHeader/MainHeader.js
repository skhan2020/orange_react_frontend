import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isLoggedIn, getShowSignup } from '../../redux/selectors'
import { doLogout, setShowSignUp } from '../../redux/actions/authActions'
import orange_logo from '../../images/orange_logo.png'
import { translate } from '../../localization/service'

import './MainHeader.scss'

const MainHeader = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(isLoggedIn);
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
        {!loggedIn && showSignup && <li onClick={updateShowSignUp}><NavLink to="/auth">{ translate('sign_up')}</NavLink></li>}
        {!loggedIn && !showSignup && <li onClick={updateShowSignUp}><NavLink to="/landing">Home</NavLink></li>}
        {loggedIn && (
          <li><button onClick={logoutUser}>Logout</button></li>
        )}
      </ul>
    </header>
  )
}

export default MainHeader;