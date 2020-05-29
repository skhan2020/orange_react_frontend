import { SET_LOGIN_TOKEN, CLEAR_LOGIN, SHOW_SIGNUP } from '../actions/loginActions';

export const initialState = () => ({
  isLoggedIn: false,
  loginToken: '',
  userId: null,
  firstName: '',
  lastName: '',
  userType: '',
  showSignup: true,
  login: () => {},
  logout: () => {},
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
