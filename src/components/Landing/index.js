import React from 'react'
import { translate } from '../../localization/service';
import orange_logo from '../../images/orange_logo.png'
import './index.scss'
import AuthPage from '../pages/Auth';

const Landing = () => {
  return (
    <div className="main_container">
      <div className="container">
        <div className="logo_box">
          <img src={orange_logo} className="logo" />
          <div className="intro">{translate('main_header')}</div>
        </div>
        <div >{translate('main_content')}</div>
        <div >{translate('main_content2')}</div>
      </div>
      <div className="sign_up_box">
        <div className="content3">{translate('main_content3')}</div>
        <AuthPage isLogin={true}/>
      </div>
    </div>
  )
}

export default Landing;