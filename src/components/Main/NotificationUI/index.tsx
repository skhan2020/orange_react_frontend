import {  notification  } from 'antd';

// @ts-ignore
export const openNotification = (title, todo) => {
  notification.info({
    message: title,
    description: todo? todo.title : '',
    style: {
      width: 300,
      marginLeft: 335 - 300,
      fontSize: '1.2em',
    },
    duration: 30,
    placement: 'topRight',
  });
};
