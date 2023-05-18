import React from 'react';
import { useSelector } from 'react-redux';
import { getModalElement } from '../../../redux/selectors/index'
import './index.scss';

const Alert = () => {
  const modalElement = useSelector(getModalElement);

  return (
    <div className="alert" >
      <div>{modalElement.message}</div>
    </div>
  )
}

export default Alert;


