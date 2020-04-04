import React from "react"
import ReactDom from "react-dom"
import { AppContainer } from 'react-hot-loader';
import test  from "./test"
import App from "./App"


const root = document.getElementById("root")
const render = Component =>{
    ReactDom.render(
        <AppContainer>
            <Component/>
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