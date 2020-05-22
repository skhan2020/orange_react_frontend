import React from 'react'
import Modal from '../Modal/index'
import './index.scss'

const TodosPage = () => {
  return (
    <>
    <Modal>
      <p>Modal Content</p>
    </Modal>
    <div className='todos-form'>
      <p>Create a Todo!</p>
      <button >Create Todo</button>
    </div>
    </>
  )
}

export default TodosPage;