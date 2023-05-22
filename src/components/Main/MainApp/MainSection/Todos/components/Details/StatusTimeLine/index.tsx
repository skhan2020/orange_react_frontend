import React, { useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Timeline } from 'antd';
import { getStatusTimeline } from '../../../../../../../../services/status';
import { todoStatusesSelector } from '../../../../../../../../redux/selectors/index'
import { NOT_STARTED, STATUSES, StatusDisplayDetail, StatusObjectKeys } from '../../../../../../../../constants/index'
import { Todo } from '../../../../../../../../redux/reducers/todoReducer';

interface IObjectKeys {
  [key: string]: string // best way to declare a key value pair
}

const colorList: IObjectKeys = {
  redButton : 'red', 
  greenButton: `rgb(79, 199, 68)`,
  blueButton : `rgb(2, 150, 219)`,
  yellowButton : 'orange'
}

interface StatusTimelineProps {
  todo: Todo,
  className: string | undefined;
}

// @ts-ignore
const StatusTimeLine = ({ todo, className }) => {
  const statuses = useSelector(todoStatusesSelector);

  // get list of statuses
  useEffect(() => {
    if (todo) {
      getStatusTimeline(todo);
    }
  }, [todo]);

  return (
    <Timeline>
      {// @ts-ignore
      statuses.map((status) => {
        if (status) {
          const createdAt = moment(status.createdAt).local();
          const statusType: StatusDisplayDetail | undefined = STATUSES.get(status.type);
          return <Timeline.Item color={statusType &&  colorList[statusType.css]} key={status._id} className={className}>
              <div style={{fontWeight: 'bold', color: statusType && colorList[statusType.css]}}>{`${statusType && statusType.label}`}</div>
              <div>{createdAt.format('dddd, MMMM Do, h:mm a')}</div>
            </Timeline.Item>
        }
      }
    )}
    </Timeline>
  )
}

export default StatusTimeLine;