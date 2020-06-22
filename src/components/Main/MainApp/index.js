import React from 'react';
import Spine from './Spine/index';
import MainSection from './MainSection/index';
import { Route, Switch,  } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import './index.scss';

const MainApp = () => {
  let { path } = useRouteMatch();
  return (
  <div className="main_app">
    <Spine />
    <Switch>
      <Route path={`${path}/:sectionID`} component={MainSection} />
    </Switch>
  </div>
  )
}

export default MainApp;