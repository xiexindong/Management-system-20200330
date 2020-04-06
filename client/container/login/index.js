import React from "react"
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {login} from "../../../redux/user.redux"

import "./login.less"


//密码必须包含数字和字母并且长度8到16位 请用正则pwRegex
let pwRegex= /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}/;
let pwRegex2= /[0-9A-Za-z]{4,8}/

@connect(state => state.user,{login})
class Login extends React.Component {

  validateToNextPassword = (rule, value, callback) => {
          const { form } = this.props;
          if(!pwRegex2.test(value)){
              callback("密码有误,请重新输入")
          }
          callback();
    };

  handleSubmit = e => {
    e.preventDefault();
    let form = this.props.form;
    form.validateFields(["username","password"],{first:true},(err, values) => {
      if (!err) {
        this.props.login(values)
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
                     message: '请输入密码!' ,
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
        <Form.Item>
          <Button type="primary" htmlType="submit" block className="login-form-button">
            登录
          </Button>
          <Button type="primary" block className="login-form-button">
              <Link to="/register">注册</Link>
          </Button>
        </Form.Item>
      </Form>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    state: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login
  }
}


export default Form.create({ name: 'login' })(Login)




