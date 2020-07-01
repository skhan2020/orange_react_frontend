const getAuthReducer = (state) => {
  return state.authReducer;
}

const getModalReducer = (state) => {
  return state.modalReducer;
}

const getTodoReducer = (state) => {
  return state.todoReducer;
}

const getNoteReducer = (state) => {
  return state.noteReducer;
}

const getVideoReducer = (state) => {
  return state.videoReducer;
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

export const getModalElement = (state) => {
  return getModalReducer(state).get('modalObject');
}

export const getModalType = (state) => {
  return getModalReducer(state).get('modalType');
}

export const isModalOpen = (state) => {
  return getModalReducer(state).get('modalOpen');
}

export const todoListSelector = (state) => {
  return Array.from(getTodoReducer(state).get('filteredList')).length ? Array.from(getTodoReducer(state).get('filteredList')) : Array.from(getTodoReducer(state).get('todoList'));
}

export const justTodoListSelector = (state) => {
  return Array.from(getTodoReducer(state).get('todoList'));
}

export const todoStatusesSelector = (state) => {
  const selectedItem = getTodoReducer(state).get('selectedTodo')
  return getTodoReducer(state).getIn(['statuses', selectedItem._id]) || [];
}

export const todoSelectedSelector = (state) => {
  return getTodoReducer(state).get('selectedTodo') || {};
}

export const noteListSelector = (state) => {
  return getNoteReducer(state).get('noteList');
}
export const selectedNoteSelector = (state) => {
  return getNoteReducer(state).get('selectedNote');
}

export const notesFetchedSelector = (state) => {
  return getNoteReducer(state).get('notesFetched');
}

export const videosFetchedSelector = (state) => {
  return getVideoReducer(state).get('videosFetched');
}

export const videoPlayerListSelector = (state) => {
  return getVideoReducer(state).get('videoList');
}

