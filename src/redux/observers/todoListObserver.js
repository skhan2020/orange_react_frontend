import { justTodoListSelector } from '../selectors/index';

export const observeTodoList = (store, cb) => {
  let prevState = justTodoListSelector(store.getState());

  // Check against the initial store values
  if (prevState) {
    cb(prevState);
  }

  // This will trigger an update when the store data changes
  const handleStateChange = () => {
    const nextState = justTodoListSelector(store.getState());
    if (prevState !== nextState) {
      prevState = nextState;
      cb(nextState);
    }
  };
  return store.subscribe(handleStateChange);
};