import React from 'react';
import { useSelector} from 'react-redux';
import { translate } from '../../../localization/service';
import { getUserId } from '../../../redux/selectors';
import { Button, Form, Checkbox, Input, Select } from 'antd';
import 'antd/dist/antd.css';
import './index.scss';
import '../index.scss';
import { signInHandler, signUpHandler} from '../../../services/authentication';
import { STUDENT, PROFESSIONAL, UNDERGRAD} from '../../../constants';

const AuthPage = props => {
  const { isLogin } = props;
  const DEFAULT_TYPE = STUDENT;
  const userId = useSelector(getUserId);
  const showLogin = userId || isLogin;
  const [form] = Form.useForm();
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

  React.useEffect(() => {
    if(userId) {
      form.resetFields();
    }
    return function cleanup() {
      form.resetFields();
    };
  }, [userId, form]);

  const submitHandler = values => {
    if (showLogin) {
      signInHandler(values.email, values.password);
    } else {
      signUpHandler(values.email, values.password, values.firstName, values.lastName, (values.type || DEFAULT_TYPE));
    }
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <>
    { !isLogin && <div className="welcome_label">{translate(showLogin? "sign_up_success" : "main_content4", {
        name: userId,
      })}</div>}
    <Form className={isLogin ? 'form_narrow' : 'form'} 
      form={form}
      {...layout}
      initialValues={{
        remember: true,
        type: DEFAULT_TYPE,
      }}
      onFinish={submitHandler}
      onFinishFailed={onFinishFailed}
    >
      {!showLogin && <Form.Item
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
      {!showLogin && <Form.Item
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
      {!showLogin && <Form.Item 
        label={translate("user_type")} name="type">
        <Select name="type">
            {selectItems.map((item, key) => <Select.Option key={key} value={item.value}>{item.label}</Select.Option>)}
        </Select>
      </Form.Item> }
      {showLogin && <Form.Item name="remember" valuePropName="checked"  {...tailLayout}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> }
      <Form.Item className="form-action"  {...tailLayout}>
        <Button htmlType="submit" type="primary">{ translate(showLogin? 'sign_in' : 'sign_up')}</Button>
      </Form.Item>
    </Form>
    </>
  )
}

export default AuthPage