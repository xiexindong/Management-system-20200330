const path = require("path")
let HtmlWebpackPlugin = require('html-webpack-plugin');
const  {CleanWebpackPlugin} = require("clean-webpack-plugin")
const webpack = require('webpack');

const isDEV = process.env.NODE_ENV || "development"

const config = {
    mode:"development",
    devtool:"cheap-module-eval-source-map",
    output:{
        filename:"[name].js",
        path:path.resolve(__dirname,"../dist"),
        publicPath:"/public/"
    },
    module:{
        rules:[
            {
              test:/.css$/,
              use:["style-loader","css-loader"]
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
        title:"this is a react",
        template:path.resolve(__dirname,"../client/index.html"),
        filename:"index.html"
    }),
        new webpack.HotModuleReplacementPlugin()]
}

if(isDEV){
    config.entry = {
        index:path.resolve(__dirname,"../client/index.js")
    }
    config.devServer={
        host:"0.0.0.0",
            contentBase:path.join(__dirname,"./dist"),
            port:9000,
            hot: true,
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
    }
}


module.exports = config
