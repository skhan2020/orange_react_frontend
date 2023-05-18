import React from 'react'
import { useDispatch } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { translate } from '../../../../../../../localization/service'
import { createVideo } from '../../../../../../../services/video'
import { closeModal } from '../../../../../../../redux/actions/modalActions';

import '../../../Notes/components/Details/index.scss'
import '../../../Todos/components/Details/index.scss'

const CreateVideo = props => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onCancel = () => {
    dispatch(closeModal());
  }  
  
  const finishFailed = () => {

  }

  const onConfirm = values => {
    const videoObj = {
      title: values.title,
      category: values.category,
      link: values.link
    }
    dispatch(closeModal());
    createVideo(videoObj);
  }

  return (
    <div className='note_edit' >
      <Form className='sign_in_form'
        onFinish={onConfirm}
        onFinishFailed={finishFailed}
        onCancel={onCancel}
        form={form}
      >
        <Form.Item className="form-control" 
          label={translate("title")} name="title"
        >
         <Input />
        </Form.Item>
        <Form.Item className="form-control" 
          label={translate("category")} name="category"
          >
          <Input />
        </Form.Item>
        <Form.Item className="form-control" shouldUpdate
          label={translate('video_url')} name="link"
        >
          <Input />
        </Form.Item>
        <Form.Item className="form-action" >
          <Button onClick={onCancel}>{translate('cancel')}</Button>
          <Button htmlType="submit" type="primary">{ translate('save')}</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateVideo;