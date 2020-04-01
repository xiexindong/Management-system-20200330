import React ,{Component}from "react"
import  {BrowserRouter as Router ,Route,Switch} from "react-router-dom"
import  Login from "./container/login"
class App extends Component{
    render(){
        return<Router>
                <div>
                    <Switch>
                        <Route  path={["/","/login"]} component={Login}/>
                    </Switch>
                </div>
        </Router>
    }
}

export default App


