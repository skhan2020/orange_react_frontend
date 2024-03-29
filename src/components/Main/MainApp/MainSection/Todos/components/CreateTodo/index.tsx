import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../../../../redux/actions/modalActions';
import { Button, Form, DatePicker, Input } from 'antd';
import { createTodo } from '../../../../../../../services/todo'
import { translate } from '../../../../../../../localization/service';
import EditableTagGroup from './Tags';
import './index.scss';

const CreateTodo = () => {
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [tagsItems, setTagsItems] = useState([]);

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onCancel = () => {
    // Samina: Implement dialog for confirmation
    dispatch(closeModal());
  }

// @ts-ignore
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

// @ts-ignore
  const updateTags: any = tagList => {
    setTagsItems(tagList);
  }

// @ts-ignore
  const onConfirm = values => {
    dispatch(closeModal());
    const todoObject = {
      ...values,
      projectedStartTime: values.startDate[0].toISOString(),
      projectedEndTime: values.startDate[1].toISOString(),
      notes: values.notes || '',
      tags: tagsItems,
    }
    createTodo(todoObject);

  }
    return (
    <Form className="sign_in_form" 
        onFinish={onConfirm}
        onFinishFailed={onFinishFailed}
        
      >
        <Form.Item
          label={translate("title")} name="title"
          rules={[
            {
              required: true,
              message: translate("todo_title_missing"),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="form-action" 
          label={translate("start_time")} name="startDate"
          rules={[
            {
              required: true,
              message: translate("start_date_missing"),
            },
          ]}
          >
          <RangePicker renderExtraFooter={() => 'extra footer'} showTime format="YYYY-DD-MM HH:mm"/>
        </Form.Item>
        <Form.Item
          label={translate("category")} name="category"
          rules={[
            {
              required: true,
              message: translate("todo_category_missing"),
            },
          ]}
          >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("notes")} name="notes"
        >
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item 
          label={translate("tags")} name="tags">
          <EditableTagGroup updateTags={updateTags} tags={tagsItems}/>
        </Form.Item>
        <Form.Item className="form-action"  {...tailLayout}>
          <Button htmlType="submit" onClick={() => onCancel()}>{ translate('cancel')}</Button>
          <Button htmlType="submit" type="primary">{ translate('create')}</Button>
        </Form.Item>
      </Form>
    )
}

export default CreateTodo;


