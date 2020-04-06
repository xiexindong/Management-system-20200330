var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser")
var router = require("./router")

var app = express();

app.use(cookieParser());
app.use(bodyParser())




app.use(function(req,res,next){
    next()
})

app.use("/user",router)
app.listen(8000,function(){
    console.log("成功启动服务器")
})