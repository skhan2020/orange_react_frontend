import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedIn } from './redux/selectors';
import './app.css';
import LandingPage from './components/Main/Landing/index';
import MainApp from './components/Main/MainApp/index';
import Modal from './components/Main/Modal/index';
import { hot } from 'react-hot-loader/root';

// import dependencies
import './services/notification'

class App extends Component {
  render() {
   const { isLoggedIn } = this.props;
   return (
      <BrowserRouter>
        <>
          <Modal />
          <main className="main">
            <Switch>
              {!isLoggedIn && <Route path="/" component={LandingPage} />}
              {isLoggedIn && <Route path="/main" component={MainApp} />}
              {isLoggedIn && <Redirect to="/main" exact/>}
              {!isLoggedIn && <Redirect to="/" exact/>}
            </Switch>
          </main>
        </>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedIn(state),
  }
}

export default connect(mapStateToProps)(hot(App))

