import { ADD_NEW_TODO, UPDATE_TODO_LIST, UPDATE_TODO, DELETE_TODO, OPEN_TODO_DETAIL} from '../actions/todoActions';
import moment from 'moment';

export const initialState = () => ({
  todoList: [],
  selectedTodo: {},
})

const sortAndUpdateTodo = list => {
  const group = new Map();
  list.sort((a, b) => moment(a.projectedStartTime).diff(moment(b.projectedStartTime)));
  list.forEach(item => {
    if (!group.get(moment(item.projectedStartTime).local().format('MM-DD-YYYY'))) {
      group.set(moment(item.projectedStartTime).local().format('MM-DD-YYYY'), true);
      item.showDate = true; 
    } else {
      item.showDate = false; 
    }
  });
  return list;
}

const todoReducer = (state = initialState(), action) => {
  let payload = action.payload;
  switch (action.type) {
        case UPDATE_TODO_LIST:
          // sort the todos in ascending order
          const list = payload.todos;
          state = {
            ...state,
            todoList: sortAndUpdateTodo(list),
        }
        break;
        case ADD_NEW_TODO:
          const newList = [...state.todoList, payload.todo]
          state = {
            ...state,
            todoList: sortAndUpdateTodo(newList),
          }
        break;
        case DELETE_TODO:
          const newReducedList = state.todoList.filter(item => item._id !== payload.todoID);
          state = {
            ...state,
            todoList: sortAndUpdateTodo([...newReducedList]),
          }
        break;
        case UPDATE_TODO:
          const todo = state.todoList.map(item => item._id === payload.todo._id ? 
            { ...item,
              status :payload.todo.status,
              statusUpdatedTime: payload.todo.statusUpdatedTime,
              projectedStartTime: payload.todo.projectedStartTime,
              projectedEndTime: payload.todo.projectedEndTime,
              notes: payload.todo.notes
            } : item);
          state = {
            ...state,
            todoList: todo,
          }
      break;
          case OPEN_TODO_DETAIL : 
          {
            state = {
              ...state,
              selectedTodo: payload.todo,
            }

          }
      break;
    default:
      break
  }
  return state;
}

export default todoReducer
