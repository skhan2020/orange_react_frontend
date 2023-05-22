import { ADD_NEW_NOTE, 
  UPDATE_NOTE_LIST, UPDATE_NOTE,
  DELETE_NOTE,
  SET_SELECTED_NOTE,
  CLEAR_NOTES_DETAILS,
 } from '../actions/noteAction';
import Immutable from 'immutable';


interface Note {
  title: string,
  category: string,
  text: string,
  id: string
}
interface NoteState {
 noteList: Immutable.List<Note>,
 selectedNote: Note,
 notesFetched: boolean,
}

const initialState = new (Immutable.Map as any)({
 noteList: Immutable.List([]),
 selectedNote: {},
 notesFetched: false,
})

// @ts-ignore
const sortAndUpdateNote = list => {
 const group = new Map();
 // sort the notes as per category
 // @ts-ignore
 list.sort((a, b) => {
   if (a.category < b.category) {
     return -1;
   } else if (a.category > b.category) {
      return 1;
   } return 0;
 });
 // and group them by category
// @ts-ignore
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

// @ts-ignore
const noteReducer = (state = initialState, action) => {
 let payload = action.payload;
 switch (action.type) {
   case UPDATE_NOTE_LIST:
     const list = payload.notes;
     const newRetreivedList = sortAndUpdateNote(list);
     const selectedItem = newRetreivedList.length ? newRetreivedList[0] : {};
     return state.set('noteList', newRetreivedList)
                 .set('selectedNote', selectedItem)
                 .set('notesFetched', true);
   case ADD_NEW_NOTE:
     const newList = [...state.get('noteList'), payload.notes]
     return state.set('noteList', sortAndUpdateNote(newList))
                 .set('selectedNote', payload.notes);
   case DELETE_NOTE:
    // @ts-ignore
     const newReducedList = state.get('noteList').filter(item => item._id !== payload.noteID);
     const newSortedList = sortAndUpdateNote([...newReducedList]);
     const selectedFirstItem = newSortedList.length ? newSortedList[0] : {};
     return state.set('noteList', newSortedList)
                 .set('selectedNote', selectedFirstItem);
   case UPDATE_NOTE:
    // @ts-ignore
     const note = state.get('noteList').map(item => item._id === payload.notes._id ? 
       { ...item,
         title :payload.notes.title,
         category: payload.notes.category,
         text: payload.notes.text
       } : item);
     return state.set('noteList', note);
   case SET_SELECTED_NOTE :
     return state.set('selectedNote', payload.note);
   case CLEAR_NOTES_DETAILS:
     return state.set('selectedNote', {})
                 .set('notesFetched', false)
                 .set('noteList', Immutable.List([]));
   default:
     return state;
 }
}

export default noteReducer
