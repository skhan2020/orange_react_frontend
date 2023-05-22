
import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { translate } from '../../../localization/service';
import { getUserId, getLoginError } from '../../../redux/selectors';
import { Button, Form, Input, Select, Alert } from 'antd';
import './index.scss';
import { signInHandler, signUpHandler } from '../../../services/authentication';
import { resetLogin } from '../../../redux/actions/authActions'
import { STUDENT, PROFESSIONAL, UNDERGRAD} from '../../../constants';
// @ts-ignore
const AuthPage = props => {
  const dispatch = useDispatch();
  const { isLogin } = props;
  const DEFAULT_TYPE = STUDENT;
  const userId = useSelector(getUserId);
  const { hasError, errorMessage } = useSelector(getLoginError);
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
  }, [userId, form, isLogin]);
// @ts-ignore
  const submitHandler = values => {
    if (showLogin) {
      signInHandler(values.email, values.password);
    } else {
      signUpHandler(values.email, values.password, values.firstName, values.lastName, (values.type || DEFAULT_TYPE));
    }
  }
// @ts-ignore
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const validateMessages = {
    required: 'Required!',
    types: {
      email: 'Email is not valid!',
    }
  };

  const toggleSignIn = () => {
    if (hasError) {
// @ts-ignore
      dispatch(resetLogin());
    }
    props.toggleSignIn(!isLogin);
  }
  return (
    <>
    <Form className='sign_in_form'
      form={form}
      {...layout}
      initialValues={{
        remember: true,
        type: DEFAULT_TYPE,
      }}
      onFinish={submitHandler}
      onFinishFailed={onFinishFailed}
      validateMessages={validateMessages}
    >
      {!showLogin && <Form.Item
        label={translate("first_nm")} name="firstName"
        rules={[
          {
            message: translate("first_nm_missing"),
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item> }
      {!showLogin && <Form.Item
        label={translate("last_nm")} name="lastName"
        rules={[
          {
            message: translate("last_nm_missing"),
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item> }
      <Form.Item
        label={translate("email")} name="email"
        rules={[
          {
            type: 'email',
            message: translate("email_missing"),
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate("password")} name="password"
        rules={[
          {
            message: translate("password_missing"),
            required: true,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      {!showLogin && <Form.Item 
        label={translate("user_type")} name="type">
        <Select>
            {selectItems.map((item, key) => <Select.Option key={key} value={item.value}>{item.label}</Select.Option>)}
        </Select>
      </Form.Item> }
      <Form.Item className="form-action"  {...tailLayout}>
        <Button htmlType="submit" type="primary">{ translate(showLogin? 'sign_in' : 'sign_up')}</Button>
        <div onClick={() => toggleSignIn()}
        className="content3">{ showLogin ? translate('main_content4'): translate('main_content3')}</div>
      </Form.Item>
      {hasError && <Alert className="errorAlert" message={errorMessage} type="error" showIcon />}
    </Form>
    </>
  )
}

export default AuthPage