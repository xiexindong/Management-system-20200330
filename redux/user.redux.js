import axios from "axios"
const LOGIN_INFO = "LOGIN_INFO";
const REGISTER_INFO = "REGISTER_INFO";
const GETUSERINFO = "GETUSERINFO"

const initState = {
    userId:"",
    username:"",
    password:"",
    phone:""
}

export const user = (stata = initState,action)=>{

    switch(action.type){
        case LOGIN_INFO:
            return {...stata,...action.payload,redirectTo:"/home"}
        case REGISTER_INFO:
            return {...stata,...action.payload,redirectTo:"/home"}
        case GETUSERINFO :
            return {...stata,...action.payload}
        default:
            return{...stata}
    }
}


// action
const loginAction = (data)=>{
    return {type:LOGIN_INFO,payload:data}
}
const registerAction = (data)=>{

    return {type:REGISTER_INFO,payload:data}
}


const getUserInfoAction = (data)=>{

    return {type:GETUSERINFO,payload:data}
}


// dispatch
export const login = (data)=>{
    return dispatch =>{
        axios.post("/api/user/login",data)
        .then(reponse=>{
            dispatch(loginAction(reponse.data.body))
        })
        .catch(err=>{
            console.log("err",err)
        })
    }

}
export const register = (data)=>{
    return dispatch =>{
        axios.post("/api/user/register",data)
        .then(reponse=>{
            dispatch(registerAction(reponse.data.body))
        })
        .catch(err=>{
            console.log("err",err)
        })
    }

}

export  const getUserInfo = (data)=>{
    return dispatch => {
        axios.post("/api/user/getUserInfo",{})
            .then(response =>{
                dispatch(getUserInfoAction(data))
            })
            .catch(error => {
                console.log("error",error)
            })
    }
}
