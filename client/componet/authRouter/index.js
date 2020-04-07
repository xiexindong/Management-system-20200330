import React,{Component} from "react"
import {withRouter} from "react-router-dom"
import axios from "axios"


@withRouter
export default class AuthRouter extends Component{
    componentDidMount(){
      
       let path = ["/register","/login"];
       let pathname = this.props.location.pathname;

       axios.get("/api/user/getUserInfo").then(res=>{
           let data = res.data;
           if(data.code != 0){
                if(path.indexOf(pathname) > -1){
                    this.props.history.push(pathname)
                }else{
                    this.props.history.push("/login")
                }
           }else{
            if(path.indexOf(pathname) > -1){
                this.props.history.push("/admin")
            }else{
                return false
            }
           }
       }) 
    }
    render(){
        return null
    }
}

