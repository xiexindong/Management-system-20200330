const path = require('path');

module.exports = {
    entry: "./client/App.js",
    output: {
        filename: "bundel.js",
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules: [{
            test:/\.css$/,
            use:["style-loader","css-loader"]
        },{
            test:/\.(png|svg|jpg|gif)$/,
            use:["file-loader"]
        }]
    }
}
