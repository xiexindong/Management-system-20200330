const path = require("path");
const os = require("os");
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const AddAseetHTMLPLUGIN = require("add-asset-html-webpack-plugin");
const webpack = require('webpack');
const happyPack = require("happypack")


const happyPackPool =  happyPack.ThreadPool({size:os.cpus().length})
const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title:"this is a react",
        template:path.resolve(__dirname,"../client/index.html"),
        filename:"index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new happyPack({
        id:"css",
        threadPool:happyPackPool,//共享线程池
        loaders:['style-loader','css-loader'],
        verbose: true
    }),
    new happyPack({
        id:"js",
        threadPool:happyPackPool,
        loaders: ['babel-loader'],
        verbose: true
    })
]
// node 读取 dll 下的文件
const files = fs.readdirSync(path.resolve(__dirname,"../dll"));

files.forEach(file=>{
    if(/.*\.dll.js/.test(file)){
        plugins.push(new AddAseetHTMLPLUGIN({filepath:path.resolve(__dirname,'../dll',file)}))
    }
    if(/.*manifest.josn/.test(file)){
        plugins.push(new webpack.DllReferencePlugin({manifest:path.resolve(__dirname,'../dll',file)}))
    }
    // 读取公共模块 优先从 manifest.json 中读取
})


module.exports = {
    module:{
        rules:[
            {
                test:/.css$/,
                loader: "happypack/loader?id=css"
            },
            {
                test:/\.js$/,
                exclude:/node_modules/, // 此目录下文件不在进行 babel-loader 的编译打包速度，也可以使用include指定需要编译的文件
                loader: "happypack/loader?id=js"
            }
        ]
    },
    plugins
}