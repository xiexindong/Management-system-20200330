const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const  {CleanWebpackPlugin} = require("clean-webpack-plugin");
const   AddAseetHTMLPLUGIN = require("add-asset-html-webpack-plugin");

const webpack = require('webpack');

const plugins = [
    new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
        title:"this is a react",
        template:path.resolve(__dirname,"../client/index.html"),
        filename:"index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
]
// node 读取 dll 下的文件

const files = fs.readdirSync(path.resolve(__dirname,"../dll"));



files.forEach(file=>{
    if(/.*\.dll.js/.test(file)){
        console.log("fil111e",file)
        plugins.push(new AddAseetHTMLPLUGIN({filepath:path.resolve(__dirname,'../dll',file)}))
    }
    if(/.*manifest.josn/.test(file)){
        plugins.push(new webpack.DllReferencePlugin({manifest:path.resolve(__dirname,'../dll',file)}))
    } 
    // 读取公共模块 优先从 manifest.json 中读取 
})

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
                exclude:/node_modules/, // 此目录下文件不在进行 babel-loader 的编译打包速度，也可以使用include指定需要编译的文件
                loader:"babel-loader"
            }
        ]
    },
    plugins
}

if(isDEV){
    config.entry = {
        index:path.resolve(__dirname,"../client/index.js")
    }
    config.devServer={
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
    }
}


module.exports = config
