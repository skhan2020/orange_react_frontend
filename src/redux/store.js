import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger'

import authReducer from '../redux/reducers/authReducer';
import todoReducer from '../redux/reducers/todoReducer';
import modalReducer from '../redux/reducers/modalReducer';
import noteReducer from '../redux/reducers/noteReducer';
import videoReducer from '../redux/reducers/videoReducer';

const middleware = []
if (process.env.NODE_ENV !== 'production') middleware.push(logger)

const store = createStore(
  combineReducers({
    authReducer,
    todoReducer,
    modalReducer,
    noteReducer,
    videoReducer
  }),
  {},
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;