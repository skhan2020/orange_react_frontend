export const UPDATE_VIDEO_LIST = "UPDATE_VIDEO_LIST";
export const OPEN_CREATE_VIDEO = "OPEN_CREATE_VIDEO";
export const CLOSE_CREATE_VIDEO = "CLOSE_CREATE_VIDEO";
export const GET_VIDEO_LIST = "GET_VIDEO_LIST";
export const ADD_NEW_VIDEO = "ADD_NEW_VIDEO";
export const UPDATE_VIDEO = "UPDATE_VIDEO";
export const DELETE_VIDEO = "DELETE_VIDEO";
export const OPEN_VIDEO_DETAIL = 'OPEN_VIDEO_DETAIL';
export const SET_SELECTED_VIDEO = 'SET_SELECTED_VIDEO';

export function updateVideoList(data) {
  return {
    type: UPDATE_VIDEO_LIST,
    payload: {
      videos: data,
    },
  };
}

export function setSelectedVideo(selectedVideo) {
  return {
    type: SET_SELECTED_VIDEO,
    payload: {
      video: selectedVideo,
    },
  };
}

export function addVideo(data) {
  return {
    type: ADD_NEW_VIDEO,
    payload: {
      videos: data,
    },
  };
}

export function showCreateVideo() {
  return {
    type: OPEN_CREATE_VIDEO
  };
}

export function closeCreateVideo() {
  return {
    type: CLOSE_CREATE_VIDEO
  };
}

export function getVideoList() {
  return {
    type: GET_VIDEO_LIST
  };
}

export function updateExistingVideo(data) {
  return {
    type: UPDATE_VIDEO,
    payload: {
      videos: data,
    },
  };
}

export function setVideoDeleted(data) {
  return {
    type: DELETE_VIDEO,
    payload: {
      videoID: data,
    },
  };
}

export function openVideoDetail(data) {
  return {
    type: OPEN_VIDEO_DETAIL,
    payload: {
      videos: data,
    }
  }
}
