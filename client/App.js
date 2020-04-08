import React ,{Component}from "react"
import  {BrowserRouter as Router ,Route,Switch,Redirect} from "react-router-dom"
import { createStore,applyMiddleware,compose, bindActionCreators   } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import axios from "axios"
import devToolsEnhancer  from 'remote-redux-devtools';
import Login from "./container/login"
import Register from "./container/register"
import Admin from "./container/admin"
import ReactLoading from 'react-loading';
import {handelLoading,loadingAction} from "../redux/user.redux"
import AuthRouter from "./componet/authRouter"
import appReducer from "../redux/index"
import  "./common.less"

console.log("appReducer",appReducer)

let store = createStore(appReducer,compose(
    applyMiddleware(thunk),
));

console.log("store",store.dispatch)
//

// const action = bindActionCreators({loadingAction}, store.dispatch)
// console.log('action............', action)
// action.loadingAction()
// store.subscribe(() =>
//     console.log("store",store.getState())
// );

store.dispatch({type:"LOADING","loadingStutus":true})


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
    console.log("2222222222222222",store)
    // store.dispatch(loadingAction)
    if(loadingAcount == 0){

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


