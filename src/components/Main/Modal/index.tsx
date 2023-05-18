import React from 'react';
import './index.scss';
import BackDrop from './BackDrop';
import CreateTodo from './../MainApp/MainSection/Todos/components/CreateTodo/index';
import Details from './../MainApp/MainSection/Notes/components/Details/index'
import CreateVideo from './../MainApp/MainSection/Videos/components/CreateVideo/index';
import { useSelector, useDispatch } from 'react-redux'
import { getModalType, isModalOpen } from '../../../redux/selectors';
import { translate } from '../../../localization/service'
import { closeModal} from '../../../redux/actions/modalActions'
import { CloseOutlined  } from '@ant-design/icons';
import Alert from './Alert';

const TITLE_MAP = { todos: 'create_todo',
                    information: 'information',
                    notes: 'create_notes',
                    video: 'create_video'}

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
      <div className={`modal ${TITLE_MAP[type] === 'information'? 'narrow' : ''}`}>
        <header className="modal_header">
          <div className="modal_header_label">{translate(TITLE_MAP[type])}</div>
          <CloseOutlined className="delete_btn" onClick={onCancel} />
        </header>
        <section className="modal_content">
          {type === 'todos' && <CreateTodo />}
          {type === 'information' && <Alert />}
          {type === 'notes' && <Details detailsMode={false} />}
          {type === 'video' && <CreateVideo />}
        </section>
      </div>
    </React.Fragment>
  )
}

export default Modal;