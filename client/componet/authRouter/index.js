import React,{Component} from "react"
import {connect} from "react-redux"
import {getUserInfo} from "../../../redux/user.redux"


@connect(null,{getUserInfo})
export default class AuthRouter extends Component{
    componentDidMount(){
        this.props.getUserInfo()
    }
    render(){
        return null
    }
}

