import React, { useState } from 'react'
import { translate } from '../../../localization/service'
import { Button, Form, Checkbox, Input, Select, Option } from 'antd'
import 'antd/dist/antd.css';
import './index.scss'
import { signInHandler, signUpHandler} from './service'
import { STUDENT, PROFESSIONAL, UNDERGRAD} from '../../../constants'

const AuthPage = props => {
  const { isLogin } = props;

  const selectItems = [
    { value: STUDENT, label: translate(STUDENT)},
    { value: PROFESSIONAL, label: translate(PROFESSIONAL)},
    { value: UNDERGRAD, label: translate(UNDERGRAD)},
  ]

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const submitHandler = values => {
    debugger;
    if (isLogin) {
      signInHandler(values.email, values.password);
    } else {
      signUpHandler(values.email, values.password, values.firstName, values.lastName, values.type);
    }
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <>
    <Form className={isLogin? 'form_narrow' : 'form'} 
      name="basic"
      {...layout}
      initialValues={{
        remember: true,
      }}
      onFinish={submitHandler}
      onFinishFailed={onFinishFailed}
    >
      {!isLogin && <Form.Item
        label={translate("first_nm")} name="firstName"
        rules={[
          {
            required: true,
            message: translate("first_nm_missing"),
          },
        ]}
      >
        <Input />
      </Form.Item> }
      {!isLogin && <Form.Item
        label={translate("last_nm")} name="lastName"
        rules={[
          {
            required: true,
            message: translate("last_nm_missing"),
          },
        ]}
      >
        <Input />
      </Form.Item> }
      <Form.Item
        label={translate("email")} name="email"
        rules={[
          {
            required: true,
            message: translate("email_missing"),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate("password")} name="password"
        rules={[
          {
            required: true,
            message: translate("password_missing"),
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      {!isLogin && <Form.Item 
        label={translate("user_type")} name="type">
        <Select defaultValue={STUDENT}>
            {selectItems.map(item => <Select.Option value={item.value}>{item.label}</Select.Option>)}
        </Select>
      </Form.Item> }
      {!isLogin && <Form.Item name="remember" valuePropName="checked"  {...tailLayout}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> }

      <Form.Item className="form-action"  {...tailLayout}>
        <Button htmlType="submit" type="primary">{ translate(props.isLogin? 'sign_in' : 'sign_up')}</Button>
      </Form.Item>
    </Form>
    </>
  )
}

export default AuthPage