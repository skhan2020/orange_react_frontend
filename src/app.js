import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLoggedIn } from './redux/selectors'
import './css/App.scss'
import AuthPage from './pages/Auth'
import TodosPage from './pages/Todos'
import MainNavigation from './components/Navigation/MainNavigation'

class App extends Component {
  render() {
   const { isLoggedIn } = this.props;
   return (
      <BrowserRouter>
        <>
          <MainNavigation />
          <main className="main">
            <Switch>
              {isLoggedIn && <Redirect from="/" to="/todos" exact/>}
              {isLoggedIn && <Redirect from="/auth" to="/todos" exact/>}
              {!isLoggedIn && <Route path="/auth" component={AuthPage} />}
              {isLoggedIn && <Route path="/todos" component={TodosPage} />}
              {!isLoggedIn && <Redirect to="/auth" exact/>}
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

