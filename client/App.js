import React ,{Component}from "react"
import  {BrowserRouter as Router ,Route,Switch,Redirect} from "react-router-dom"
import  {connect} from "react-redux"
import Login from "./container/login"
import Register from "./container/register"
import Admin from "./container/admin"
import ReactLoading from 'react-loading';
import AuthRouter from "./componet/authRouter"
import  "./common.less"


@connect(state=>state.user,null)
class App extends Component{
    render(){
        return<div className="box">
                <Router>
                    <div className="g-wt g-ht g-pr">
                        <AuthRouter/>
                        {this.props.loadingStutus == false?
                            <ReactLoading type="bars" className="loading" color="#1890ff"></ReactLoading>:
                            <Switch>
                                <Route  exact path="/admin" component={Admin}/>
                                <Route  path="/login" component = {Login}/>
                                <Route  path="/register" component = {Register}/>
                            </Switch>
                        }

                    </div>
                </Router>
            </div>
    }
}

export default App


