export const UPDATE_TODO_LIST = "UPDATE_TODO_LIST";
export const OPEN_CREATE_TODO = "OPEN_CREATE_TODO";
export const CLOSE_CREATE_TODO = "CLOSE_CREATE_TODO";
export const GET_TODO_LIST = "GET_TODO_LIST";
export const ADD_NEW_TODO = "ADD_NEW_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const OPEN_TODO_DETAIL = 'OPEN_TODO_DETAIL';
export const UPDATE_STATUS_TIMELINE = "UPDATE_STATUS_TIMELINE";
export const UPDATE_FILTERED_TODO_LIST = "UPDATE_FILTERED_TODO_LIST";
export const UPDATE_FILTER_STATUS = 'UPDATE_FILTER_STATUS';

export function updateTodoList(data) {
  return {
    type: UPDATE_TODO_LIST,
    payload: {
      todos: data,
    },
  };
}

export function updateFilteredTodoList(data) {
  return {
    type: UPDATE_FILTERED_TODO_LIST,
    payload: {
      todos: data,
    },
  };
}

export function updateFilterStatus(value) {
  return {
    type: UPDATE_FILTER_STATUS,
    payload: {
      value,
    }
  }
}
export function addTodo(data) {
  return {
    type: ADD_NEW_TODO,
    payload: {
      todo: data,
    },
  };
}

export function showCreateTodo() {
  return {
    type: OPEN_CREATE_TODO
  };
}

export function closeCreateTodo() {
  return {
    type: CLOSE_CREATE_TODO
  };
}

export function getTodoList() {
  return {
    type: GET_TODO_LIST
  };
}

export function updateTodo(data) {
  return {
    type: UPDATE_TODO,
    payload: {
      todo: data,
    },
  };
}

export function todoDeleted(data) {
  return {
    type: DELETE_TODO,
    payload: {
      todo: data,
    },
  };
}

export function openTodoDetail(data) {
  return {
    type: OPEN_TODO_DETAIL,
    payload: {
      todo: data,
    }
  }
}

export function updateStatusTimeline(id, statusList) {
  return {
    type: UPDATE_STATUS_TIMELINE,
    payload: {
      statusList,
      id,
    }
  };
}
