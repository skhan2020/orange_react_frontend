import { SET_LOGIN_TOKEN, CLEAR_LOGIN, SHOW_SIGNUP } from '../actions/loginActions';

export const initialState = () => ({
  isLoggedIn: true,
  loginToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWQxYWUyN2JjMDU2NjFhNmUwMjU2NzkiLCJlbWFpbCI6InRlc3QiLCJpYXQiOjE1OTA3OTk5MTYsImV4cCI6MTU5MDgwMzUxNn0.knfFTWznhkfNUwPJLYgwafi3eo9br95L1hXzxtDVBDI',
  userId: '5ed1ae27bc05661a6e025679',
  firstName: '',
  lastName: '',
  userType: '',
  showSignup: false,
})

const reducer = (state = initialState(), action) => {
  let payload = action.payload;
  switch (action.type) {
    case SET_LOGIN_TOKEN:
      state = {
        ...state,
        loginToken: payload.loginToken,
        tokenExpiration: payload.tokenExpiration,
        userId: payload.userId,
        isLoggedIn: payload.loginToken !== null,
      }
      break;
      case CLEAR_LOGIN:
        state = {
          ...state,
          loginToken: "",
          tokenExpiration: "",
          userId: null,
          isLoggedIn: false,
        }
      break;
      case SHOW_SIGNUP:
        if (payload.userInfo) {
          state = {
            ...state,
            showSignup: payload.showSignup,
            userId: payload.userInfo._id || state.userId,
            firstName: payload.userInfo.firstName || state.firstName,
            lastName: payload.userInfo.lastName || state.lastName,
            userType: payload.userInfo.userType || state.userType,
          }
        } else {
        state = {
          ...state,
          showSignup: payload.showSignup,
          userId: payload.userId || state.userId,
        }}
      break;
    default:
      break
  }
  return state;
}

export default reducer
