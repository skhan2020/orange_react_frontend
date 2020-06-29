import { ADD_NEW_TODO, 
   UPDATE_TODO_LIST, UPDATE_TODO,
   UPDATE_FILTERED_TODO_LIST,
   DELETE_TODO, OPEN_TODO_DETAIL,
   UPDATE_STATUS_TIMELINE
  } from '../actions/todoActions';
import moment from 'moment';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
  todoList: Immutable.Map({}),
  selectedTodo: {},
  rawListData: Immutable.List([]),
  statuses: Immutable.Map({}),
  filteredList: Immutable.Map({}),
})

const sortAndUpdateTodo = list => {
  const group = new Map();
  list.sort((a, b) => moment(a.projectedStartTime).diff(moment(b.projectedStartTime)));
  list.forEach(item => {
    const time = moment(item.projectedStartTime).local().format('MM-DD-YYYY');
    group.set(time, (group.get(time) ? [...group.get(time), item] : [item]));
    item.projectedStartTime = moment(item.projectedStartTime).local();
    item.projectedEndTime = moment(item.projectedEndTime).local();
  });
  return group;
}

const todoReducer = (state = initialState, action) => {
  let payload = action.payload;
  switch (action.type) {
    case UPDATE_TODO_LIST:
      // sort the todos in ascending order
      const list = payload.todos;
      return state.set('todoList', sortAndUpdateTodo(list))
                  .set('rawListData', list);
    case UPDATE_FILTERED_TODO_LIST:
      const filteredList = payload.todos;
      return state.set('filteredList', sortAndUpdateTodo(filteredList));
    case ADD_NEW_TODO:
      const curr = state.get('rawListData');
      return state.set('todoList', sortAndUpdateTodo([...curr, payload.todo]))
                  .set('rawListData', [...curr, payload.todo]);
    case DELETE_TODO:
      debugger;
      const newReducedList = state.get('rawListData').filter(item => item._id !== payload.todo._id);
      return state.set('todoList', sortAndUpdateTodo([...newReducedList]))
                  .set('rawListData', [...newReducedList]);
    case UPDATE_TODO:
      const updatedTodoList = state.get('rawListData').map(item => item._id === payload.todo._id ? 
        { ...item,
          status :payload.todo.status,
          statusUpdatedTime: moment(payload.todo.statusUpdatedTime).local(),
          projectedStartTime: moment(payload.todo.projectedStartTime).local(),
          projectedEndTime: moment(payload.todo.projectedEndTime).local(),
          notes: payload.todo.notes,
          tags: payload.todo.tags
        } : item);
      return state.set('todoList', sortAndUpdateTodo([...updatedTodoList]))
                  .set('rawListData', [...updatedTodoList]);
    case OPEN_TODO_DETAIL : 
      return state.set('selectedTodo', payload.todo);
    case UPDATE_STATUS_TIMELINE :
      return state.setIn(['statuses', payload.id], payload.statusList);
    default:
      return state;
  }
}

export default todoReducer
