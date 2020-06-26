import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedIn } from './redux/selectors';
import './app.css';
import AuthPage from './components/Main/Auth';
import LandingPage from './components/Main/Landing/index';
import MainApp from './components/Main/MainApp/index';
import Modal from './components/Main/Modal/index'

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
              {isLoggedIn && <Redirect from="/auth" to="/main" exact/>}
              {!isLoggedIn && <Route path="/auth"
                  render={(props) => <AuthPage {...props} isLogin={false} />}/>}
              {!isLoggedIn && <Route path="/landing" component={LandingPage} />}
              {isLoggedIn && <Route path="/main" component={MainApp} />}
              {isLoggedIn && <Redirect to="/main" exact/>}
              {!isLoggedIn && <Redirect to="/landing" exact/>}
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

export default connect(mapStateToProps)(App)

