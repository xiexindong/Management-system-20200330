const merge = require("webpack-merge")
const comConfig = require("./webpack.config.com.js")
const prodConfig = {
  mode:"production",
  devtool:"cheap-module-source-map"   //可以Tree shaking 没有import 的代码 
}

module.exports = merge(comConfig,prodConfig)

