import React from 'react';
import './index.scss';
import BackDrop from './BackDrop';
import CreateTodo from './CreateTodo';
import { useSelector } from 'react-redux'
import { getModalType, isModalOpen } from '../../../redux/selectors';

const Modal = props => {
  const showModal = useSelector(isModalOpen);
  const type = useSelector(getModalType);

  if (!showModal) {
    return null;
  }
  return (
    <React.Fragment>
      <BackDrop />
      <div className="modal">
        <header className="modal_header"><h3>{props.title}</h3></header>
        <section className="modal_content">
          {type === 'createTodo' && <CreateTodo />}
        </section>
      </div>
    </React.Fragment>
  )
}

export default Modal;