export const UPDATE_TODO_LIST = "UPDATE_TODO_LIST";
export const OPEN_CREATE_TODO = "OPEN_CREATE_TODO";
export const CLOSE_CREATE_TODO = "CLOSE_CREATE_TODO";
export const GET_TODO_LIST = "GET_TODO_LIST";

export function updateTodoList(data) {
  return {
    type: UPDATE_TODO_LIST,
    payload: {
      loginToken: data.token,
      userId: data.userId,
      tokenExpiration: data.tokenExpiration,
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
