import React from 'react';
// import 'pure-react-carousel/dist/react-carousel.es.css';
import { useDispatch } from 'react-redux';
import Details from './components/Details/index';
import { openTodoDetail } from '../../../../../redux/actions/todoActions'
import { Drawer } from 'antd'
import { useSelector } from 'react-redux';
import { todoListSelector, todoSelectedSelector } from '../../../../../redux/selectors';
import './index.scss';
import '../../../Auth/index.scss';
import TodoHeader from './components/TodoHeader';
import TodoCarousal from './components/TodoCarousal'

const TodosPage = () => {
  const todos = useSelector(todoListSelector);
  const selectedTodo = useSelector(todoSelectedSelector);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(openTodoDetail({}));
  }
  return (
      <>
        <TodoHeader />
        <TodoCarousal todos={todos} />
        <Drawer
          placement="right"
          closable={false}
          onClose={onClose}
          visible={selectedTodo._id}
          width={window.innerWidth > 600 ? 500 : 350}
        >
        <div className="detail_box">
          <Details todo={selectedTodo}></Details>
        </div>
      </Drawer>
    </>
  )
}

export default TodosPage;