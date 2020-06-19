import { ADD_NEW_TODO, 
   UPDATE_TODO_LIST, UPDATE_TODO,
   UPDATE_FILTERED_TODO_LIST,
   DELETE_TODO, OPEN_TODO_DETAIL,
   UPDATE_STATUS_TIMELINE
  } from '../actions/todoActions';
import moment from 'moment';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
  todoList: Immutable.List([]),
  selectedTodo: {},
  statuses: Immutable.Map({}),
  filteredList: Immutable.List([]),
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
    item.projectedStartTime = moment(item.projectedStartTime).local();
    item.projectedEndTime = moment(item.projectedEndTime).local();
  });
  return list;
}

const todoReducer = (state = initialState, action) => {
  let payload = action.payload;
  switch (action.type) {
    case UPDATE_TODO_LIST:
      // sort the todos in ascending order
      const list = payload.todos;
      return state.set('todoList', sortAndUpdateTodo(list));
    case UPDATE_FILTERED_TODO_LIST:
      const filteredList = payload.todos;
      return state.set('filteredList', sortAndUpdateTodo(filteredList));
    case ADD_NEW_TODO:
      const newList = [...state.get('todoList'), payload.todo]
      return state.set('todoList', sortAndUpdateTodo(newList));
    case DELETE_TODO:
      const newReducedList = state.get('todoList').filter(item => item._id !== payload.todoID);
      return state.set('todoList', sortAndUpdateTodo([...newReducedList]));
    case UPDATE_TODO:
      const todo = state.get('todoList').map(item => item._id === payload.todo._id ? 
        { ...item,
          status :payload.todo.status,
          statusUpdatedTime: moment(payload.todo.statusUpdatedTime).local(),
          projectedStartTime: moment(payload.todo.projectedStartTime).local(),
          projectedEndTime: moment(payload.todo.projectedEndTime).local(),
          notes: payload.todo.notes,
          tags: payload.todo.tags
        } : item);
      return state.set('todoList', todo);
    case OPEN_TODO_DETAIL : 
      return state.set('selectedTodo', payload.todo);
    case UPDATE_STATUS_TIMELINE :
      return state.setIn(['statuses', payload.id], payload.statusList);
    default:
      return state;
  }
}

export default todoReducer
