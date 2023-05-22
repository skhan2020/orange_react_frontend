import React, { useState } from 'react'
import { translate } from '../../../localization/service';
import { getUserId,  getUserFullName } from '../../../redux/selectors/index'
import MainHeader from '../../MainHeader/MainHeader'
import { useSelector} from 'react-redux';
import Logo from '../../Logo/logo'
import './index.scss'
import AuthPage from '../Auth';

const Landing = () => {
  const [showSignin, setShowSignin] = useState(true);
  const userId = useSelector(getUserId);
  const { firstName, lastName } = useSelector(getUserFullName);

// @ts-ignore
  const toggleSignIn = value => {
    setShowSignin(value);
  }

  return (
    <>
    <MainHeader />
      <div className="main_container">
        <div className="container">
          <div className="logo_box">
            <div className="intro">{translate('main_header')}</div>
            <Logo />
          </div>
          <div  className="main_content">{translate('main_content')}</div>
          <div  className="main_content">{translate('main_content2')}</div>
        </div>
        <div className="sign_up_box">
          <div className="inner_sign_up_box" >
          { firstName && lastName && <div className="welcome_label">{translate("sign_up_success", {
              name: `${firstName} ${lastName}`,
            })}</div>}
            <div className="sign_in_label_box">
              <div className="sign_in">{showSignin || userId ? translate('sign_in'):translate('sign_up')}</div>
            </div>
            <AuthPage isLogin={showSignin} toggleSignIn={toggleSignIn}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing;