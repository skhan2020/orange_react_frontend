import { getUserId } from '../redux/selectors/index';
import { showModal } from '../redux/actions/modalActions'
import store from '../redux/store';
import { doFetch } from './todo';
import { updateNotesList, addNote, setNoteDeleted} from '../redux/actions/noteAction'

export const retrieveNotesList = () => {
  const reqBody = {
    query: `
      query {
        notes {
          _id
          category
          title
          text
          createdAt
        }
      }
    `
  }
  doFetch(reqBody)
  .then(resdata => {
    // save the notes
    debugger;
    store.dispatch(updateNotesList(resdata.data.notes));
  })
  .catch(err => {
    console.log(err)
  }
  );
}

export const createNote = notesObj => {
  if (!notesObj.title || !notesObj.category || !notesObj.text  ) {
    console.log("Some required items are missing!");
    return ;
  }
  const reqBody = {
    query: `
      mutation CreateNote($category: String!, $title: String!, $text: String! ) {
        createNote(noteInput: {
            category: $category,
            title: $title,
            text: $text,
        }) {
          _id
          category
          title
          text
          creator {
            _id
            email
          }
        }
      }
    `,
    variables: {
      category: notesObj.category,
      title: notesObj.title,
      text: notesObj.text,
    }
  }
  doFetch(reqBody)
  .then(resdata => {
    const resObj = resdata.data.createNote;
    const userId = getUserId(store.getState());
    store.dispatch(addNote({
      _id: resObj._id, 
      title: resObj.title,
      category: resObj.category,
      text: resObj.text,
      createdAt: resObj.createdAt,
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
      mutation DeleteTodo($todoId: ID!) {
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
    store.dispatch(showModal('information', {message: 'Todo deleted Successfully!'}));
    store.dispatch(setNoteDeleted(deletedId));
  })
  .catch(err => {
    console.log(err)
  }
  );
}