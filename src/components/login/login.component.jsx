import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Card, Form, Input, Button } from 'antd';
import { RadarChartOutlined,WindowsOutlined } from '@ant-design/icons';
import "./login.css";
import 'antd/dist/antd.css';

import { checkLogin, setRoute } from '../../store/actions/index';
const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const Login = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (props.user) {
      window.sessionStorage.setItem("user" , JSON.stringify(props.user));
      history.push("/dashboard");
      props.setRoute('dashboard');
    }
  }, [history, props, props.user]);

  const onFinish = values => {
    props.checkLogin(values);
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div className="login-top">
        <Card style={{ width: 600, height: 262, background: '#ffff' }}>
          <div className="section">
            <div className="col-6 red">
            <WindowsOutlined className="login-ico" />
            </div>
            <div className="col-6 login">
              <h1 className="text">Login</h1>
              <Form
                className="login-form"
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Submit
               </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.activeUser
})

const mapDispatchToProps = {
  checkLogin: checkLogin,
  setRoute: setRoute
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login) 
