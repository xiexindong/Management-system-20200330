import React from "react"
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import "./login.less"

let pwRegex= /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}/;
let pwRegex2= /[0-9A-Za-z]{4,8}/

class Login extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        
 };
 validateToNextPassword = (rule, value, callback) => {
        //密码必须包含数字和字母并且长度8到16位 请用正则pwRegex
        const { form } = this.props;
        if(!pwRegex2.test(value)){
            callback("密码必须包含数字和字母并且长度4到8位")
        }
        if (value && this.state.confirmDirty) {
           form.validateFields(['confirm'], { force: true });
        }
        callback();
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item hasFeedback>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [
                    { 
                     required: true,
                     message: '请输入密码!' 
                    },
                    {
                     validator: this.validateToNextPassword,
                    }
                ],
          })(
            <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请确认密码!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password 
            prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="请确认密码"
             />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Login = Form.create({ name: 'login' })(Login);




