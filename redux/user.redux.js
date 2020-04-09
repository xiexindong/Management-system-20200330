import axios from "axios"
const LOGIN_INFO = "LOGIN_INFO";
const REGISTER_INFO = "REGISTER_INFO";
const LOADING = "LOADING";
const MAGSHOW = "MAGSHOW"

const initState = {
    userId:"",
    username:"",
    password:"",
    phone:"",
    redirectTo:"",
    msg:"",
    loadingStutus:false,
}

export const user = (stata = initState,action)=>{
     let data = {...stata,...action.payload}
    switch(action.type){
        case LOGIN_INFO:
            return {...data,redirectTo:"/admin"}
        case REGISTER_INFO:
            return {...data,redirectTo:"/admin"}
        case MAGSHOW:
             return {...data}
        case LOADING:
            return {...data}
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

export const loadingAction = (data)=>{
    return {type:LOADING,payload:data}
}


const msgActin = (data)=>{
    return{type:MAGSHOW,payload:data}
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

            var data = reponse.data
            if(data && data.code != 0){
               return dispatch(msgActin(data.body))
            }
            return dispatch(registerAction(reponse.data.body))
        })
        .catch(err=>{
            console.log("err",err)
        })
    }

}

