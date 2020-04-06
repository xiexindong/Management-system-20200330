const path = require("path");
const webpack = require("webpack")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
        proxy:{
            '/api':{
                target: "http://localhost:8000",
                pathRewrite:{'/api':''}
            }
        },
        publicPath:"/public/",
        historyApiFallback:{
            rewrites:[
                {form:/^\//,to:"/public/index.html"}
            ]
        }
    },
    optimization:{
        usedExports:true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin()
    ]
}


module.exports = merge(comConfig,config);
