import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLoggedIn } from './redux/selectors'
import './css/App.scss'
import AuthPage from './components/pages/Auth'
import LandingPage from './components/Landing/index'
import TodosPage from './components/pages/Todos'
import MainHeader from './components/MainHeader/MainHeader'

class App extends Component {
  render() {
   const { isLoggedIn } = this.props;
   return (
      <BrowserRouter>
        <>
          <MainHeader />
          <main className="main">
            <Switch>
              {isLoggedIn && <Redirect from="/" to="/todos" exact/>}
              {isLoggedIn && <Redirect from="/auth" to="/todos" exact/>}
              {!isLoggedIn && <Route path="/auth"
                  render={(props) => <AuthPage {...props} isLogin={false} />}/>}
              {!isLoggedIn && <Route path="/landing" component={LandingPage} />}
              {isLoggedIn && <Route path="/todos" component={TodosPage} />}
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
    isLoggedIn: getLoggedIn(state),
  }
}

export default connect(mapStateToProps)(App)

