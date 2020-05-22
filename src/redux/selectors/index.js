const getMainReducer = (state) => {
  return state.reducer
}

export const getLoggedIn = (state) => {
  return getMainReducer(state).isLoggedIn
}

export const isCallingBackend = (state) => {
  return getMainReducer(state).isCallingBackend
}

export const wasLastCallSuccessful = (state) => {
  return getMainReducer(state).lastCallWasSuccessful
}
