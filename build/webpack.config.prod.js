const merge = require("webpack-merge")
const comConfig = rquire("./webpack.config.com.js")
const prodConfig = {
  mode:"production",
  devtool:"cheap-module-source-map"
}

module.exports = merge(comConfig,prodConfig)

