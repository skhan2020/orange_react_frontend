import React, { useState, useEffect } from 'react'
import { getLoginToken } from '../../../../../redux/selectors'
import { useSelector } from 'react-redux'
import './index.scss'
import '../../../Auth/index.scss'

const TodosPage = () => {
  const authToken = useSelector(getLoginToken);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
      fetchTodos();
    }, []
  )

  const fetchTodos = () => {
    const reqBody = {
      query: `
        query {
          todos {
            _id
            type
            description
            projectedStartTime
            notes
            statusUpdatedTime
            status
            creator {
              _id
              email
            }
          }
        }
      `
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
      console.log(resdata)
      // save the todos
      setTodos(resdata.data.todos);
    })
    .catch(err => {
      console.log(err)
    }
    );
  }

  return (
    <ul className="todo_list">
      {todos.map(item => <li key={item._id} className="todo_list_item">
        {item.description}
      </li>)}
    </ul>
  )
}

export default TodosPage;