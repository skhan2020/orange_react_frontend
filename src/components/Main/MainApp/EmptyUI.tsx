import React from 'react';

// @ts-ignore
const EmptyUI = props => {
  return (
    <div className="empty_message" >{props.message}</div>
  )
}

export default EmptyUI;