import React from 'react'
import './index.scss'

const Modal = props => {
  return (
    <div className="modal">
      <header>{props.title}</header>
      <section className="modal_content">
        {props.children}
      </section>
      <section className="modal_action">
        <button >Cancel</button>
        <button >Confirm</button>
      </section>
    </div>
  )
}

export default Modal;