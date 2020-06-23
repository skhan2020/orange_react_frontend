export const UPDATE_NOTE_LIST = "UPDATE_NOTE_LIST";
export const OPEN_CREATE_NOTE = "OPEN_CREATE_NOTE";
export const CLOSE_CREATE_NOTE = "CLOSE_CREATE_NOTE";
export const GET_NOTE_LIST = "GET_NOTE_LIST";
export const ADD_NEW_NOTE = "ADD_NEW_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const OPEN_NOTE_DETAIL = 'OPEN_NOTE_DETAIL';
export const SET_SELECTED_NOTE = 'SET_SELECTED_NOTE';

export function updateNotesList(data) {
  return {
    type: UPDATE_NOTE_LIST,
    payload: {
      notes: data,
    },
  };
}

export function setSelectedItem(selectedNote) {
  return {
    type: SET_SELECTED_NOTE,
    payload: {
      note: selectedNote,
    },
  };
}

export function addNote(data) {
  return {
    type: ADD_NEW_NOTE,
    payload: {
      notes: data,
    },
  };
}

export function showCreateNote() {
  return {
    type: OPEN_CREATE_NOTE
  };
}

export function closeCreateNote() {
  return {
    type: CLOSE_CREATE_NOTE
  };
}

export function getNoteList() {
  return {
    type: GET_NOTE_LIST
  };
}

export function updateExistingNote(data) {
  return {
    type: UPDATE_NOTE,
    payload: {
      notes: data,
    },
  };
}

export function setNoteDeleted(data) {
  return {
    type: DELETE_NOTE,
    payload: {
      noteID: data,
    },
  };
}

export function openNoteDetail(data) {
  return {
    type: OPEN_NOTE_DETAIL,
    payload: {
      notes: data,
    }
  }
}
