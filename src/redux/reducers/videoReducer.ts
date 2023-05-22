import { ADD_NEW_VIDEO, 
  UPDATE_VIDEO_LIST, UPDATE_VIDEO,
  DELETE_VIDEO,
  SET_SELECTED_VIDEO,
  CLEAR_VIDEOS_DETAILS
 } from '../actions/videoAction';
import Immutable from 'immutable';

// @ts-ignore
const initialState = new (Immutable.Map as any)({
 videoList: Immutable.List([]),
 selectedVideo: {},
 videosFetched: false,
})

// @ts-ignore
const sortAndUpdateVideo = list => {
 const group = new Map();
 // sort the videos as per category
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
const videoReducer = (state = initialState, action) => {
 let payload = action.payload;
 switch (action.type) {
   case UPDATE_VIDEO_LIST:
     const list = payload.videos;
     const newRetreivedList = sortAndUpdateVideo(list);
     const selectedItem = newRetreivedList.length ? newRetreivedList[0] : {};
     return state.set('videoList', newRetreivedList)
                 .set('selectedVideo', selectedItem)
                 .set('videosFetched', true);
   case ADD_NEW_VIDEO:
     const newList = [...state.get('videoList'), payload.videos]
     return state.set('videoList', sortAndUpdateVideo(newList))
                 .set('selectedVideo', payload.videos);
   case DELETE_VIDEO:
// @ts-ignore
     const newReducedList = state.get('videoList').filter(item => item._id !== payload.videoID);
     const newSortedList = sortAndUpdateVideo([...newReducedList]);
     const selectedFirstItem = newSortedList.length ? newSortedList[0] : {};
     return state.set('videoList', newSortedList)
                 .set('selectedVideo', selectedFirstItem);
   case UPDATE_VIDEO:
// @ts-ignore
     const video = state.get('videoList').map(item => item._id === payload.videos._id ? 
       { ...item,
         title :payload.videos.title,
         category: payload.videos.category,
         text: payload.videos.text
       } : item);
     return state.set('videoList', video);
   case SET_SELECTED_VIDEO :
     return state.set('selectedVideo', payload.video);
   case CLEAR_VIDEOS_DETAILS:
     return state.set('selectedVideo', {})
                 .set('videosFetched', false)
                 .set('videoList', Immutable.List([]));
   default:
     return state;
 }
}

export default videoReducer
