import { showModal } from '../redux/actions/modalActions'
import store from '../redux/store';
import { doFetch } from './todo';
import { updateNotesList, addNote,
  setNoteDeleted, updateExistingNote} from '../redux/actions/noteAction'

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
    store.dispatch(updateNotesList(resdata.data.notes));
  })
  .catch(err => {
    console.log(err)
  }
  );
}

// @ts-ignore
export const updateNote = updateObj => {
  const reqBody = {
    query: `
      mutation UpdateNote($id: ID!, $category: String!, $title: String!, $text: String! ) {
      updateNote(
          id: $id
          category: $category,
          title: $title,
          text: $text,
        ) {
        _id
        category
        title
        createdAt
        text
        creator {
          _id
        }
      }
    }
  `,
    variables: {
      category: updateObj.category,
      title: updateObj.title,
      text: updateObj.text,
      id: updateObj.id,
    }
  }
  doFetch(reqBody)
  .then(resdata => {
    const resObj = resdata.data.updateNote;
// @ts-ignore
    store.dispatch(showModal('information', {message: 'Note updated Successfully!'}));
    store.dispatch(updateExistingNote({
      _id: resObj._id, 
      title: resObj.title,
      category: resObj.category,
      text: resObj.text,
      createdAt: resObj.createdAt,
      creator: resObj.creator._id
    }));
  })
  .catch(err => {
    console.log(err)
  }
  );
}

// @ts-ignore
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
          createdAt
          creator {
            _id
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
    store.dispatch(addNote({
      _id: resObj._id, 
      title: resObj.title,
      category: resObj.category,
      text: resObj.text,
      createdAt: resObj.createdAt,
      creator: resObj.creator._id,
    }));
  })
  .catch(err => {
    console.log(err)
  }
  );

}

// @ts-ignore
export const deleteNote = id => {
  const reqBody = {
    query: `
      mutation DeleteNote($noteId: ID!) {
        deleteNote(
            noteId: $noteId,
        ) {
          _id
        }
      }
    `,
    variables: {
      noteId: id,
    }
  }
  doFetch(reqBody)
  .then(resdata => {
    const deletedId = resdata.data.deleteNote._id;
// @ts-ignore
    store.dispatch(showModal('information', {message: 'Note deleted Successfully!'}));
    store.dispatch(setNoteDeleted(deletedId));
  })
  .catch(err => {
    console.log(err)
  }
  );
}