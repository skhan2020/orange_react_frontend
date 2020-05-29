const getMainReducer = (state) => {
  return state.reducer;
}

export const getLoggedIn = (state) => {
  return getMainReducer(state).isLoggedIn;
}

export const getLoginToken = (state) => {
  return getMainReducer(state).loginToken;
}

export const getUserId = (state) => {
  return getMainReducer(state).userId;
}

export const getShowSignup = (state) => {
  return getMainReducer(state).showSignup;
}
