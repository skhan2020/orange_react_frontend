export const initialState = () => ({
  isLoggedIn: true,
  loginToken: '',
  userId: null,
  login: () => {},
  logout: () => {},
})

const reducer = (state = initialState(), action) => {
  let payload = action.payload
  switch (action.type) {
    case 'SET_LOGIN_TOKEN':
      state = {
        ...state,
        loginToken: payload.loginToken,
        tokenExpiration: payload.tokenExpiration,
        userId: payload.userId,
        isLoggedIn: payload.loginToken !== null,
      }
      break;
      case 'CLEAR_LOGIN':
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
  return state
}

export default reducer
