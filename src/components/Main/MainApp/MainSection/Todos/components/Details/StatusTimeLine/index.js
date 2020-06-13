import React, { useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Timeline } from 'antd';
import { getStatusTimeline } from '../../../../../../../../services/status';
import { todoStatusesSelector } from '../../../../../../../../redux/selectors/index'
import { STATUSES } from '../../../../../../../../constants/index'

const colorList = {
  redButton : 'red', 
  greenButton: `rgb(79, 199, 68)`,
  blueButton : `rgb(2, 150, 219)`,
  yellowButton : 'orange'
}

const StatusTimeLine = ({ todo }) => {
  const statuses = useSelector(todoStatusesSelector);

  // get list of statuses
  useEffect(() => {
    getStatusTimeline(todo);
  }, [todo]);

  return (
    <Timeline>
      {statuses.map((status) => {
        const createdAt = moment(status.createdAt).local();
        return <Timeline.Item color={colorList[STATUSES.get(status.type).css]} key={status._id}>
            <div style={{fontWeight: 'bold', color: colorList[STATUSES.get(status.type).css]}}>{`${STATUSES.get(status.type).label}`}</div>
            <div>{createdAt.format('dddd, MMMM Do, h:mm a')}</div>
          </Timeline.Item>
      }
    )}
    </Timeline>
  )
}

export default StatusTimeLine;