import React ,{Component}from "react"
import  {BrowserRouter as Router ,Route,Switch} from "react-router-dom"
import  Login from "./container/login"
import ReactLoading from 'react-loading';
import  "./common.less"


class App extends Component{
    render(){
        return<div className="box">
            <Router>
                <div className="g-wt g-ht g-pr">
                    {/* <ReactLoading type="spokes" color="red" height={667} width={375}></ReactLoading> */}
                    <Switch>
                        <Route  path={["/","/login"]} component={Login}/>
                    </Switch>
                </div>
            </Router>
        </div>
    }
}

export default App


