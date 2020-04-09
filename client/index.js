import React from "react"
import ReactDom from "react-dom"
import { createStore,applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader';
import axios from "axios"
import thunk from 'redux-thunk';
import App from "./App"
import {loadingAction} from "../redux/user.redux"
import appReducer from "../redux";


let store = createStore(appReducer,composeWithDevTools(
    applyMiddleware(thunk),
));



// 定义一个全局变量 记录请求的次数
let loadingAcount = 0;

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    loadingAcount ++
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    loadingAcount --;
    if(loadingAcount == 0){
        setTimeout(()=>{
            store.dispatch(loadingAction({type:"LOADING","loadingStutus":true}))
        },300)

    }
    return response;

}, function (error) {
    return Promise.reject(error);
});




const root = document.getElementById("root")
const render = Component =>{
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>,
        root
    )
}
render(App)


if (module.hot) {
    module.hot.accept('./App.js', function() {
            let nextApp = require("./App").default
            render(nextApp)

    })
}