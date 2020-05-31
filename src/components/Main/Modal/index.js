import React from 'react'
import './index.scss'
import BackDrop from './BackDrop'

const Modal = props => {
  return (
    <React.Fragment>
      <BackDrop />
      <div className="modal">
        <header className="modal_header"><h3>{props.title}</h3></header>
        <section className="modal_content">
          {props.children}
        </section>
        <section className="modal_action">
          <button onClick={props.onCancel}>Cancel</button>
          <button onClick={props.onConfirm}>Confirm</button>
        </section>
      </div>
    </React.Fragment>
  )
}

export default Modal;