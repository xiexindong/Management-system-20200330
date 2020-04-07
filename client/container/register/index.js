import React,{Component} from "react"
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Redirect} from "react-router-dom"
import {register} from "../../../redux/user.redux"
import {connect} from "react-redux"
import PhoneSvg from "./phone.svg"


//密码必须包含数字和字母并且长度8到16位 请用正则pwRegex
let pwRegex= /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}/;
let pwRegex2= /[0-9A-Za-z]{4,8}/
let phoneRegex = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
let phoneRegex2 = /^\d{2}$/


@connect(state => state.user,{register})
class Register extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
 validateToNextPassword = (rule, value, callback) => {
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

  validatorPhone =  (rule, value, callback)  =>{

    if(!!value == false){
        callback("请输入手机号")
    }

    if(!phoneRegex2.test(value)){
         callback("输入的手机号有误")
    }

    callback()

  }


  handleSubmit = e => {
    e.preventDefault();
    let form = this.props.form;
   
    form.validateFields(["username","password","confirm","phone"],{first:true},(err, values) => {
      if (!err) {
        this.props.register(values)
        console.log('Received values of form: ', values);
      }
    });
  
  };

  render() {
    console.log("this.props.form",this.props)
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
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
          onBlur = {this.handleConfirmBlur}
           />)}
      </Form.Item>
      <Form.Item hasFeedback>
          {
              getFieldDecorator("phone",{
                  rules:[
                      {
                          required:true,
                          message:"请输入手机号"
                      },
                      {
                          validator:this.validatorPhone
                      }
                  ]
              })(
                  <Input
                      prefix={<Icon component={PhoneSvg}/>}
                      placeholder = "请输入手机号"
              
                  />
              )
          }
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block className="login-form-button">
          注册
        </Button>
      </Form.Item>
    </Form>
      </div>  
      
    );
  }
}


// const mapStateToProps = (state, ownProps) => {
//   return {
//     state: state.user
//   }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     login
//   }
// }


export default Form.create({ name: 'register' })(Register)




