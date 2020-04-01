const path = require("path");
const comConfig = require("./webpack.config.com")
var merge = require('webpack-merge');




const config = {

    mode:"development",
    devtool:"cheap-module-eval-source-map",
    devServer:{
        host:"localhost",
        contentBase:path.join(__dirname,"./dist"),
        port:9000,
        hot: true,
        open:true,
        overlay: {
            warnings: true,
            errors: true
        },
        publicPath:"/public/",
        historyApiFallback:{
            rewrites:[
                {form:/^\//,to:"/public/index.html"}
            ]
        }
    },
    output:{
        filename:"[name].js",
        path:path.resolve(__dirname,"../dist"),
        publicPath:"/public/"
    }
}


module.exports = merge(config,comConfig);
