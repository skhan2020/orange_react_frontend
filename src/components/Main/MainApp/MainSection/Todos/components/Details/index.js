import React, { useEffect, useState } from 'react';
import { Button, Form, DatePicker, Input } from 'antd';
import { translate } from '../../../../../../../localization/service';
import { todoSelectedSelector } from '../../../../../../../redux/selectors/index'
import { updateTodoChanges, deleteTodo } from '../../../../../../../services/todo'
import EditableTagGroup from '../CreateTodo/Tags';
import StatusTimeLine from './StatusTimeLine/index'
import { useSelector } from 'react-redux';
import { CloseOutlined  } from '@ant-design/icons';
import DropDown from '../DropDown';
import './index.scss';

const TodoDetails = props => {
  const [tagsItems, setTagsItems] = useState([]);
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const todo = useSelector(todoSelectedSelector);

  useEffect(() => {
    form.resetFields();
    setTagsItems(todo.tags);
  }, [todo._id]);

  const onCancel = () => {
    closeDetailsPage();
  }  
  
  const onConfirm = values => {
    const todoObject = {
      ...todo,
      projectedStartTime: values.startDate[0].toISOString(),
      projectedEndTime: values.startDate[1].toISOString(),
      notes: values.notes || '',
      tags: tagsItems,
    }
    updateTodoChanges(todoObject);

  }  
  
  const finishFailed = () => {

  }

  const onDeleteClick = () => {
    closeDetailsPage();
    deleteTodo(todo._id);
  }

  const updateTags = tagList => {
    setTagsItems(tagList);
  }

  const closeDetailsPage = () => {
    props.openTodoDetail(false, props.item);
  }

  const changeTodoStatus = item => {
    item.todo.status = item.status;
    updateTodoChanges(item.todo);
  }

  return (
      <Form className="form_detail" 
        onFinish={onConfirm}
        onFinishFailed={finishFailed}
        onCancel={onCancel}
        form={form}
        initialValues= {{
          notes: todo.notes || '',
          startDate: [
            todo.projectedStartTime,
            todo.projectedEndTime,
          ]
        }}
      >
        <div className="delete_box">
          <CloseOutlined className="delete_btn" onClick={closeDetailsPage} />
        </div>
        <Form.Item className="form-control" 
          label={translate("title")} name="title"
        >
          <div className="value_label" >{todo.title}</div>
        </Form.Item>
        <Form.Item className="form-control" 
          label={translate("category")} name="category"
          >
          <div className="value_label">{todo.category}</div>
        </Form.Item>
        <Form.Item
          className="form-control column_box" 
          label={translate("start_time")} name="startDate"
          rules={[
            {
              required: true,
              message: translate("start_date_missing"),
            },
          ]}
          >
          <RangePicker renderExtraFooter={() => 'extra footer'} showTime  format="YYYY-DD-MM HH:mm" />
        </Form.Item>
        <Form.Item
          className="form-control" 
          label={translate("status")} name="status"
        >
          <DropDown status={todo.status} todo={todo} handleStatusChanges={changeTodoStatus} />
        </Form.Item>
        <Form.Item
          className="form-control column_box" 
          label={translate("status_time_line")} name="statusTimeline"
          >
          <StatusTimeLine todo={todo._id} className="status-timeline"/>
        </Form.Item>
        <Form.Item className="form-control" shouldUpdate
          label={translate("notes")} name="notes"
        >
          <TextArea rows={2}></TextArea>
        </Form.Item>
        <Form.Item 
          className="form-control" 
          label={translate("tags")} name="tags">
          <EditableTagGroup updateTags={updateTags} tags={tagsItems}/>
        </Form.Item>
        <Form.Item className="form-action" >
          <Button htmlType="submit" onClick={() => onCancel()}>{ translate('cancel')}</Button>
          <Button htmlType="submit" type="primary">{ translate('save')}</Button>
          <Button htmlType="submit" onClick={() => onDeleteClick()}>{ translate('delete')}</Button>
        </Form.Item>
      </Form>
  )
        }

export default TodoDetails;