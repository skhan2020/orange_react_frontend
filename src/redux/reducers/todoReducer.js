import { GET_TODO_LIST, UPDATE_TODO_LIST} from '../actions/todoActions';

export const initialState = () => ({
  isLoggedIn: true,
  loginToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWQxYWUyN2JjMDU2NjFhNmUwMjU2NzkiLCJlbWFpbCI6InRlc3QiLCJpYXQiOjE1OTA3OTk5MTYsImV4cCI6MTU5MDgwMzUxNn0.knfFTWznhkfNUwPJLYgwafi3eo9br95L1hXzxtDVBDI',
  userId: '5ed1ae27bc05661a6e025679',
  firstName: '',
  lastName: '',
  userType: '',
  showSignup: false,
})

const todoReducer = (state = initialState(), action) => {
  let payload = action.payload;
  switch (action.type) {
    case GET_TODO_LIST:
      state = {
        ...state,
        loginToken: payload.loginToken,
        tokenExpiration: payload.tokenExpiration,
        userId: payload.userId,
        isLoggedIn: payload.loginToken !== null,
      }
      break;
      case UPDATE_TODO_LIST:
        state = {
          ...state,
          loginToken: "",
          tokenExpiration: "",
          userId: null,
          isLoggedIn: false,
        }
      break;
    default:
      break
  }
  return state;
}

export default todoReducer
