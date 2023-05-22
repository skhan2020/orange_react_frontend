import { observeTodoList } from '../redux/observers/todoListObserver'
import { observeLogin } from '../redux/observers/loginObserver'
import { openNotification } from '../components/Main/NotificationUI/index'
import store from '../redux/store';
import moment from 'moment';
import { NOT_STARTED_CODE } from '../constants';

const notificationTitle = 'Ready to start now ..';

// @ts-ignore
let timerId;

// @ts-ignore
const initUpcomingTimer = todoList => {
  // get the immediate next item in todolist
// @ts-ignore
  const futureTodos = todoList.filter(item => moment().diff(item.projectedStartTime) < 0 );
  if (futureTodos.length) {
    setUpTimer(futureTodos[0], todoList);
  }
}
const clearAllTimer = () => {
// @ts-ignore
  if (timerId) {
    clearTimeout(timerId);
  }
}
// @ts-ignore
const setUpTimer = (futureTodo, todoList) => {
  const timerSec = Math.abs(moment().diff(futureTodo.projectedStartTime));
  timerId = setTimeout(
    () => {
      // check todo and if not started
      // send notification
      if (parseInt(futureTodo.status) === NOT_STARTED_CODE) {
        openNotification(notificationTitle, futureTodo);
      }
      // setup for next timer if available
      initUpcomingTimer(todoList);
      clearAllTimer();
    },
    timerSec
  );
}

// @ts-ignore
const init = todoList => {
  initUpcomingTimer(todoList);
}

// @ts-ignore
observeTodoList(store, todoList => {
  if (!todoList) {
    return;
  }
  init(todoList);
});

// @ts-ignore
observeLogin(store, loggedIn => {
  if (!loggedIn) {
    clearAllTimer();
  }
});