import {  notification  } from 'antd';

export const openNotification = (title, futureTodo) => {
  notification.info({
    message: title,
    description: futureTodo? futureTodo.title : '',
    style: {
      width: 300,
      marginLeft: 335 - 300,
      fontSize: '1.2em',
    },
    duration: 30,
    placement: 'topRight',
  });
};
