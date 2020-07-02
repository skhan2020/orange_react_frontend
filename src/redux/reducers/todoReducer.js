import { ADD_NEW_TODO, 
   UPDATE_TODO_LIST, UPDATE_TODO,
   UPDATE_FILTERED_TODO_LIST,
   DELETE_TODO, OPEN_TODO_DETAIL,
   UPDATE_STATUS_TIMELINE,
   UPDATE_FILTER_STATUS
  } from '../actions/todoActions';
import moment from 'moment';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
  todoList: Immutable.List([]),
  selectedDetailTodo: {},
  statuses: Immutable.Map({}),
  filteredList: Immutable.List([]),
  inFilterState: false,
})

const todoReducer = (state = initialState, action) => {
  let payload = action.payload;
  switch (action.type) {
    case UPDATE_TODO_LIST:
      // sort the todos in ascending order
      const list = payload.todos;
      return state.set('todoList', list);
    case UPDATE_FILTERED_TODO_LIST:
      const filteredList = payload.todos;
      return state.set('filteredList', filteredList)
                  .set('inFilterState', true);
    case UPDATE_FILTER_STATUS:
      return state.set('inFilterState', payload.value);
    case ADD_NEW_TODO:
      const curr = state.get('todoList');
      return state.set('todoList', [...curr, payload.todo]);
    case DELETE_TODO:
      const newReducedList = state.get('todoList').filter(item => item._id !== payload.todo._id);
      return state.set('todoList', [...newReducedList]);
    case UPDATE_TODO:
      const updatedTodoList = state.get('todoList').map(item => item._id === payload.todo._id ? 
        { ...item,
          status :payload.todo.status,
          statusUpdatedTime: moment(payload.todo.statusUpdatedTime).local(),
          projectedStartTime: moment(payload.todo.projectedStartTime).local(),
          projectedEndTime: moment(payload.todo.projectedEndTime).local(),
          notes: payload.todo.notes,
          tags: payload.todo.tags
        } : item);
      return state.set('todoList', [...updatedTodoList]);
    case OPEN_TODO_DETAIL : 
      return state.set('selectedDetailTodo', payload.todo);
    case UPDATE_STATUS_TIMELINE :
      return state.setIn(['statuses', payload.id], payload.statusList);
    default:
      return state;
  }
}

export default todoReducer
