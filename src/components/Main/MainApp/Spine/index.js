import React, { useState, useRef } from 'react';
import { CarryOutOutlined,
  UnorderedListOutlined,
  LineChartOutlined,
  CaretRightOutlined,
  PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux'
import { getLoginToken } from '../../../../redux/selectors/index'
import './index.scss';
import Modal from '../../Modal/index'

const Spine = () => {
  const [activeList, setActiveList] = useState(
  {  todo: false, 
     charts: false, 
     notes: false, 
     video: false, 
     add: false});
  const typeEl = useRef(null);
  const descriptionEl = useRef(null);
  const notesEl = useRef(null);
  const startTimeEl = useRef(null);
  const authToken = useSelector(getLoginToken);

  const [creating, setCreating] = useState(false);

  const startCreatingTodos = () => {
    setCreating(true);
  }
  const onCancel = () => {
    setCreating(false);
  }
  const onConfirm = () => {
    setCreating(false);
    const type = typeEl.current.value;
    const description = descriptionEl.current.value;
    const projectedStartTime = startTimeEl.current.value;
    const status = 1000;
    const statusUpdatedTime = new Date();
    // the plus converts the string to a number like ParseInt
    const notes = notesEl.current.value;

    if (type === '' || 
        description === '' ||  
        projectedStartTime === '' ||  
        notes === '') {
          return;
    }

    const reqBody = {
      query: `
        mutation CreateTodo($type: String!, $description: String!, $status: Int!, $statusUpdatedTime: String!, $projectedStartTime: String!, $notes: String) {
          createTodo(todoInput: {
              type: $type,
              description: $description,
              projectedStartTime: $projectedStartTime,
              status: $status,
              statusUpdatedTime: $statusUpdatedTime,
              notes: $notes
          }) {
            _id
            type
            description
            status
            statusUpdatedTime
            projectedStartTime
            notes
            creator {
              _id
              email
            }
          }
        }
      `,
      variables: {
        type: type,
        description: description,
        projectedStartTime: projectedStartTime,
        notes: notes,
        status: status,
        statusUpdatedTime: statusUpdatedTime
      }
    }
    fetch('http://localhost:4000/graphqlapi', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!")
      }
      return res.json();
    })
    .then(resdata => {
      // setTodos(prevState => {
      //   const newTodos= [];
      //   newTodos.push({
      //     _id: resdata.data.createTodo._id,
      //     type: resdata.data.createTodo.type,
      //     description: resdata.data.createTodo.description,
      //     status: resdata.data.createTodo.status,
      //     statusUpdatedTime: resdata.data.createTodo.statusUpdatedTime,
      //     projectedStartTime: resdata.data.createTodo.projectedStartTime,
      //     notes: resdata.data.createTodo.notes,
      //     creator: {
      //       _id: userId
      //     }
      //   });
      //   return [...prevState, ...newTodos];
      // })
    })
    .catch(err => {
      console.log(err)
    }
    );

  }
  const setActive = value => {
    const list = activeList;
    activeList[value] = !activeList[value];
   setActiveList(list);
  }
  return (
  <div className="spine">
    {creating && 
      <Modal
        title="Create Todo"
        onCancel={onCancel}
        onConfirm={onConfirm}>
          <form className="form">
            <div className="form-control">
              <label htmlFor="type">Type</label>
              <input id="type" type="text" ref={typeEl}></input>
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <input id="description" type="text" ref={descriptionEl}></input>
            </div>
            <div className="form-control">
              <label htmlFor="startTime">Start Time</label>
              <input id="startTime" type="datetime-local" ref={startTimeEl}></input>
            </div>
            <div className="form-control">
              <label htmlFor="notes">Notes</label>
              <input id="notes" type="textArea" rosw="4" ref={notesEl}></input>
            </div>
          </form>
      </Modal>}
    <ul>
      <li className={activeList.todo ? 'active' : ''} onClick={() => setActive('todo')}><CarryOutOutlined /></li>
      <li className={activeList.notes ? 'active' : ''} ><UnorderedListOutlined /></li>
      <li className={activeList.videos ? 'active' : ''} ><CaretRightOutlined /></li>
      <li className={activeList.charts ? 'active' : ''} ><LineChartOutlined/></li>
      <li className={activeList.add ? 'active' : ''}  onClick={startCreatingTodos} ><PlusOutlined /></li>
    </ul>
  </div>)
}

export default Spine;