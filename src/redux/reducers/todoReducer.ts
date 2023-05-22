import { ADD_NEW_TODO, 
   UPDATE_TODO_LIST, UPDATE_TODO,
   UPDATE_FILTERED_TODO_LIST,
   DELETE_TODO, OPEN_TODO_DETAIL,
   UPDATE_STATUS_TIMELINE,
   UPDATE_FILTER_STATUS,
   CLEAR_TODO_DETAILS
  } from '../actions/todoActions';
import moment from 'moment';
import Immutable from 'immutable';

export interface Todo {
  projectedStartTime: moment.Moment,
  projectedEndTime: moment.Moment,
  notes: string,
  tags: string[],
  category: string,
  title: string,
  status: number,
  _id: string,
}

interface TodoState {
  todoList: Immutable.List<any>,
  selectedDetailTodo: Todo,
  statuses: Immutable.Map<any, any>,
  filteredList: Immutable.List<any>,
  inFilterState: false,
};

const initialState: TodoState = new (Immutable.Map as any)({
  todoList: Immutable.List([]),
  selectedDetailTodo: {},
  statuses: Immutable.Map({}),
  filteredList: Immutable.List([]),
  inFilterState: false,
})

// @ts-ignore
const todoReducer = (state: Map = initialState, action) => {
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
// @ts-ignore
      const newReducedList = state.get('todoList').filter(item => item._id !== payload.todo._id);
      return state.set('todoList', [...newReducedList]);
    case UPDATE_TODO:
// @ts-ignore
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
    case CLEAR_TODO_DETAILS :
      return state.set('todoList', Immutable.List([]))
                  .set('selectedDetailTodo', {})
                  .set('statuses', Immutable.Map({}))
                  .set('filteredList', Immutable.List([]))
                  .set('inFilterState', false);
    default:
      return state;
  }
}

export default todoReducer
