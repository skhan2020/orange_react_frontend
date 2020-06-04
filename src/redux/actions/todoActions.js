export const UPDATE_TODO_LIST = "UPDATE_TODO_LIST";
export const OPEN_CREATE_TODO = "OPEN_CREATE_TODO";
export const CLOSE_CREATE_TODO = "CLOSE_CREATE_TODO";
export const GET_TODO_LIST = "GET_TODO_LIST";
export const ADD_NEW_TODO = "ADD_NEW_TODO";

export function updateTodoList(data) {
  return {
    type: UPDATE_TODO_LIST,
    payload: {
      todos: data,
    },
  };
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
