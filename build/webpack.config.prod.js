const merge = require("webpack-merge")
const comConfig = require("./webpack.config.com.js")
const prodConfig = {
  mode:"production",
  devtool:"cheap-module-source-map"
}

module.exports = merge(comConfig,prodConfig)

