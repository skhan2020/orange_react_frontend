import React from 'react';
import './index.scss';
import BackDrop from './BackDrop';
import CreateTodo from './../MainApp/MainSection/Todos/components/CreateTodo/index';
import { useSelector } from 'react-redux'
import { getModalType, isModalOpen } from '../../../redux/selectors';
import { translate } from '../../../localization/service'

const TITLE_MAP = { createTodo: 'create_todo'}

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
        <header className="modal_header"><div className="modal_header_label">{translate(TITLE_MAP[type])}</div></header>
        <section className="modal_content">
          {type === 'createTodo' && <CreateTodo />}
        </section>
      </div>
    </React.Fragment>
  )
}

export default Modal;