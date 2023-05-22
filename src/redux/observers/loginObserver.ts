import { isLoggedIn } from '../selectors/index';

// @ts-ignore
export const observeLogin = (store, cb) => {
  let prevState = isLoggedIn(store.getState());

  // Check against the initial store values
  if (prevState) {
    cb(prevState);
  }

  // This will trigger an update when the store data changes
  const handleStateChange = () => {
    const nextState = isLoggedIn(store.getState());
    if (prevState !== nextState) {
      prevState = nextState;
      cb(nextState);
    }
  };
  return store.subscribe(handleStateChange);
};