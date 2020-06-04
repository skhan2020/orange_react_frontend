import { ADD_NEW_TODO, UPDATE_TODO_LIST} from '../actions/todoActions';

export const initialState = () => ({
  todoList: [],
})

const todoReducer = (state = initialState(), action) => {
  let payload = action.payload;
  switch (action.type) {
      case UPDATE_TODO_LIST:
        state = {
          ...state,
          todoList: payload.todos,
        }
        case ADD_NEW_TODO:
          state = {
            ...state,
            todoList: payload.todos,
          }
      break;
    default:
      break
  }
  return state;
}

export default todoReducer
