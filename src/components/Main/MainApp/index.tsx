import React from 'react';
import MainSection from './MainSection/index';
import { Route, Switch, useRouteMatch, Redirect  } from 'react-router-dom';
import './index.scss';
import Navbar from './Navbar';

const MainApp = () => {
  let { path } = useRouteMatch();
  return (
  <div className="main_app">
    <Navbar />
    <Switch>
      <Route path={`${path}/:sectionID`} component={MainSection} />
      <Redirect to={`${path}/todo`} />
    </Switch>
  </div>
  )
}

export default MainApp;