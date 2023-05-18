import { showModal } from '../redux/actions/modalActions'
import store from '../redux/store';
import { doFetch } from './todo';
import { updateVideoList, addVideo, 
  setVideoDeleted, } from '../redux/actions/videoAction'

export const retrieveVideoList = () => {
  const reqBody = {
    query: `
      query {
        videos {
          _id
          category
          title
          link
          createdAt
        }
      }
    `
  }
  doFetch(reqBody)
  .then(resdata => {
    // save the video url
    store.dispatch(updateVideoList(resdata.data.videos));
  })
  .catch(err => {
    console.log(err)
  }
  );
}

export const createVideo = videoObj => {
  if (!videoObj.title || !videoObj.category || !videoObj.link  ) {
    console.log("Some required items are missing!");
    return ;
  }
  const reqBody = {
    query: `
      mutation CreateVideo($category: String!, $title: String!, $link: String! ) {
        createVideo(videoInput: {
            category: $category,
            title: $title,
            link: $link,
        }) {
          _id
          category
          title
          link
          createdAt
          creator {
            _id
          }
        }
      }
    `,
    variables: {
      category: videoObj.category,
      title: videoObj.title,
      link: videoObj.link,
    }
  }
  doFetch(reqBody)
  .then(resdata => {
    const resObj = resdata.data.createVideo;
    store.dispatch(addVideo({
      _id: resObj._id, 
      title: resObj.title,
      category: resObj.category,
      link: resObj.link,
      createdAt: resObj.createdAt,
      creator: resObj.creator._id,
    }));
  })
  .catch(err => {
    console.log(err)
  }
  );

}

export const deleteVideo = id => {
  const reqBody = {
    query: `
      mutation DeleteVideo($videoId: ID!) {
        deleteVideo(
          videoId: $videoId,
        ) {
          _id
        }
      }
    `,
    variables: {
      videoId: id,
    }
  }
  doFetch(reqBody)
  .then(resdata => {
    const deletedId = resdata.data.deleteVideo._id;
    store.dispatch(showModal('information', {message: 'Video deleted Successfully!'}));
    store.dispatch(setVideoDeleted(deletedId));
  })
  .catch(err => {
    console.log(err)
  }
  );
}