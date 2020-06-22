import { ADD_NEW_NOTE, 
  UPDATE_NOTE_LIST, UPDATE_NOTE,
  DELETE_NOTE, OPEN_NOTE_DETAIL
 } from '../actions/noteAction';
import moment from 'moment';
import Immutable from 'immutable';

const initialState = new Immutable.Map({
 noteList: Immutable.List([]),
 selectedNote: {},
})

const sortAndUpdateNote = list => {
 const group = new Map();
 list.sort((a, b) => moment(a.createdAt).diff(moment(b.createdAt)));
 list.forEach(item => {
   if (!group.get(item.category)) {
     group.set(item.category, true);
     item.showCategory = true; 
   } else {
     item.showCategory = false; 
   }
 });
 return list;
}

const noteReducer = (state = initialState, action) => {
 let payload = action.payload;
 switch (action.type) {
   case UPDATE_NOTE_LIST:
     // sort the notes in ascending order
     const list = payload.notes;
     return state.set('noteList', sortAndUpdateNote(list));
   case ADD_NEW_NOTE:
     const newList = [...state.get('noteList'), payload.NOTE]
     return state.set('noteList', sortAndUpdateNote(newList));
   case DELETE_NOTE:
     const newReducedList = state.get('noteList').filter(item => item._id !== payload.noteID);
     return state.set('noteList', sortAndUpdateNote([...newReducedList]));
   case UPDATE_NOTE:
     const note = state.get('noteList').map(item => item._id === payload.noteObj._id ? 
       { ...item,
         title :payload.noteObj.title,
         category: payload.noteObj.category,
         text: payload.noteObj.text
       } : item);
     return state.set('noteList', note);
   case OPEN_NOTE_DETAIL : 
     return state.set('selectedNote', payload.NOTE);
   default:
     return state;
 }
}

export default noteReducer
