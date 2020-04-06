import React ,{Component}from "react"
import  {BrowserRouter as Router ,Route,Switch} from "react-router-dom"
import { createStore,applyMiddleware  } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import  Login from "./container/login"
import  Register from "./container/register"
import ReactLoading from 'react-loading';
import appReducer from "../redux/index"
import  "./common.less"


let store = createStore(appReducer,applyMiddleware(thunk));
store.subscribe(() =>
  console.log("store",store.getState())
);




class App extends Component{
    render(){
        return <Provider store={store}>
            <div className="box">
                <Router>
                    <div className="g-wt g-ht g-pr">
                        {/* <ReactLoading type="spokes" color="red" height={667} width={375}></ReactLoading> */}
                        <Switch>
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


