import React ,{Component}from "react"
import  {BrowserRouter as Router ,Route,Switch,Redirect} from "react-router-dom"
import { createStore,applyMiddleware,compose  } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import axios from "axios"
import devToolsEnhancer  from 'remote-redux-devtools';
import Login from "./container/login"
import Register from "./container/register"
import Admin from "./container/admin"
import ReactLoading from 'react-loading';
import {handelLoading} from "../redux/user.redux"
import AuthRouter from "./componet/authRouter"
import appReducer from "../redux/index"
import  "./common.less"


let store = createStore(appReducer,compose(
    applyMiddleware(thunk,devToolsEnhancer),
    
));
store.subscribe(() =>
  console.log("store",store.getState())
);


// 定义一个全局变量 记录请求的次数 
let loadingAcount = 0;

axios.interceptors.request.use(function (config) {
    // Do something before request is sent

    loadingAcount ++
    console.log("loadingAcount",loadingAcount)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    loadingAcount --;

    if(loadingAcount == 0){
        handelLoading({"loadingStutus":true})
    }

    return response;

  }, function (error) {
    return Promise.reject(error);
  });




class App extends Component{
    render(){
        return <Provider store={store}>
            <div className="box">
                <Router>
                    <div className="g-wt g-ht g-pr">
                        <AuthRouter/>
                         {/*<ReactLoading type="spokes" color="red" height={667} width={375}></ReactLoading>*/}
                        <Switch>
                            <Route  exact path="/admin" component={Admin}/>
                            <Route  path="/login" component = {Login}/>
                            <Route  path="/register" component = {Register}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        </Provider>
    }
}

export default App


