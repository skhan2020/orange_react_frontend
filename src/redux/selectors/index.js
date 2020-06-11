const getAuthReducer = (state) => {
  return state.authReducer;
}

const getModalReducer = (state) => {
  return state.modalReducer;
}

const getTodoReducer = (state) => {
  return state.todoReducer;
}

export const isLoggedIn = (state) => {
  return getAuthReducer(state).isLoggedIn;
}

export const getLoginToken = (state) => {
  return getAuthReducer(state).loginToken;
}

export const getUserId = (state) => {
  return getAuthReducer(state).userId;
}

export const getShowSignup = (state) => {
  return getAuthReducer(state).showSignup;
}

export const getModalType = (state) => {
  return getModalReducer(state).modalType;
}

export const isModalOpen = (state) => {
  return getModalReducer(state).modalOpen;
}

export const todoListSelector = (state) => {
  return getTodoReducer(state).todoList;
}

export const todoSelectedSelector = (state) => {
  return getTodoReducer(state).selectedTodo;
}