import React ,{Component}from "react"
import  {BrowserRouter as Router ,Route,Switch} from "react-router-dom"
import  Login from "./container/login"
import Test2 from "./text2"


class App extends Component{
    Page1 = null;
    render(){
        import(/*webpackChunkName:"page1"*/'./text').then(comp=>{
            this.Page1 = comp        
        })

        return<Router>
                <div>
                    <Page1/>
                    <Test2/>
                    <Switch>
                        <Route  path={["/","/login"]} component={Login}/>
                    </Switch>
                </div>
        </Router>
    }
}

export default App


