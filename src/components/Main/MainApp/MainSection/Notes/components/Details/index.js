import React, { useState, useEffect } from 'react'
import Editor from '../Editor/index'
import { useDispatch } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { translate } from '../../../../../../../localization/service'
import { createNote, updateNote, deleteNote } from '../../../../../../../services/notes'
import { closeModal } from '../../../../../../../redux/actions/modalActions';

import '../Editor/index.scss'
import './index.scss'
import '../../../Todos/components/Details/index.scss'

const Details = props => {
  const [viewOnly, setViewOnly] = useState(true);
  const [editorState, setEditorState] = useState();
  const dispatch = useDispatch();
  const { selectedNote, detailsMode } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedNote) {
      setViewOnly(true)
    } else {
      setViewOnly(false)
    }
  }, [selectedNote])

  const onCancel = () => {
    setViewOnly(!viewOnly);
    if (!detailsMode) {
      dispatch(closeModal());
    }
  }  
  
  const finishFailed = () => {

  }

  const onDeleteClick = () => {
    deleteNote(selectedNote._id);
  }

  const closeDetailsPage = () => {
    // props.openTodoDetail(false, props.item);
  }

  const onConfirm = values => {
    const noteObj = {
      title: selectedNote ? selectedNote.title : values.title,
      category: selectedNote ? selectedNote.category : values.category,
      text: editorState
    }
    if (detailsMode) {
      noteObj.id = selectedNote._id;
      updateNote(noteObj);
      setViewOnly(true)
    } else {
      dispatch(closeModal());
      createNote(noteObj);
    }
  }

  return (
    <div className="note_details" >
      <Form className='sign_in_form'
        onFinish={onConfirm}
        onFinishFailed={finishFailed}
        onCancel={onCancel}
        form={form}
      >
        {!detailsMode && <Form.Item className="form-control" 
          label={translate("title")} name="title"
        >
         <Input />
        </Form.Item>}
        {!detailsMode && <Form.Item className="form-control" 
          label={translate("category")} name="category"
          >
          <Input />
        </Form.Item>}
        <Form.Item className="form-control" shouldUpdate
          style={{textSize: "1.5em"}}
          label={selectedNote.title} name="notes"
        >
          <Editor styleName={detailsMode ? "view_page" : "editor_page"}
            readOnly={viewOnly}
            setParentEditorState={setEditorState} 
            toggleView={setViewOnly}
            note={selectedNote} />
        </Form.Item>
        <Form.Item className="form-action" >
          <Button onClick={() => onCancel()}>{ viewOnly? translate('edit_note') : translate('cancel')}</Button>
          {!viewOnly && <Button htmlType="submit" type="primary">{ translate('save')}</Button> }
          <Button onClick={() => onDeleteClick()}>{ translate('delete')}</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Details;