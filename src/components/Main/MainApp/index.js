import React from 'react';
import Spine from './Spine/index';
import MainSection from './MainSection/index';
import './index.scss';

const MainApp = () => {
  return (
  <div className="main_app">
    <Spine />
    <MainSection />
  </div>
  )
}

export default MainApp;