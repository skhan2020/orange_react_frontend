import { getLoginToken} from '../redux/selectors/index';
import { updateTodoList } from '../redux/actions/todoActions';
import store from '../redux/store';

export const retrieveTodoList = () => {
  const reqBody = {
    query: `
      query {
        todos {
          _id
          category
          title
          status
          statusUpdatedTime
          projectedStartTime
          projectedEndTime
          notes
          tags
          creator {
            _id
            email
          }
        }
      }
    `
  }
  const authToken = getLoginToken(store.getState());
  fetch('http://localhost:4000/graphqlapi', {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`
    }
  }).then(res => {
    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed!")
    }
    return res.json();
  })
  .then(resdata => {
    console.log(resdata)
    // save the todos
    store.dispatch(updateTodoList(resdata.data.todos));
  })
  .catch(err => {
    console.log(err)
  }
  );
}

export const createTodo = todoObj => {
  const reqBody = {
    query: `
      mutation CreateTodo($category: String!, $title: String!, $status: Int!, $statusUpdatedTime: String!, $endTime: String!, $startTime: String!, $notes: String, $tags: [String!]) {
        createTodo(todoInput: {
            category: $category,
            title: $title,
            projectedStartTime: $startTime,
            projectedEndTime: $endTime,
            status: $status,
            statusUpdatedTime: $statusUpdatedTime,
            notes: $notes
            tags: $tags
        }) {
          _id
          category
          title
          status
          statusUpdatedTime
          projectedStartTime
          projectedEndTime
          notes
          tags
          creator {
            _id
            email
          }
        }
      }
    `,
    variables: {
      title: todoObj.title,
      category: todoObj.category,
      startTime: todoObj.startTime,
      endTime: todoObj.endTime,
      notes: todoObj.notes,
      tags: todoObj.tags,
      statusUpdatedTime: new Date().toISOString(),
      status: 1000, //STATUSES['not_started'],
    }
  }
  const authToken = getLoginToken(store.getState());
  fetch('http://localhost:4000/graphqlapi', {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`
    }
  }).then(res => {
    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Failed!")
    }
    return res.json();
  })
  .then(resdata => {
    // setTodos(prevState => {
    //   const newTodos= [];
    //   newTodos.push({
    //     _id: resdata.data.createTodo._id,
    //     type: resdata.data.createTodo.type,
    //     description: resdata.data.createTodo.description,
    //     status: resdata.data.createTodo.status,
    //     statusUpdatedTime: resdata.data.createTodo.statusUpdatedTime,
    //     projectedStartTime: resdata.data.createTodo.projectedStartTime,
    //     notes: resdata.data.createTodo.notes,
    //     creator: {
    //       _id: userId
    //     }
    //   });
    //   return [...prevState, ...newTodos];
    // })
  })
  .catch(err => {
    console.log(err)
  }
  );

}