import React, { useState, useEffect } from 'react';
import { translate } from '../../../../../../../localization/service' 
import EmptyUI from '../../../../EmptyUI';
import TodoListRenderer from '../TodoListRenderer';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { isFilterStateSelector } from '../../../../../../../redux/selectors/index'
import moment from 'moment';
import './index.scss'
import { useSelector } from 'react-redux';
import { Todo } from '../../../../../../../redux/reducers/todoReducer';

interface TodoCarousalProps {
  todos: Todo[],
}

const TodoCarousal = React.memo((props: TodoCarousalProps) => {
// @ts-ignore
  const { todos } = props;
  const [listItems , setListItems] = useState([]);
  const isFilteredState = useSelector(isFilterStateSelector);

// @ts-ignore
  const sortAndUpdateTodo = list => {
    const group = new Map();
// @ts-ignore
    list.sort((a, b) => moment(a.projectedStartTime).diff(moment(b.projectedStartTime)));
// @ts-ignore
    list.forEach(item => {
      const time = moment(item.projectedStartTime).local().format('MM-DD-YYYY');
      group.set(time, (group.get(time) ? [...group.get(time), item] : [item]));
      item.projectedStartTime = moment(item.projectedStartTime).local();
      item.projectedEndTime = moment(item.projectedEndTime).local();
    });
    return Array.from(group);
  }

  useEffect(() => {
    const sortedList = sortAndUpdateTodo(todos)
    // @ts-ignore
    setListItems(sortedList);
  }, [todos])

  return (
    <div className="todo_page">
        { listItems.length === 0 && !isFilteredState ? <EmptyUI message={translate('empty_todo')} /> :
          <CarouselProvider
            naturalSlideWidth={400}
            naturalSlideHeight={125}
            totalSlides={listItems.length}
            className="carousal"
            visibleSlides={window.innerWidth > 600 ? 5 : 1}
            step={1}
            isIntrinsicHeight
          >
            <div className="btn_box">
              <ButtonNext className="carousal_btn">Next</ButtonNext>
              <ButtonBack className="carousal_btn">Back</ButtonBack>
            </div>
            <Slider>
              {listItems.map((item, key) => 
                <Slide index={key} key={key}><TodoListRenderer todoList={item}/></Slide>
              ) }
            </Slider>
          </CarouselProvider> }
      </div>
  )
})

export default TodoCarousal;