import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../../../../redux/actions/modalActions';
import { Button, Form, Input } from 'antd';
import { translate } from '../../../../../../../localization/service';
import Editor from '../Editor/index'
import { createNote } from '../../../../../../../services/notes';

const AddNotes = () => {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState();

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onCancel = () => {
    dispatch(closeModal());
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onConfirm = values => {
    const noteObj = {
      title: values.title,
      category: values.category,
      text: editorState
    }
    createNote(noteObj);
  }
    return (
      <Form className="form_notes" 
          onFinish={onConfirm}
          onFinishFailed={onFinishFailed}
          onCancel={onCancel}
        >
        <Form.Item className="form_notes_item"
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
        <Form.Item className="form_notes_item"
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
        <Form.Item name="notes" className="form_notes_item"
        >
          <Editor setParentEditorState={setEditorState} />
        </Form.Item>
        <Form.Item className="form-action"  {...tailLayout} >
          <Button htmlType="submit" onClick={() => onCancel()}>{ translate('cancel')}</Button>
          <Button htmlType="submit" type="primary">{ translate('create')}</Button>
        </Form.Item>
      </Form>
    )
}

export default AddNotes;


