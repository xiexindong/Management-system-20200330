import React,{Component} from "react"
import {Alert} from "antd"
import { connect } from "react-redux"
import {hideMsg} from "../../../redux/user.redux"


@connect(stata => stata.user,{hideMsg})
class MyAlert extends Component{
    componentDidMount(){
        // 自动清除 msg
        let timer = setTimeout(()=>{
            this.props.hideMsg()
            clearTimeout(timer)
        },2000)
    }

    render(){
        return<div className="alert-style"><Alert
        message={this.props.msg}
        type="warning"
        banner 
        >
      </Alert></div>
    }
}

export default  MyAlert