import React from 'react';
import './index.scss';
import BackDrop from './BackDrop';
import CreateTodo from './../MainApp/MainSection/Todos/components/CreateTodo/index';
import AddNotes from './../MainApp/MainSection/Notes/components/AddNotes/index'
import { useSelector, useDispatch } from 'react-redux'
import { getModalType, isModalOpen } from '../../../redux/selectors';
import { translate } from '../../../localization/service'
import { closeModal} from '../../../redux/actions/modalActions'
import { CloseOutlined  } from '@ant-design/icons';
import Alert from './Alert';

const TITLE_MAP = { createTodo: 'create_todo',
                    information: 'information',
                    createNotes: 'create_notes'}

const Modal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(isModalOpen);
  const type = useSelector(getModalType);
  
  const onCancel = () => {
    // Samina: Implement dialog for confirmation
    dispatch(closeModal());
  }

  if (!showModal) {
    return null;
  }

  return (
    <React.Fragment>
      <BackDrop />
      <div className="modal">
        <header className="modal_header">
          <div className="modal_header_label">{translate(TITLE_MAP[type])}</div>
          <CloseOutlined className="delete_btn" onClick={onCancel} />
        </header>
        <section className="modal_content">
          {type === 'createTodo' && <CreateTodo />}
          {type === 'information' && <Alert />}
          {type === 'createNotes' && <AddNotes />}
        </section>
      </div>
    </React.Fragment>
  )
}

export default Modal;