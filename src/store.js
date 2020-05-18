import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger'

import mainReducer from './reducers/reducer'

const middleware = []
if (process.env.NODE_ENV !== 'production') middleware.push(logger)

const store = createStore(
  combineReducers({
    mainReducer,
  }),
  {},
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;