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
  return getAuthReducer(state).get('isLoggedIn');
}

export const getLoginToken = (state) => {
  return getAuthReducer(state).get('loginToken');
}

export const getLoginError = (state) => {
  return { hasError: getAuthReducer(state).get('loginError'),
           errorMessage: getAuthReducer(state).get('errorMessage') };
} 

export const getUserFullName = (state) => {
  return { firstName: getAuthReducer(state).get('firstName'), lastName: getAuthReducer(state).get('lastName')};
}

export const getUserId = (state) => {
  return getAuthReducer(state).get('userId');
}

export const getShowSignup = (state) => {
  return getAuthReducer(state).get('showSignup');
}

export const getModalType = (state) => {
  return getModalReducer(state).get('modalType');
}

export const isModalOpen = (state) => {
  return getModalReducer(state).get('modalOpen');
}

export const todoListSelector = (state) => {
  return getTodoReducer(state).get('filteredList').length ? getTodoReducer(state).get('filteredList') : getTodoReducer(state).get('todoList');
}

export const todoStatusesSelector = (state) => {
  const selectedItem = getTodoReducer(state).get('selectedTodo')
  return getTodoReducer(state).getIn(['statuses', selectedItem._id]) || [];
}

export const todoSelectedSelector = (state) => {
  return getTodoReducer(state).get('selectedTodo') || {};
}