import store from '../redux/store';
import { doFetch } from './todo';
import { updateStatusTimeline } from '../redux/actions/todoActions';

// @ts-ignore
export const getStatusTimeline = todoId => {
  const reqBody = {
    query: `
      query Statuses($todo: ID!){
        statuses(todo: $todo) {
          _id
          createdAt
          todo
          type
        }
      }
    `,
    variables: {
      todo: todoId,
    }
  }
  doFetch(reqBody)
  .then(resdata => {
    store.dispatch(updateStatusTimeline(todoId, resdata.data.statuses));
  })
  .catch(err => {
    console.log(err)
  }
  );
}