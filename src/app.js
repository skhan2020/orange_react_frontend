import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import './css/App.scss'
import AuthPage from './pages/Auth'
import TodosPage from './pages/Todos'
import MainNavigation from './components/Navigation/MainNavigation'
import {
  setMessageFromBackend,
  startLoadingMessageFromBackend,
  stopLoadingMessageFromBackend,
} from './actions/actions'
import { getMessage, isCallingBackend, wasLastCallSuccessful } from './selectors/selectors'

class App extends Component {
  render() {
   return (
      <BrowserRouter>
        <>
          <MainNavigation />
          <main className="main">
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route path="/auth" component={AuthPage} />
              <Route path="/todos" component={TodosPage} />
            </Switch>
          </main>
        </>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    wasLastCallSuccessful: wasLastCallSuccessful(state),
    isCallingBackend: isCallingBackend(state),
    message: getMessage(state),
  }
}

const mapDispatchToProps = () => {
  return {
    setMessageFromBackend,
    startLoadingMessageFromBackend,
    stopLoadingMessageFromBackend,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
