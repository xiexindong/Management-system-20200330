import axios from "axios"
const LOGIN_INFO = "LOGIN_INFO";
const REGISTER_INFO = "REGISTER_INFO";
const LOADING = "LOADING";

const initState = {
    userId:"",
    username:"",
    password:"",
    phone:"",
    loadingStutus:false,
}

export const user = (stata = initState,action)=>{
    switch(action.type){
        case LOGIN_INFO:
            return {...stata,...action.payload,redirectTo:"/admin"}
        case REGISTER_INFO:
            return {...stata,...action.payload,redirectTo:"/admin"}
        case LOADING:
            debugger
            console.log("handelLoading333",action)
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

export const loadingAction = (data)=>{
    console.log("handelLoading11111",data)
    return {type:LOADING,payload:data}
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
export const handelLoading = (data)=>{
    return dispatch =>{
        console.log('dispatch action', dispatch)
        dispatch(loadingAction)
    }

}


