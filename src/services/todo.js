import { getLoginToken, getUserId } from '../redux/selectors/index';
import { updateTodoList, addTodo, updateTodo, todoDeleted } from '../redux/actions/todoActions';
import store from '../redux/store';

export const doFetch = reqBody => {
  const authToken = getLoginToken(store.getState());
  return fetch('https://cryptic-depths-54668.herokuapp.com/graphqlapi', {
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
}

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
  doFetch(reqBody)
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

export const updateTodoChanges = updateObj => {
  const reqBody = {
    query: `
      mutation UpdateTodo($id: ID!, $status: Int, $statusUpdatedTime: String, $projectedEndTime: String, $projectedStartTime: String, $notes: String, $tags: [String!]) {
        updateTodo(
            id: $id
            projectedStartTime: $projectedStartTime,
            projectedEndTime: $projectedEndTime,
            status: $status,
            statusUpdatedTime: $statusUpdatedTime,
            notes: $notes,
            tags: $tags
            ) {
          _id
          category
          title
          status
          statusUpdatedTime
          projectedStartTime
          projectedEndTime
          notes
          tags
        }
      }
    `,
    variables: {
      id: updateObj._id,
      status: parseInt(updateObj.status), 
      statusUpdatedTime: new Date().toISOString(),
      projectedEndTime: updateObj.projectedEndTime,
      projectedStartTime: updateObj.projectedStartTime,
      notes: updateObj.notes,
      tags: updateObj.tags,
    }
  }
  doFetch(reqBody)
  .then(resdata => {
    const resObj = resdata.data.updateTodo;
    store.dispatch(updateTodo({
      _id: resObj._id, 
      projectedStartTime: resObj.projectedStartTime,
      projectedEndTime: resObj.projectedEndTime,
      notes: resObj.notes,
      statusUpdatedTime: resObj.statusUpdatedTime,
      status: resObj.status
    }));
  })
  .catch(err => {
    console.log(err)
  }
  );

}

export const createTodo = todoObj => {
  if (!todoObj.title || !todoObj.projectedStartTime ) {
    console.log("Some required items are missing!");
    return ;
  }
  const reqBody = {
    query: `
      mutation CreateTodo($category: String!, $title: String!, $status: Int!, $statusUpdatedTime: String!, $projectedEndTime: String!, $projectedStartTime: String!, $notes: String, $tags: [String!]) {
        createTodo(todoInput: {
            category: $category,
            title: $title,
            projectedStartTime: $projectedStartTime,
            projectedEndTime: $projectedEndTime,
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
      category: todoObj.category,
      title: todoObj.title,
      status: 1000, //STATUSES['not_started'],
      statusUpdatedTime: new Date().toISOString(),
      projectedEndTime: todoObj.projectedEndTime,
      projectedStartTime: todoObj.projectedStartTime,
      notes: todoObj.notes || '',
      tags: todoObj.tags || [],
    }
  }
  doFetch(reqBody)
  .then(resdata => {
    const resObj = resdata.data.createTodo;
    const userId = getUserId(store.getState());
    store.dispatch(addTodo({
      _id: resObj._id, 
      title: resObj.title,
      category: resObj.category,
      projectedStartTime: resObj.projectedStartTime,
      projectedEndTime: resObj.projectedEndTime,
      notes: resObj.notes,
      tags: resObj.tags,
      statusUpdatedTime: resObj.statusUpdatedTime,
      status: resObj.status,
      creator: {
        _id: userId
      }
    }));
  })
  .catch(err => {
    console.log(err)
  }
  );

}

export const deleteTodo = todoId => {
  const reqBody = {
    query: `
      mutation CreateTodo($todoId: ID!) {
        deleteTodo(
            todoId: $todoId,
        ) {
          _id
        }
      }
    `,
    variables: {
      todoId: todoId,
    }
  }
  doFetch(reqBody)
  .then(resdata => {
    const deletedId = resdata.data.deleteTodo._id;
    store.dispatch(todoDeleted(deletedId));
  })
  .catch(err => {
    console.log(err)
  }
  );
}